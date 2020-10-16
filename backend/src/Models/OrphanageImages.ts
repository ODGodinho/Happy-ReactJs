import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Orphanage from "./Orphanage";

@Entity("orphanages_images")
export default class OrphanageImages {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({ name: "orphanage_id" })
    orphanage: Orphanage

}