import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PumpProduct } from "../types/pump";
import { PointOfInterest } from "./point-of-interest.entity";

@Entity('Pump')
export class Pump {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar' })
    name!: string;

    @Column("single-json")
    products!: PumpProduct[];

    @ManyToOne(() => PointOfInterest, pointOfInterest => pointOfInterest.pumps)
    pointOfInterest!: PointOfInterest;
}