
import { CropTypeController } from './cropType.controller';
import { CropTypeService } from '../services/cropType.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CropType } from '../entities/cropType.entity';
import { Test, TestingModule } from '@nestjs/testing';

describe("Crop Type Controller", () => {
    let cropTypeController: CropTypeController;
    // let cropTypeService: CropTypeService;
    let userRepository: Repository<CropType>;
    const mockService ={};


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CropTypeController],
            providers: [
                CropTypeService],
                
            //         provide: getRepositoryToken(CropType),
            //         useValue: {
            //             save: jest.fn(),
            //             find: jest.fn(),
            //             findOne: jest.fn()
            //         }
            //     },
            // ],
        }).overrideProvider(CropTypeService).useValue(mockService).compile();

        // cropTypeService = new CropTypeService(getRepositoryToken(CropType),);
        cropTypeController = module.get<CropTypeController>(CropTypeController);
    });
    it("should be defined", () => {
        expect(cropTypeController).toBeDefined();
    });
});
    // describe('findAll', () => {
    //     it('should return an array of cats', async () => {
    //         const result = ['test'];
    //         jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

    //         expect(await catsController.findAll()).toBe(result);
    //     });
    // });
