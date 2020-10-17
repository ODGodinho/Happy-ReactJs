import { OrphanageImagesInterface } from "./OrphanageImagesRequest";

export interface OrphanageInterface {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: string;
    images: OrphanageImagesInterface[];
};