type PumpProduct = {
    name: string;
    price: {
        currency: string;
        value: number;
    }
};

export type Pump = {
    id: string;
    name: string;
    products: PumpProduct[];
}