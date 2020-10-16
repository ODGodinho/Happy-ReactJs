import { getRepository } from "typeorm";
import Orphanage from "../src/Models/Orphanage";
import { OrphanageCreate, validation as validationOrphanageCreate } from "../Requests/OrphanageRequest";

export default {
    async get(relations: Array<string>) {
        const OrphanageRepository = getRepository(Orphanage);
        const orphanages = await OrphanageRepository.find({
            relations: relations
        });
        return orphanages;
    },
    async findOrFail(id: number, relations: Array<string>) {
        const OrphanageRepository = getRepository(Orphanage);
        const orphanage = await OrphanageRepository.findOneOrFail(id, {
            relations: relations
        });
        return orphanage;
    },
    async create(params: OrphanageCreate) {
        // destructors request body
        const data = {
            name: params.name,
            latitude: params.latitude,
            longitude: params.longitude,
            about: params.about,
            instructions: params.instructions,
            opening_hours: params.opening_hours,
            open_on_weekends: params.open_on_weekends,
            images: params.images,
        };

        await validationOrphanageCreate().validate(data, {
            abortEarly: false
        });

        const OrphanageRepository = getRepository(Orphanage);

        const orphanage = OrphanageRepository.create(data);

        await OrphanageRepository.save(orphanage);

        return orphanage;
    }
}