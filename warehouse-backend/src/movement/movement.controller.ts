import { Body, Controller, Get, Post } from "@nestjs/common";
import { InternalMovementService } from "./internal.movement.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateInternalMovementDto } from "./dto/create-internal-movement.dto";

@ApiTags('movements')
@Controller('movements')
export class MovementController {
    constructor(
        private readonly internalMovementService: InternalMovementService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create new movement' })
    @ApiResponse({ description: 'New Movement' })
    create (@Body() createInternalMovement: CreateInternalMovementDto) {
        return this.internalMovementService.create(createInternalMovement)
    }

    @Get()
    @ApiOperation({ summary: 'Get List of Movements' })
    @ApiResponse({ description: 'List of Movements' })
    findAll() {
        return this.internalMovementService.findAll()
    }



}