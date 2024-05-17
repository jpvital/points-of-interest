import { asClass, createContainer } from 'awilix';

import controllers from '../api/controllers';
import services from '../api/services';

const context = createContainer({ injectionMode: 'CLASSIC' });

context.register({
    pointOfInterestController: asClass(controllers.PointOfInterestController),
    pointOfInterestService: asClass(services.PointOfInterestService)
})

export default context;