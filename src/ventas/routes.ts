import { Router, Request, Response } from "express";
import { VentasController } from "./controller";



export class VentasRoutes {

    static get routes(): Router {
        const router = Router();


        const dominioController = new VentasController();

        router.get('/', dominioController.getData);

        return router;
    }
}