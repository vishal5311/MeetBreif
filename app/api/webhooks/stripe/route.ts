import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase-admin';
import { headers } from 'next/headers';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    const supabase = createAdminClient();

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const userId = session.metadata.userId;

        await supabase
            .from('profiles')
            .update({
                is_pro: true,
                stripe_customer_id: session.customer as string
            })
            .eq('id', userId);
    }

    if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object as any;

        await supabase
            .from('profiles')
            .update({ is_pro: false })
            .eq('stripe_customer_id', subscription.customer as string);
    }

    return NextResponse.json({ received: true });
}
