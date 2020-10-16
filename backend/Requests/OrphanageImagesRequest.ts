import OrphanageImages from "../src/Models/OrphanageImages";
import * as Yup from "yup";

export interface OrphanageImagesCreate {
    path: string;
};

export function validation() {
    return Yup.object().shape({
        path: Yup.string().required("O Campo `images` é obrigatório"),
    })
}