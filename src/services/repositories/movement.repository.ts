import { Movement } from "./domain";

export interface MovementRepository {
    find(id: number): Promise<Movement | null>;
    all(): Promise<Movement[]>;
    store(entry: Movement): Promise<void>;
    update(entry: Movement): Promise<void>;
    remove(id: number): Promise<void>;
}
