import { Test, TestingModule } from "@nestjs/testing"
import { WarehouseService } from "./warehouse.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Warehouse } from "./warehouse.entity";
import { CreateWarehouseDto } from "./dto/create-warehouse.dto";

describe('WarehouseService', () => {
    let service: WarehouseService;
    let module: TestingModule;
    let mockRepository: {
        save: jest.Mock;
        find: jest.Mock;
    }

    beforeEach(async () => {
        mockRepository = {
            save: jest.fn(),
            find: jest.fn()
        }

        module = await Test.createTestingModule({
            providers: [
                WarehouseService,
                {
                    provide: getRepositoryToken(Warehouse),
                    useValue: mockRepository
                }
            ]
        }).compile();

        service = module.get<WarehouseService>(WarehouseService);
    })

    afterEach(async () => {
        await module.close();
    })

    it('should it be defined', () => {
        expect(service).toBeDefined();
    })

    describe('create', () => {
        it('create', async () => {
            const dto: CreateWarehouseDto = { name: 'Warehouse 1', address: 'Address 1' }
            const warehouseSaved = { id: 1, ...dto }

            mockRepository.save.mockResolvedValue(warehouseSaved);

            const result = await service.create(dto)
            expect(result).toEqual(warehouseSaved)

            expect(mockRepository.save).toHaveBeenCalledWith(dto)
        })
    })
})