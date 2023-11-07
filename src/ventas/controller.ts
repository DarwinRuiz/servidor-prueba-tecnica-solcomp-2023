import { Request, Response } from 'express';
import xlsx from 'xlsx';
import { prisma } from '../data/sqlserver';

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


            const datosVentas: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
                raw: false, // Asegura que las fechas se interpreten correctamente
                dateNF: 'yyyy-mm-dd', // Especifica el formato de fecha
            });


            const productos = new Set<any>();
            const clientes = new Set<any>();


            await prisma.ventas.deleteMany();
            await prisma.productos.deleteMany();
            await prisma.clientes.deleteMany();


            for (const registroVenta of datosVentas) {
                const cliente = {
                    nombre: registroVenta.nombre,
                    apellido: registroVenta.apellido,
                    correo_electronico: registroVenta.correo_electronico
                }
                clientes.add(cliente);

                const producto = {
                    codigo_barras: registroVenta.codigo_barras,
                    nombre_producto: registroVenta.nombre_producto,
                    descripcion: registroVenta.descripcion,
                    categoria: registroVenta.categoria,
                    precio: registroVenta.precio,
                }
                productos.add(producto);
            }


            for (const producto of productos) {
                await prisma.productos.create({
                    data: producto
                })
            }

            for (const cliente of clientes) {
                await prisma.clientes.create({
                    data: cliente
                });
            }

            for (const registroVenta of datosVentas) {
                const cliente = await prisma.clientes.findFirst({
                    where: {
                        correo_electronico: registroVenta.correo_electronico
                    }
                })

                const producto = await prisma.productos.findFirst({
                    where: {
                        codigo_barras: registroVenta.codigo_barras
                    }
                })

                await prisma.ventas.create({
                    data: {
                        cantidad: Number(registroVenta.cantidad),
                        total_venta: Number(registroVenta.total_venta),
                        fecha_venta: new Date(registroVenta.fecha_venta),
                        id_cliente: cliente?.id_cliente,
                        id_producto: producto?.id_producto
                    }
                })
            }

            const totalVentasCargada = await prisma.ventas.count();

            return response.status(200).json({
                status: 200,
                message: `Se han cargado un total de ${totalVentasCargada} registros representativos de ventas`
            });
        } catch (error) {
            return response.status(500).json({ error: `${error}` });
        }
    }


}