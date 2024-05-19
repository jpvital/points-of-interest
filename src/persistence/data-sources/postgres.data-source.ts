import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
    type: "postgres",
    host: process.env.NODE_ENV === "local" ? "localhost" : "db",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "poi_manager",
    entities: [
        "src/persistence/entity/**/*.ts"
    ],
    synchronize: true,
}

export class PostgresDataSource {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = new DataSource(databaseConfig);
    }

    public init(): void {
        console.log('Starting PostGres connection');
        this.dataSource.initialize();
    }
}