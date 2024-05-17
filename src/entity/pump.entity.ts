import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PumpProduct } from "../types/pump";

@Entity()
export class Pump {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column("single-json")
    products: PumpProduct[];

    @ManyToOne(() => PointOfInterest, pointOfInterest => pointOfInterest.pumps)
    pointOfInterest: PointOfInterest;
}