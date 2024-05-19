import { v4 as uuidv4 } from 'uuid';
import { CreatePointOfInterestDto, CreatePumpDto } from "../../api/dto/point-of-interest-dto";
import { PointOfInterest } from "../../persistence/entity/point-of-interest.entity";
import { Pump } from '../../persistence/entity/pump.entity';

const pumpDtoToDb = (dto: CreatePumpDto, pointOfInterestId: string): Pump => {
    return {
        id: dto.id ? dto.id : uuidv4(),
        pointOfInterestId,
        name: dto.name,
        products: dto.products.map(product => ({
            name: product.name,
            price: {
                currency: product.price.currency,
                value: product.price.value
            }
        }))
    }
}

export const mapDtoToDb = (dto: CreatePointOfInterestDto): PointOfInterest => {
    const pointId = uuidv4();
    return {
        id: pointId,
        name: dto.name,
        country: dto.country,
        zipCode: dto.zipCode,
        city: dto.city,
        street: dto.street,
        houseNumber: dto.houseNumber,
        scheduleId: dto.scheduleId,
        pumps: dto.pumps.map(pump => pumpDtoToDb(pump, pointId)),
        status: dto.status
    }
}