import { QueryResult } from "pg";
import { client } from "../../../../common";
import { BalanceRepository } from "../../balance.repository";
import { Balance } from "../../domain";

export class BalanceMPostgreSQLRepository implements BalanceRepository {
    public async find(id: number): Promise<Balance | null> {
        const { rows }: QueryResult = await client.query(
            "SELECT * FROM public.wallet_balance WHERE id = $1",
            [id]
        );

        if (!rows) {
            return null;
        }

        return rows[0];
    }

    public async findByUserId(userId: number): Promise<Balance | null> {
        const { rows }: QueryResult = await client.query(
            "SELECT * FROM public.wallet_balance WHERE user_id = $1",
            [userId]
        );

        if (!rows) {
            return null;
        }
        return rows[0];
    }

    public async all(): Promise<Balance[]> {
        const { rows }: QueryResult = await client.query(
            "SELECT * FROM public.wallet_balance ORDER BY id DESC"
        );

        return rows as Balance[];
    }

    public async store(entry: Balance): Promise<void> {
        const now = new Date();
        const { user_id, amount } = entry;

        await client.query(
            "INSERT INTO public.wallet_balance(user_id, amount, created_at) VALUES($1, $2, $3)",
            [user_id, amount, now]
        );
    }

    public async update(entry: Balance): Promise<void> {
        const now = new Date();
        const { user_id, amount, id } = entry;

        await client.query(
            "UPDATE public.wallet_balance SET user_id = $1, amount = $2, updated_at = $3 WHERE id = $4",
            [user_id, amount, now, id]
        );
    }

    public async remove(id: number): Promise<void> {
        await client.query("DELETE FROM public.wallet_balance WHERE id = $1", [
            id,
        ]);
    }
}
