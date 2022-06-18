import { ApplicationException } from "../common/exceptions/application.exception";
import { SubscriptionCreateDto } from "../dtos";
import { Subscription } from "./repositories/domain";
import { SubscriptionRepository } from "./repositories/subscription.repository";
import { SubscriptionUpdateDto } from "../dtos/subscription.dto";

export class SubscriptionService {
    constructor(private subscriptionRepository: SubscriptionRepository) {}

    async all(): Promise<Subscription[]> {
        return await this.subscriptionRepository.all();
    }

    async find(id: string): Promise<Subscription | null> {
        const originalEntry = await this.subscriptionRepository.find(id);

        if (!originalEntry) {
            throw new ApplicationException("User Subscription does not exist");
        }

        return originalEntry;
    }

    async store(entry: SubscriptionCreateDto): Promise<void> {
        const originalEntry =
            await this.subscriptionRepository.findByUserAndCode(
                entry.user_id,
                entry.code
            );

        if (originalEntry) {
            throw new ApplicationException("User Subscription already exists");
        }

        await this.subscriptionRepository.store(entry as Subscription);
    }

    async update(id: string, entry: SubscriptionUpdateDto): Promise<void> {
        let originalEntry = await this.subscriptionRepository.find(id);

        if (!originalEntry) {
            throw new ApplicationException("User Subscription does not exist");
        }

        originalEntry = {
            ...originalEntry,
            ...entry,
        };

        await this.subscriptionRepository.update(originalEntry as Subscription);
    }

    async delete(id: string): Promise<void> {
        await this.subscriptionRepository.delete(id);
    }
}
