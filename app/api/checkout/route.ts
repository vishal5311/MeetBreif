import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
    try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'MeetBrief Pro',
                            description: 'Unlimited meeting recaps and higher quality rendering',
                        },
                        unit_amount: 1900, // $19.00
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?canceled=true`,
            metadata: {
                userId: user.id,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
