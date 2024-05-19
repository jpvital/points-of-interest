import { PointOfInterest } from "../../persistence/entity/point-of-interest.entity";
import { IPointOfInterestRepository } from '../../persistence/repositories/point-of-interest.repository';
import { mapDtoToDb } from '../../utils/mappers/point-of-interest';
import { CreatePointOfInterestDto } from '../dto/point-of-interest-dto';

export interface IPointOfInterestService {
    getPointOfInterest(offset: number, limit: number): Promise<PointOfInterest[]>;
    getPointOfInterestById(pointId: string): Promise<PointOfInterest | null>;
    createPointOfInterest(point: CreatePointOfInterestDto): Promise<PointOfInterest | null>;
    deletePointOfInterest(pointId: string): Promise<void>;
    updatePointOfInterest(pointId: string, point: CreatePointOfInterestDto): Promise<PointOfInterest | null>;
}

export default class PointOfInterestService implements IPointOfInterestService {
    constructor(private pointOfInterestRepository: IPointOfInterestRepository) { }

    public async getPointOfInterest(offset: number, limit: number): Promise<PointOfInterest[]> {
        return this.pointOfInterestRepository.listPointsOfInterest(offset, limit);
    }

    public async getPointOfInterestById(pointId: string): Promise<PointOfInterest | null> {
        return this.pointOfInterestRepository.getPointOfInterestById(pointId);
    }

    public async createPointOfInterest(point: CreatePointOfInterestDto): Promise<PointOfInterest | null> {
        return this.pointOfInterestRepository.createPointOfInterest(mapDtoToDb(point));
    }

    public async deletePointOfInterest(pointId: string): Promise<void> {
        return this.pointOfInterestRepository.deletePointOfInterest(pointId);
    }

    public async updatePointOfInterest(pointId: string, point: CreatePointOfInterestDto): Promise<PointOfInterest | null> {
        return this.pointOfInterestRepository.updatePointOfInterest(pointId, mapDtoToDb(point));
    }
}