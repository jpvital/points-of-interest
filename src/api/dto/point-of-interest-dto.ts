import { Status } from "../../types/point-of-interest";

export type CreatePumpDto = {
    id?: string;
    name: string;
    products: {
        name: string;
        price: {
            currency: string;
            value: number;
        }
    }[];
}

export type CreatePointOfInterestDto = {
    name: string;
    country: string;
    zipCode: string;
    city: string;
    street: string;
    houseNumber: number;
    scheduleId: number;
    pumps: CreatePumpDto[];
    status: Status;
}