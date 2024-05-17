import { Status } from "../../types/point-of-interest";
import { Pump } from "../../types/pump";

export type createPointOfInterestDto = {
    country: string;
    zipCode: string;
    city: string;
    street: string;
    houseNumber: number;
    openingHours: number;
    pumps: Pump[];
    status: Status;
}