import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { PumpProduct } from "../../types/pump";
import { PointOfInterest } from "./point-of-interest.entity";

@Entity('Pump')
export class Pump {
    @PrimaryColumn('uuid')
    id!: string;

    @Column({ type: 'varchar' })
    name!: string;

    @Column("simple-json")
    products!: PumpProduct[];

    @ManyToOne(() => PointOfInterest, pointOfInterest => pointOfInterest.pumps)
    @JoinColumn({ name: 'pointOfInterestId' })
    pointOfInterestId!: string;
}