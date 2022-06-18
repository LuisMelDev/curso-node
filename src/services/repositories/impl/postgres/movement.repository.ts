import { QueryResult } from "pg";
import { client } from "../../../../common";
import { MovementRepository } from "../../movement.repository";
import { Movement } from "../../domain/movement";

export class MovementPostgreSQLRepository implements MovementRepository {
    public async find(id: number): Promise<Movement | null> {
        const { rows }: QueryResult = await client.query(
            "SELECT * FROM public.wallet_movement WHERE id = ?",
            [id]
        );

        if (rows.length) {
            return rows[0];
        }

        return null;
    }

    public async all(): Promise<Movement[]> {
        const { rows }: QueryResult = await client.query(
            "SELECT * FROM public.wallet_movement ORDER BY id DESC"
        );

        return rows as Movement[];
    }

    public async store(entry: Movement): Promise<void> {
        const now = new Date();
        const { user_id, type, amount } = entry;

        await client.query(
            "INSERT INTO public.wallet_movement(user_id, type, amount, created_at) VALUES($1, $2, $3, $4)",
            [user_id, type, amount, now]
        );
    }

    public async update(entry: Movement): Promise<void> {
        const now = new Date();

        const { user_id, type, amount, id } = entry;

        await client.query(
            "UPDATE public.wallet_movement SET user_id = $1, type = $2, amount = $3, updated_at = $4 WHERE id = $5",
            [user_id, type, amount, now, id]
        );
    }

    public async remove(id: number): Promise<void> {
        await client.query("DELETE FROM public.wallet_movement WHERE id = $1", [
            id,
        ]);
    }
}
