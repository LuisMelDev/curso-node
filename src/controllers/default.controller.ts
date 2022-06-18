import { Request, Response } from "express";
import { route, GET } from "awilix-express";
import { TestService } from "../services";

@route("/")
export class DefaultController {
    constructor(private readonly testService: TestService) {}

    @GET()
    public index(req: Request, res: Response): void {
        res.send("running...");
    }
}
