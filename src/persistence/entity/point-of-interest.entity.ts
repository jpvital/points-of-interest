import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Status } from "../../types/point-of-interest";
import { OpeningHours } from "./opening-hours.entity";
import { Pump } from "./pump.entity";

@Entity('PointOfInterest')
export class PointOfInterest {
    @PrimaryColumn('uuid')
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

    @ManyToOne(() => OpeningHours)
    @JoinColumn({ name: 'scheduleId', referencedColumnName: 'hourCase' })
    scheduleId!: number;

    @OneToMany(() => Pump, pump => pump.pointOfInterestId, { cascade: true })
    pumps!: Pump[];
}