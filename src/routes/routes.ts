import { Router } from "express";
import { VentasRoutes } from "../ventas/routes";



export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/ventas', VentasRoutes.routes)

        return router;
    }
}