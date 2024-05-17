import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../types/point-of-interest";
import { OpeningHours } from "./opening-hours.entity";
import { Pump } from "./pump.entity";

@Entity()
export class PointOfInterest {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar' })
    name!: string;

    @Column({ type: 'enum', enum: Status })
    status!: Status;

    @Column({ type: 'varchar' })
    country!: string;

    @Column({ type: 'varchar' })
    zipCode!: string;

    @Column({ type: 'varchar' })
    city!: string;

    @Column({ type: 'varchar' })
    street!: string;

    @Column({ type: 'int' })
    houseNumber!: number;

    @ManyToOne(() => OpeningHours, { cascade: true })
    openingHours!: OpeningHours;

    @OneToMany(() => Pump, pump => pump.pointOfInterest, { cascade: true })
    pumps!: Pump[];
}