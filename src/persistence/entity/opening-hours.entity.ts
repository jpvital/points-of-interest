import { Column, Entity, PrimaryColumn } from "typeorm";
import { WeeklyHours } from "../../types/schedule";

// For a better understanding of this table, see the definition of WeeklyHours in src/types/schedule.ts.
// With this implementation we have granularity on how to manage as many schedules as possible.

@Entity("POISchedule")
export class OpeningHours {
    @PrimaryColumn('uuid')
    id!: string;

    @Column({ type: 'int', unique: true })
    hourCase!: number;

    @Column('simple-json')
    hours!: WeeklyHours;
}