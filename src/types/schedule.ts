type DayHours = {
    open: string;
    close: string;
}

export type WeeklyHours = {
    monday?: DayHours | null;
    tuesday?: DayHours | null;
    wednesday?: DayHours | null;
    thursday?: DayHours | null;
    friday?: DayHours | null;
    saturday?: DayHours | null;
    sunday?: DayHours | null;
    publicHolidays?: DayHours | null;
}