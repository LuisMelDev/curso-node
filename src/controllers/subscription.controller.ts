import { Request, Response } from "express";
import { route, GET, POST, PUT, DELETE } from "awilix-express";
import { SubscriptionService } from "../services";
import { SubscriptionCreateDto, SubscriptionUpdateDto } from "../dtos";
import { BaseController } from "../common/controllers/base.controller";

@route("/subscriptions")
export class SubscriptionController extends BaseController {
    constructor(private readonly subscriptionService: SubscriptionService) {
        super();
    }

    @GET()
    public async all(req: Request, res: Response): Promise<void> {
        try {
            res.send(await this.subscriptionService.all());
        } catch (e) {
            this.handleException(e, res);
        }
    }

    @route("/:id")
    @GET()
    public async find(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            res.send(await this.subscriptionService.find(id));
        } catch (e) {
            this.handleException(e, res);
        }
    }

    @POST()
    public async store(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body);
            const { user_id, amount, code, cron } = req.body;
            await this.subscriptionService.store({
                user_id,
                amount,
                code,
                cron,
            } as SubscriptionCreateDto);
            res.send("created");
        } catch (e) {
            this.handleException(e, res);
        }
    }

    @route("/:id")
    @PUT()
    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { amount, code, cron } = req.body;
            await this.subscriptionService.update(id, {
                amount,
                code,
                cron,
            } as SubscriptionUpdateDto);
            res.send("updated");
        } catch (e) {
            this.handleException(e, res);
        }
    }

    @route("/:id")
    @DELETE()
    public async remove(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.subscriptionService.delete(id);
            res.send("removed");
        } catch (e) {
            this.handleException(e, res);
        }
    }
}
