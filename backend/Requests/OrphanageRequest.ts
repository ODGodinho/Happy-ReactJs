import OrphanageImages from "../src/Models/OrphanageImages";
import { validation as validationImages } from "./OrphanageImagesRequest";
import * as Yup from "yup";

export interface OrphanageCreate {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: string;
    images: OrphanageImages[];
};

export function validation() {
    return Yup.object().shape({
        name: Yup.string().required("O Campo `name` é obrigatório"),
        latitude: Yup.number().required("O Campo `latitude` é obrigatório"),
        longitude: Yup.number().required("O Campo `longitude` é obrigatório"),
        about: Yup.string().required("O Campo `about` é obrigatório").max(300).min(0),
        instructions: Yup.string().required("O Campo `instructions` é obrigatório"),
        opening_hours: Yup.string().required("O Campo `opening_hours` é obrigatório"),
        open_on_weekends: Yup.string().required("O Campo `open_on_weekends` é obrigatório"),
        images: Yup.array(validationImages()),
    })
}