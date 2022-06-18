export interface SubscriptionCreateDto {
    user_id: string;
    code: string;
    amount: number;
    cron: string;
}

export interface SubscriptionUpdateDto {
    code: string;
    amount: number;
    cron: string;
}
