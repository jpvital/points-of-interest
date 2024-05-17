// TODO due to time constraints, using memory storage to represent database
// Additional Notes: In place of a database connection, I have the below in memory simulation.
// Assume that openingHours functions as a database table where the object key is the case number column, and the value is the schedule column.


import { PointOfInterest } from "../../entity/point-of-interest.entity";
import { Status } from "../../types/point-of-interest";
import { WeeklyHours } from "../../types/schedule";
import { createPointOfInterestDto } from "../dto/point-of-interest-dto";

export class PointOfInterestService {

    private openingHours: { [key: number]: WeeklyHours } = {
        1: {
            monday: { open: '08:00', close: '20:00' },
            tuesday: { open: '08:00', close: '20:00' },
            wednesday: { open: '08:00', close: '20:00' },
            thursday: { open: '08:00', close: '20:00' },
            friday: { open: '08:00', close: '20:00' },
            saturday: { open: '08:00', close: '20:00' },
            sunday: { open: '08:00', close: '20:00' },
            publicHolidays: { open: '08:00', close: '20:00' }
        }
    };

    private pointsOfInterest: PointOfInterest[] = [
        {
            id: 'asdavasv',
            name: 'point 1',
            status: Status.ONLINE,
            country: 'Germany',
            zipCode: '12345',
            city: 'Berlin',
            street: 'Alexanderplatz',
            houseNumber: 1,
            openingHours: {
                id: 'uuid-abcd-1234',
                hourCase: 1,
                hours: {
                    monday: { open: '08:00', close: '20:00' },
                    tuesday: { open: '08:00', close: '20:00' },
                    wednesday: { open: '08:00', close: '20:00' },
                    thursday: { open: '08:00', close: '20:00' },
                    friday: { open: '08:00', close: '20:00' },
                    saturday: { open: '08:00', close: '20:00' },
                    sunday: { open: '08:00', close: '20:00' },
                    publicHolidays: { open: '08:00', close: '20:00' }
                }
            },
            pumps: []
        }
    ];

    private fetchOpeningHours(hourCase: number): any {
        // In database terms this would be a join query to get the corresponding schedule to the provided case number.
        return this.openingHours[hourCase];
    }

    public async getPointOfInterest(page: number, limit: number): Promise<PointOfInterest[]> {
        return this.pointsOfInterest;
    }

    public async getPointOfInterestById(pointId: string): Promise<PointOfInterest> {
        return this.pointsOfInterest.filter((point: PointOfInterest) => point.id === pointId)[0];
    }

    public async createPointOfInterest(point: createPointOfInterestDto): Promise<PointOfInterest> {
        const schedule = this.fetchOpeningHours(point.openingHours);

        const newPoint = { ...point, ...schedule, id: 'new-uuid', status: Status.ONLINE } as PointOfInterest
        this.pointsOfInterest.push(newPoint);
        return newPoint;
    }

    public async deletePointOfInterest(pointId: string): Promise<void> {
        this.pointsOfInterest = this.pointsOfInterest.filter((point: PointOfInterest) => point.id !== pointId);
    }

    public async updatePointOfInterest(pointId: string, point: createPointOfInterestDto): Promise<PointOfInterest> {
        const schedule = this.fetchOpeningHours(point.openingHours);
        const pointIndex = this.pointsOfInterest.findIndex((point: PointOfInterest) => point.id === pointId);
        this.pointsOfInterest[pointIndex] = { ...point, ...schedule, id: pointId } as PointOfInterest;
        return this.pointsOfInterest[pointIndex];
    }
}