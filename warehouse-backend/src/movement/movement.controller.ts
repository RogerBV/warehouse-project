import { Body, Controller, Get, Post } from "@nestjs/common";
import { MovementService } from "./movement.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateMovementDto } from "./dto/create-movement.dto";

@ApiTags('movements')
@Controller('movements')
export class MovementController {
    constructor(
        private readonly movementService: MovementService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create new movement' })
    @ApiResponse({ description: 'New Movement' })
    create (@Body() createMovement: CreateMovementDto) {
        return this.movementService.create(createMovement)
    }

    @Get()
    @ApiOperation({ summary: 'Get List of Movements' })
    @ApiResponse({ description: 'List of Movements' })
    findAll() {
        return this.movementService.findAll()
    }



}