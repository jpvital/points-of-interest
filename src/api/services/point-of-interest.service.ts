// TODO due to time constraints, using memory storage to represent database.

import { PointOfInterest } from "../../entity/point-of-interest.entity";
import { Status } from "../../types/point-of-interest";
import { createPointOfInterestDto } from "../dto/point-of-interest-dto";

// TODO due to time constraints, using memory storage to represent database.

export class PointOfInterestService {
    private pointsOfInterest: PointOfInterest[] = [
        {
            id: 'asdavasv',
            status: Status.ONLINE,
            country: 'Germany',
            zipCode: '12345',
            city: 'Berlin',
            street: 'Alexanderplatz',
            houseNumber: 1,
            openingHours: {
                id: 'asdasd',
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
    public async getPointOfInterest(req: any, res: any): Promise<PointOfInterest[]> {
        return this.pointsOfInterest;
    }

    public async getPointOfInterestById(pointId: string): Promise<PointOfInterest> {
        return this.pointsOfInterest.filter((point: PointOfInterest) => point.id === pointId)[0];
    }

    public async createPointOfInterest(point: createPointOfInterestDto): Promise<PointOfInterest> {
        const newPoint = { ...point, id: 'new-uuid', status: Status.ONLINE } as PointOfInterest
        this.pointsOfInterest.push(newPoint);
        return newPoint;
    }

    public async deletePointOfInterest(pointId: string): Promise<void> {
        this.pointsOfInterest = this.pointsOfInterest.filter((point: PointOfInterest) => point.id !== pointId);
    }

    public async updatePointOfInterest(pointId: string, point: createPointOfInterestDto): Promise<PointOfInterest> {
        const pointIndex = this.pointsOfInterest.findIndex((point: PointOfInterest) => point.id === pointId);
        this.pointsOfInterest[pointIndex] = { ...point, id: pointId } as PointOfInterest;
        return this.pointsOfInterest[pointIndex];
    }
}