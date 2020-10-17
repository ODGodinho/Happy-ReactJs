import { Response, Request, Router } from "express";
import OrphanagesService from "../../Services/OrphanagesService";
import OrphanagesView from "../views/OrphanagesView";

export default {
    async index(request: Request, response: Response) {
        const orphanages = await OrphanagesService.get(["images"]);
        return response.json(OrphanagesView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        // simulate sleep for loading
        await new Promise(r => setTimeout(r, 1000));

        const { id } = request.params;

        const orphanage = await OrphanagesService.findOrFail(+id, ["images"]);
        return response.json(OrphanagesView.render(orphanage));
    },

    async create(request: Request, response: Response) {

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(img => {
            return { path: img.filename }
        })

        const orphanage = await OrphanagesService.create({...request.body, images});

        return response.status(201).json(OrphanagesView.render(orphanage));
    }
}