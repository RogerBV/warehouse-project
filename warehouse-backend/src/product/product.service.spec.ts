import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { ProductService } from "./product.service"
import { Product } from "./product.entity"
import { UploadService } from "../upload/upload.service"
import { CreateProductDto } from "./dto/create-product.dto"

describe('ProductService', () => {
    let service: ProductService
    let module: TestingModule
    let mockRepository: {
        create: jest.Mock;
        save: jest.Mock;
        find: jest.Mock;
    }

    let mockUploadService: {
        uploadFile: jest.Mock;
    }

    beforeEach(async() => {
        mockRepository = {
            create: jest.fn((dto) => dto),
            save: jest.fn((entity) => entity),
            find: jest.fn()
        }

        mockUploadService = {
            uploadFile: jest.fn()
        }

        module = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: mockRepository
                },
                {
                    provide: UploadService,
                    useValue: mockUploadService
                }
            ]
        }).compile()

        service = module.get<ProductService>(ProductService)
    })

    afterEach(async() => {
        await module.close()
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    describe('create', () => {
        it('create', async() => {
            const dto: CreateProductDto = { name: 'Tijera', category_id: 1, }
            const productSaved = {
                name: 'Tijera',
                category: { id: 1 },
                image_url: '',
                id: 1
            }

            mockRepository.save.mockResolvedValue(productSaved);

            const result = await service.create(dto)
            expect(result).toEqual(productSaved)

            expect(mockRepository.save).toHaveBeenCalledWith(
                expect.objectContaining({
                    name: 'Tijera',
                    category: { id: 1 },
                    image_url: ''
                })
            )
        })
    })
})