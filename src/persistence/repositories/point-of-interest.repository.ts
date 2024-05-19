import { Repository } from "typeorm";
import context from "../../utils/context";
import { PointOfInterest } from "../entity/point-of-interest.entity";
import { Pump } from "../entity/pump.entity";

export interface IPointOfInterestRepository {
    createPointOfInterest(data: PointOfInterest): Promise<PointOfInterest | null>;
    getPointOfInterestById(pointId: string): Promise<PointOfInterest | null>;
    updatePointOfInterest(id: string, data: PointOfInterest): Promise<PointOfInterest | null>;
    listPointsOfInterest(offset: number, limit: number): Promise<PointOfInterest[]>;
    deletePointOfInterest(id: string): Promise<void>;
}

export default class PostgresPointOfInterestRepository implements IPointOfInterestRepository {

    private repository: Repository<PointOfInterest>;
    private pumpRepository: Repository<Pump>;

    constructor() {
        this.repository = context.resolve('postgresDataSource').dataSource.getRepository(PointOfInterest);
        this.pumpRepository = context.resolve('postgresDataSource').dataSource.getRepository(Pump);
    }

    public async listPointsOfInterest(offset: number, limit: number): Promise<PointOfInterest[]> {
        return this.repository.find({ relations: ['pumps', 'scheduleId'], skip: offset, take: limit });
    }

    public async createPointOfInterest(data: PointOfInterest): Promise<PointOfInterest | null> {
        await this.repository.save(data);
        return this.repository.findOne({ where: { id: data.id }, relations: ['pumps', 'scheduleId'] });
    }

    public async getPointOfInterestById(id: string): Promise<PointOfInterest | null> {
        return this.repository.findOne({ where: { id }, relations: ['pumps', 'scheduleId'] });
    }

    public async deletePointOfInterest(id: string): Promise<void> {
        const point = await this.repository.findOne({ where: { id }, relations: ['pumps', 'scheduleId'] });
        if (!point) {
            return;

        }
        for (const pump of point.pumps) {
            await this.pumpRepository.delete({ id: pump.id });
        }
        await this.repository.delete({ id });
    }

    public async updatePointOfInterest(id: string, data: PointOfInterest): Promise<PointOfInterest | null> {
        const point = await this.repository.findOne({ where: { id }, relations: ['pumps', 'scheduleId'] });
        if (!point) {
            return null;
        }
        // improvised solution to update point and pumps
        // i was struggling with time and not able to find a better way to update the resources
        const instance = Object.assign(point, data) as any;
        const pumps = instance.pumps;

        delete instance.pumps;
        delete instance.id;

        await this.repository.update(id, instance);

        for (const pump of pumps) {
            const pumpid = pump.id;
            delete pump.id;
            delete pump.pointOfInterestId;
            await this.pumpRepository.update(pumpid, pump);
        }

        return this.repository.findOne({ where: { id }, relations: ['pumps', 'scheduleId'] });
    }
}