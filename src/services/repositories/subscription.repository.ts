import { Subscription } from "./domain";

export interface SubscriptionRepository {
    all(): Promise<Subscription[]>;
    find(id: string): Promise<Subscription | null>;
    store(entry: Subscription): Promise<void>;
    update(entry: Subscription): Promise<void>;
    delete(id: string): Promise<void>;
    findByUserAndCode(
        userId: string,
        code: string
    ): Promise<Subscription | null>;
}
