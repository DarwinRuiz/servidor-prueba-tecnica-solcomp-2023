import { Request, Response } from 'express';

export class VentasController {

    constructor() { }

    public getData = async (request: Request, response: Response) => {
        try {

            return response.json([{
                nombre: "Darwin",
                apellido: "Ruiz",
                profesion: "Ingeniero en Sistemas"
            }])
        } catch (error) {
            return response.status(500).json({ error: `${error}` });
        }
    }
}