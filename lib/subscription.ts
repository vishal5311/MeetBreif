import { createAdminClient } from './supabase-admin';

/**
 * Subscription utility - simplified to bypass Stripe limits for now.
 */
export async function getSubscriptionStatus(userId: string) {
    const supabase = createAdminClient();

    // We still fetch the count to show it in the UI, but canCreate is always true
    const { count } = await supabase
        .from('videos')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());

    return {
        isPro: true, // Mark everyone as Pro to hide upgrade buttons
        videoCount: count || 0,
        canCreate: true // Always allow creation
    };
}
