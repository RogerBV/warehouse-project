import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from "./category.service";
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoryService', () => {
    let service: CategoryService;
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
                CategoryService,
                {
                    provide: getRepositoryToken(Category),
                    useValue: mockRepository
                }
            ]
        }).compile();

        service = module.get<CategoryService>(CategoryService)
    });

    afterEach(async () => {
        await module.close();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    describe('create', () => {
        it('create', async () => {
            const dto: CreateCategoryDto = { name: 'Electronic' };
            const categorySaved = { id: 1, ...dto };

            mockRepository.save.mockResolvedValue(categorySaved);

            const result = await service.create(dto);

            expect(result).toEqual(categorySaved)

            expect(mockRepository.save).toHaveBeenCalledWith(dto);
        })
    })

    describe('findAll', () => {
        it('should return an arra of categories', async () => {
            const categories = [{
                id: 1, name: 'Electronic'
            }]

            mockRepository.find.mockResolvedValue(categories)

            const result = await service.getCategories()

            expect(result).toEqual(categories)
            expect(mockRepository.find).toHaveBeenCalled()
        })
    })
})