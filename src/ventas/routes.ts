import { Router, Request, Response } from "express";
import { VentasController } from "./controller";
import multer from 'multer';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export class VentasRoutes {

    static get routes(): Router {
        const router = Router();


        const dominioController = new VentasController();

        router.get('/', dominioController.getData);
        router.get('/obtenerTotalVentas', dominioController.obtenerTotalVentas);
        router.get('/obtenerTotalUnidadesVendidas', dominioController.obtenerTotalUnidadesVendidas);
        router.post('/carga-archivo', upload.single('file'), dominioController.cargarArchivoVentas);

        return router;
    }
}