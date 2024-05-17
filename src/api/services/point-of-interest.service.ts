// TODO due to time constraints, using memory storage to represent database
// Additional Notes: In place of a database connection, I have the below in memory simulation.
// Assume that openingHours functions as a database table where the object key is the case number column, and the value is the schedule column.


import { OpeningHours } from "../../entity/opening-hours.entity";
import { PointOfInterest } from "../../entity/point-of-interest.entity";
import { Status } from "../../types/point-of-interest";
import { createPointOfInterestDto } from "../dto/point-of-interest-dto";

export interface IPointOfInterestService {
    getPointOfInterest(page: number, limit: number): Promise<PointOfInterest[]>;
    getPointOfInterestById(pointId: string): Promise<PointOfInterest>;
    createPointOfInterest(point: createPointOfInterestDto): Promise<PointOfInterest>;
    deletePointOfInterest(pointId: string): Promise<void>;
    updatePointOfInterest(pointId: string, point: createPointOfInterestDto): Promise<PointOfInterest>;

}

export class PointOfInterestService implements IPointOfInterestService {

    private openingHours: OpeningHours[] = [
        {
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
        }
    ]

    private pointsOfInterest: PointOfInterest[] = [
        {
            id: 'uuid-1234-5678',
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
            pumps: [
                // avoiding a cyclical dependency with in memory data declaration
                //@ts-ignore
                {
                    id: 'uuid-1234-5678',
                    name: 'pump 1',
                    products: [],
                }
            ]
        }
    ];

    private fetchOpeningHours(hourCase: number): any {
        // In database terms this would be a JOIN query to get the corresponding schedule to the provided case number.
        return this.openingHours.filter((schedule: OpeningHours) => schedule.hourCase === hourCase)[0];
    }

    // in database terms the below two methods would perform a JOIN with the pumps table, to fetch the pumps for the point of interest.
    // to handle pagination, use a combination of OFFSET and LIMIT in the query. LIMIT to determine how many rows of data we want, and
    // OFFSET to determine how many rows we want to skip over.
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

        // in database terms we would insert the point's pumps into the pumps table

        return newPoint;
    }

    public async deletePointOfInterest(pointId: string): Promise<void> {
        this.pointsOfInterest = this.pointsOfInterest.filter((point: PointOfInterest) => point.id !== pointId);
        // handle deletion of related pumps in database
    }

    public async updatePointOfInterest(pointId: string, point: createPointOfInterestDto): Promise<PointOfInterest> {
        const schedule = this.fetchOpeningHours(point.openingHours);
        const pointIndex = this.pointsOfInterest.findIndex((point: PointOfInterest) => point.id === pointId);
        this.pointsOfInterest[pointIndex] = { ...point, ...schedule, id: pointId } as PointOfInterest;
        return this.pointsOfInterest[pointIndex];
    }
}
