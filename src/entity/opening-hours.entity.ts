import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { WeeklyHours } from "../types/schedule";

@Entity()
export class OpeningHours {
    @PrimaryGeneratedColumn('uuid');
    id: string;

    @Column()
    hourCase: number;

    @Column('simple-json')
    hours: WeeklyHours;
}