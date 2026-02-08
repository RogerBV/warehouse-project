import { Module } from "@nestjs/common";
import { InternalMovementService } from "./internal.movement.service";
import { MovementController } from "./movement.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InternalMovement } from "./internal.movement.entity";

@Module({
    imports: [TypeOrmModule.forFeature([InternalMovement])],
    controllers: [MovementController],
    providers: [InternalMovementService]
})

export class MovementModule {}