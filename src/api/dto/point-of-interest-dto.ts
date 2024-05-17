import { Status } from "../../types/point-of-interest";
import { Pump } from "../../types/pump";

export type createPointOfInterestDto = {
    country: string;
    zipCode: string;
    city: string;
    street: string;
    houseNumber: string;
    openingHours: number;
    pumps: Pump[];
    status: Status;
}