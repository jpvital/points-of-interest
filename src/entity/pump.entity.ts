import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type PumpProduct = {
    name: string;
    price: {
        currency: string;
        value: number;
    }
};

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