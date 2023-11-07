import { Request, Response } from 'express';
import xlsx from 'xlsx';

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

    public cargarArchivoVentas = async (request: Request, response: Response) => {
        try {

            const file = request.file
            const buffer = file!.buffer;
            const arrayBuffer = new Uint8Array(buffer).buffer;
            const workbook = xlsx.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];


            const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);


            console.log(jsonData)
            return response.status(200).json({});
        } catch (error) {
            return response.status(500).json({ error: `${error}` });
        }
    }


}