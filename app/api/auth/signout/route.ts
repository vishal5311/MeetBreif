export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = createClient()

    // Check if a session exists before attempting to sign out
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session) {
        await supabase.auth.signOut()
    }

    return NextResponse.redirect(new URL('/login', request.url), {
        status: 302,
    })
}
