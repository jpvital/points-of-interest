import { asClass, createContainer } from 'awilix';

import controllers from '../api/controllers';
import services from '../api/services';
import { PostgresDataSource } from '../persistence/data-sources/postgres.data-source';
import repositories from '../persistence/repositories';

const context = createContainer({ injectionMode: 'CLASSIC' });

context.register({
    pointOfInterestController: asClass(controllers.PointOfInterestController).scoped(),
    pointOfInterestService: asClass(services.PointOfInterestService).scoped(),
    pointOfInterestRepository: asClass(repositories.PointOfInterestRepository).scoped(),

    postgresDataSource: asClass(PostgresDataSource).singleton(),
})

export default context;