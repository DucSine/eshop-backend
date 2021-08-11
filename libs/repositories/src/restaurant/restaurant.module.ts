import { Module } from '@nestjs/common';
import { RestaurantRepo } from './restaurant.repo';

@Module({
    providers: [RestaurantRepo],
    exports: [RestaurantRepo]
})
export class RestaurantModule {}
