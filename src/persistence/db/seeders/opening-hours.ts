import dotenv from 'dotenv';
dotenv.config()

import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { databaseConfig } from '../../data-sources/postgres.data-source';
import { OpeningHours } from '../../entity/opening-hours.entity';

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

async function disconnect() {
    try {
        await dataSource.destroy();

        console.log('Data Source disconnected!');
    } catch (err) {
        console.error('Error during Data Source disconnect', err);
    }
}

const seedData: OpeningHours[] = [
    {
        // Case One: Open Monday to Friday from 8 AM to 8 PM, Saturdays from 8
        // AM to 6 PM, closed on Sundays and public holidays.
        id: uuidv4(),
        hourCase: 1,
        hours: {
            monday: { open: '08:00', close: '20:00' },
            tuesday: { open: '08:00', close: '20:00' },
            wednesday: { open: '08:00', close: '20:00' },
            thursday: { open: '08:00', close: '20:00' },
            friday: { open: '08:00', close: '20:00' },
            saturday: { open: '08:00', close: '18:00' },
            sunday: null,
            publicHolidays: null
        }
    },
    // Case Two: Open daily, including public holidays.
    {
        id: uuidv4(),
        hourCase: 2,
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
    // Case Three: Open Monday to Thursday 6 AM to 8PM, Fridays from 6AM to
    // 4 PM, closed on Saturdays, Sundays and public holidays.
    {
        id: uuidv4(),
        hourCase: 3,
        hours: {
            monday: { open: '06:00', close: '20:00' },
            tuesday: { open: '06:00', close: '20:00' },
            wednesday: { open: '06:00', close: '20:00' },
            thursday: { open: '06:00', close: '20:00' },
            friday: { open: '06:00', close: '16:00' },
            saturday: null,
            sunday: null,
            publicHolidays: null
        }
    }];

async function seed() {
    const repository = dataSource.getRepository(OpeningHours);
    await repository.insert(seedData);
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