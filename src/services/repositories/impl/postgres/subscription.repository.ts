import { QueryResult } from "pg";
import { client } from "../../../../common";
import { SubscriptionRepository } from "../../subscription.repository";
import { Subscription } from "../../domain";

export class SubscriptionRepositoryPostgres implements SubscriptionRepository {
    public async all(): Promise<Subscription[]> {
        const { rows }: QueryResult = await client.query(
            "SELECT * FROM public.wallet_subscription"
        );
        return rows as Subscription[];
    }

    public async find(id: string): Promise<Subscription | null> {
        const { rows }: QueryResult = await client.query(
            "SELECT * FROM public.wallet_subscription WHERE id = $1",
            [id]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0] as Subscription;
    }

    public async findByUserAndCode(
        userId: string,
        code: string
    ): Promise<Subscription | null> {
        const { rows }: QueryResult = await client.query(
            "SELECT * FROM public.wallet_subscription WHERE user_id = $1 AND code = $2",
            [userId, code]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0] as Subscription;
    }

    public async store(entry: Subscription): Promise<void> {
        const { user_id, code, amount, cron } = entry;

        await client.query(
            "INSERT INTO public.wallet_subscription(user_id,code,amount,cron,created_at) VALUES($1, $2, $3, $4, $5)",
            [user_id, code, amount, cron, new Date()]
        );
    }

    public async update(entry: Subscription): Promise<void> {
        const { code, amount, cron, id } = entry;

        await client.query(
            `
            UPDATE public.wallet_subscription SET 
                    code = $1, 
                    amount = $2, 
                    cron = $3, 
                    updated_at = $4 
                WHERE 
                    id = $5
            `,
            [code, amount, cron, new Date(), id]
        );
    }

    public async delete(id: string): Promise<void> {
        await client.query(
            "DELETE FROM public.wallet_subscription WHERE id = $1",
            [id]
        );
    }
}
