import dotenv from 'dotenv';
dotenv.config()

import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Status } from '../../../../types/point-of-interest';
import { databaseConfig } from '../../../data-sources/postgres.data-source';
import { PointOfInterest } from '../../../entity/point-of-interest.entity';
import { Pump } from '../../../entity/pump.entity';

const dataSource = new DataSource(databaseConfig);

async function connect() {
    try {
        if (dataSource.isInitialized) {
            await dataSource.destroy();
        }
        await dataSource.initialize();
        console.log('Data Source has been initialized!');
    } catch (err) {
        console.error('Error during Data Source connect', err);
    }
}

function generateRandomPump(pumpId: string): Pump {
    return {
        id: uuidv4(),
        name: faker.lorem.words(3),
        pointOfInterestId: pumpId,
        products: [
            {
                name: faker.commerce.productName(),
                price: {
                    currency: 'euro',
                    value: faker.number.int()
                }
            }
        ]
    }
}

function generateRandmomPOI(): PointOfInterest {
    const pointId = uuidv4();
    return {
        id: pointId,
        name: faker.lorem.words(3),
        status: Status.ONLINE,
        country: faker.location.country(),
        zipCode: faker.location.zipCode(),
        city: faker.location.city(),
        street: faker.location.streetAddress(),
        houseNumber: faker.number.int(100),
        scheduleId: faker.number.int({ min: 1, max: 3 }),
        pumps: Array.from({ length: 5 }, () => generateRandomPump(pointId))
    }
}


async function disconnect() {
    try {
        await dataSource.destroy();

        console.log('Data Source disconnected!');
    } catch (err) {
        console.error('Error during Data Source disconnect', err);
    }
}

async function seed() {

    const POIseedData = Array.from({ length: 10 }, () => generateRandmomPOI());

    const repository = dataSource.getRepository(PointOfInterest);
    for (const poi of POIseedData) {
        await repository.save(poi);
    }
    console.log('created seeds');
}

async function runSeed() {
    await connect();
    console.log('connected');
    await seed();
    console.log('seed done');
    await disconnect();
    console.log('disconnected');
}

runSeed();