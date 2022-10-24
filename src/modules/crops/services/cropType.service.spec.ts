import { CropTypeService } from '../services/cropType.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CropsConnectionService } from './crops.connection.service';
import { CropType } from '../entities/cropType.entity';
import { execPath } from 'process';
import { Crop } from '../entities/crop.entity';
import { CropStrain } from '../entities/cropStrain.entity';


const cropType1 = new CropType();
cropType1.name = 'cropType1';
const cropType2 = new CropType();
cropType2.name = 'cropType2';
const cropType3 = new CropType();
cropType3.name = 'cropType3';
const array = [cropType1, cropType2, cropType3];

const oneCropType = new CropType();
oneCropType.name = "api";
const mockRepository = {
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(array),
    findOne: jest.fn().mockResolvedValue(oneCropType),
};
const mockConnectionService = {
    getStrainsByProject: jest.fn(projectId => [])
};
describe("CropType Service", () => {
    let cropTypeService: CropTypeService;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CropTypeService,
                {
                    provide: getRepositoryToken(CropType),
                    useValue: mockRepository
                },
                {
                    provide: CropsConnectionService,
                    useValue: mockConnectionService
                }
            ],
        }).compile();

        cropTypeService = module.get<CropTypeService>(CropTypeService);
    });
    it("should be defined", () => {
        expect(cropTypeService).toBeDefined();
    });
    describe("create", () => {
        it("should have create a new cropType entity", async () => {
            const func = await cropTypeService.create({ name: "api" });
            console.log(func);
            expect(mockRepository.save).toBeCalledTimes(1);
            expect(mockRepository.save).toBeCalledWith({ id: 1, name: "api", Crop: [], strains: [] });
            return expect(func).resolves.toEqual({ id: 1, name: "api", Crop: [], strains: [] });
        });
        it("should have failed creating a new cropType entity", async () => {
            await expect(() => cropTypeService.create({ name: "123123" })).rejects.toThrow(Error);
            expect(cropTypeService.create({ name: "123123" })).toBeCalledWith({ name: "123123" });
            expect(mockRepository.save).toBeCalledTimes(0);
        });
        // can use the special library big naughty strings to check wait for confirmation
        it("should have failed creating a new cropType entity because contains special letters", async () => {
            await expect(cropTypeService.create({ name: "$1.00" })).rejects.toThrow(Error);
        })
    });
    // unnecceray as it a repository function


    // it("should return whole repository data",()=>{
    //     return expect(cropTypeService.getAll()).toEqual([]);
    // })
    describe("getCropTypeById", () => {
        let repoSpy = jest.spyOn(mockRepository, "findOne");
        afterEach(() => {
            repoSpy.mockRestore();
            repoSpy = jest.spyOn(mockRepository, "findOne");
        });
        it("should return a cropType entity", async () => {
            await expect(cropTypeService.getCropTypeById(1)).resolves.toEqual(oneCropType);
            expect(repoSpy).toBeCalledWith({ where: { id: 1 } });
        });
        test('should get an error for non negative nor positive invalid id', async () => {
            await expect(cropTypeService.getCropTypeById(0)).rejects.toThrow('CropType id cannot be negative')
            expect(repoSpy).toBeCalledTimes(0);
            // return await cropTypeService.getCropTypeById(0).catch(e => expect(e.message).toBe('CropType id cannot be negative'));
        });
        test('should get an error for negative invalid id', async () => {
            await expect(cropTypeService.getCropTypeById(Number.MIN_VALUE - 1)).rejects.toThrow(Error);
            await expect(cropTypeService.getCropTypeById(Number.MIN_VALUE - 1)).rejects.toThrow('CropType id cannot be negative');
            expect(repoSpy).toBeCalledTimes(0);
            //return await cropTypeService.getCropTypeById(Number.MIN_VALUE - 1).catch(e => expect(e.message).toBe('CropType id cannot be negative'));
        });
        test('should get an error for max positive invalid id', async () => {
            await expect(cropTypeService.getCropTypeById(Number.MAX_VALUE + 1)).rejects.toThrow(Error);
            expect(repoSpy).toBeCalledTimes(0);
        });
    });
    describe("getAll", () => {
        it("should return an array of crop Type objects", async () => {
            const repoSpy = jest.spyOn(mockRepository, "find");
            const getAll = await cropTypeService.getAll();
            expect(getAll).toEqual(array);
            expect(repoSpy).toBeCalledTimes(1);
            console.log(array);
        });
    });
    describe("getAllTypesByStrainIds", () => {
        // didn't understand if it returning by strain ids or crop type ids????
        // didn't understand which ids been passed? is it the main id, the cropId or the croptype Id?
        let idNumbers: number[] = [1, 2, 3];

        it("should return an array of cropTypes", async () => {
            let repoSpy = jest.spyOn(mockRepository, "find").mockImplementationOnce(jest.fn((options: FindManyOptions<CropType>) => Promise.resolve(array)));
            await expect(cropTypeService.getAllTypesByStrainIds(idNumbers)).resolves.toEqual(array);
            expect(repoSpy).toBeCalledTimes(1);
            expect(repoSpy).toBeCalledWith({
                where: {
                    id: In(idNumbers)
                },
            });
        });

        it("should fail and throw exception", async () => {
            let repoSpy = jest.spyOn(mockRepository, "find").mockImplementationOnce(jest.fn((options: FindManyOptions<CropType>) => Promise.resolve(array)));
            idNumbers = [1, 4];
            await expect(cropTypeService.getAllTypesByStrainIds(idNumbers)).rejects.toThrow(Error);
            expect(repoSpy).toBeCalledTimes(0); // not sure!!
            expect(repoSpy).toBeCalledWith({
                where: {
                    id: In(idNumbers)
                },
            });
        });
        it("should fail and throw exception because 0 id doesn't exists", async () => {
            let repoSpy = jest.spyOn(mockRepository, "find").mockImplementationOnce(jest.fn((options: FindManyOptions<CropType>) => Promise.resolve(array)));
            idNumbers = [0];
            await expect(cropTypeService.getAllTypesByStrainIds(idNumbers)).rejects.toThrow(Error);
            expect(repoSpy).toBeCalledTimes(0); // not sure!!
            expect(repoSpy).toBeCalledWith({
                where: {
                    id: In(idNumbers)
                },
            });
        });

        it("should fail and throw exception because of overflow value", async () => {
            let repoSpy = jest.spyOn(mockRepository, "find").mockImplementationOnce(jest.fn((options: FindManyOptions<CropType>) => Promise.resolve(array)));
            idNumbers = [1, Number.MAX_VALUE + 1];
            await expect(cropTypeService.getAllTypesByStrainIds(idNumbers)).rejects.toThrow(Error);
            expect(repoSpy).toBeCalledTimes(0); // not sure!!
            expect(repoSpy).toBeCalledWith({
                where: {
                    id: In(idNumbers)
                },
            });
        });

        it("should fail and throw exception because of negative value", async () => {
            let repoSpy = jest.spyOn(mockRepository, "find").mockImplementationOnce(jest.fn((options: FindManyOptions<CropType>) => Promise.resolve(array)));
            idNumbers = [1, 2, -3];
            await expect(cropTypeService.getAllTypesByStrainIds(idNumbers)).rejects.toThrow(Error);
            expect(repoSpy).toBeCalledTimes(0); // not sure!!
            expect(repoSpy).toBeCalledWith({
                where: {
                    id: In(idNumbers)
                },
            });
        });
    });
    describe("getAllCropsTypeByProject", () => {
        let cropStrain1 = new CropStrain();
        cropStrain1.name = "cropStrain1";

        let cropStrain2 = new CropStrain();
        cropStrain2.name = "cropStrain2";

        let cropStrain3 = new CropStrain();
        cropStrain3.name = "cropStrain3";

        let cropStrainsArray = [cropStrain1, cropStrain2, cropStrain3];
        let cropTypesDictionary = new Map<number, CropType>([[cropType1.id, cropType1], [cropType2.id, cropType2], [cropType3.id, cropType3]]);
        it("should return a crop type dictionary of ", async () => {
            let repoSpyConnectionService = jest.spyOn(mockConnectionService, "getStrainsByProject");
            repoSpyConnectionService.mockImplementationOnce(jest.fn(projectId => cropStrainsArray));
            let repoSpyCropTypeService = jest.spyOn(cropTypeService, "getAllTypesByStrainIds");
            await expect(cropTypeService.getAllCropsTypeByProject(1)).resolves.toEqual(cropTypesDictionary);
            expect(repoSpyConnectionService).toBeCalledTimes(1);
            expect(repoSpyConnectionService).toBeCalledWith(1);
            expect(repoSpyCropTypeService).toBeCalledTimes(1);
            expect(repoSpyCropTypeService).toBeCalledWith([cropStrain1.id, cropStrain2.id, cropStrain3.id]);
        });

        it("should throws an exception because the connection method didn't work or didn't find anything", async () => {
            // not sure what it will return or will throws an exception????
            let repoSpyConnectionService = jest.spyOn(mockConnectionService, "getStrainsByProject");
            let repoSpyCropTypeService = jest.spyOn(cropTypeService, "getAllTypesByStrainIds");
            //expect(cropTypeService.getAllCropsTypeByProject(321312312)).resolves.toEqual(new Map<number,CropType>());
            await expect(cropTypeService.getAllCropsTypeByProject(321312312)).rejects.toThrow(Error);
            expect(repoSpyConnectionService).toBeCalledTimes(1);
            expect(repoSpyConnectionService).toBeCalledWith(321312312);
            expect(repoSpyCropTypeService).toBeCalledTimes(0);
        });

        it("should throws an exception because of negative value", async () => {
            // not sure what it will return or will throws an exception????
            let repoSpyConnectionService = jest.spyOn(mockConnectionService, "getStrainsByProject");
            let repoSpyCropTypeService = jest.spyOn(cropTypeService, "getAllTypesByStrainIds");
            //expect(cropTypeService.getAllCropsTypeByProject(-1)).resolves.toEqual(new Map<number,CropType>());
            await expect(cropTypeService.getAllCropsTypeByProject(-1)).rejects.toThrow(Error);
            expect(repoSpyConnectionService).toBeCalledTimes(0);
            expect(repoSpyCropTypeService).toBeCalledTimes(0);
        });

        it("should throws an exception because of overflow values", async () => {
            // not sure what it will return or will throws an exception????
            let repoSpyConnectionService = jest.spyOn(mockConnectionService, "getStrainsByProject");
            let repoSpyCropTypeService = jest.spyOn(cropTypeService, "getAllTypesByStrainIds");
            //expect(cropTypeService.getAllCropsTypeByProject(Number.MAX_VALUE+233))).resolves.toEqual(new Map<number,CropType>());
            await expect(cropTypeService.getAllCropsTypeByProject(Number.MAX_VALUE + 233)).rejects.toThrow(Error);
            await expect(cropTypeService.getAllCropsTypeByProject(Number.MIN_VALUE - 500)).rejects.toThrow(Error);
            expect(repoSpyConnectionService).toBeCalledTimes(0);
            expect(repoSpyCropTypeService).toBeCalledTimes(0);
        });

        it("should throws an exception for unmatched cropstrains found ", async () => {
            cropStrain1.id = 55;
            cropStrain2.id = 44;
            cropStrain3.id = 130; // unmatched cropstrains ids
            let repoSpyConnectionService = jest.spyOn(mockConnectionService, "getStrainsByProject");
            repoSpyConnectionService.mockImplementationOnce(projectId => cropStrainsArray);
            let repoSpyCropTypeService = jest.spyOn(cropTypeService, "getAllTypesByStrainIds");
            mockRepository.find.mockResolvedValueOnce([]);
            await expect(cropTypeService.getAllCropsTypeByProject(50)).rejects.toThrow(Error);
            expect(repoSpyConnectionService).toBeCalledTimes(50);
            expect(repoSpyConnectionService).toBeCalledWith(50);
            expect(repoSpyCropTypeService).toHaveProperty("length");
            expect(repoSpyCropTypeService).toHaveReturnedWith([1]);
            expect(repoSpyCropTypeService).toBeCalledTimes(1);
            expect(repoSpyCropTypeService).toBeCalledWith([cropStrain1.id, cropStrain2.id, cropStrain3.id]);
        });

    });
});