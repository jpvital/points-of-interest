type DayHours = {
    open: string;
    close: string;
}

export type WeeklyHours = {
    monday?: DayHours;
    tuesday?: DayHours;
    wednesday?: DayHours;
    thursday?: DayHours;
    friday?: DayHours;
    saturday?: DayHours;
    sunday?: DayHours;
    publicHolidays?: DayHours;
}