export interface Subscription {
    id: number;
    user_id: string;
    code: string;
    amount: number;
    cron: string;
    created_at: Date | null;
    updated_at: Date | null;
}
