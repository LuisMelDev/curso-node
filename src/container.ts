import { Application } from "express";
import { asClass, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { TestService, SubscriptionService } from "./services";
import { SubscriptionRepositoryPostgres } from "./services/repositories/impl/postgres";
import { MovementPostgreSQLRepository } from "./services/repositories/impl/postgres/movement.repository";
import { BalanceMPostgreSQLRepository } from "./services/repositories/impl/postgres/balance.repository";
import { MovementService } from "./services/movement.service";

export default (app: Application) => {
    const container = createContainer({
        injectionMode: "CLASSIC",
    });

    container.register({
        //repositories
        subscriptionRepository: asClass(
            SubscriptionRepositoryPostgres
        ).scoped(),
        movementRepository: asClass(MovementPostgreSQLRepository).scoped(),
        balanceRepository: asClass(BalanceMPostgreSQLRepository).scoped(),

        //services
        subscriptionService: asClass(SubscriptionService).scoped(),
        movementService: asClass(MovementService).scoped(),
        testService: asClass(TestService).scoped(),
    });

    app.use(scopePerRequest(container));
};
