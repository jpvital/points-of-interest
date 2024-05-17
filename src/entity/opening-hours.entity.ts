import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { WeeklyHours } from "../types/schedule";

// For a better understanding of this table, see the definition of WeeklyHours in src/types/schedule.ts.
// With this implementation we have granularity on how to manage as many schedules as possible.

@Entity()
export class OpeningHours {
    @PrimaryGeneratedColumn('uuid');
    id: string;

    @Column()
    hourCase: number;

    @Column('simple-json')
    hours: WeeklyHours;
}