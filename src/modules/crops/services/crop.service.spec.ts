import { getRepositoryToken } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CropsConnectionService } from './crops.connection.service';
import { CropType } from '../entities/cropType.entity';
import { Crop } from '../entities/crop.entity';
import { CropService } from './crop.service';
import { once } from 'events';
const oneCrop = new Crop();
oneCrop.id = expect.any(Number);
oneCrop.name = "avocado";
oneCrop.color = "green";
oneCrop.typeId = 1;
oneCrop.type = expect.any(CropType);
oneCrop.strains = [];
const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn()
};
const mockConnectionService = {
    getStrainsByProject: jest.fn(projectId => [])
};

describe("Crop Service", () => {
    let cropService: CropService;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CropService,
                {
                    provide: getRepositoryToken(Crop),
                    useValue: mockRepository
                },
                {
                    provide: CropsConnectionService,
                    useValue: mockConnectionService
                }
            ],
        }).compile();

        cropService = module.get<CropService>(CropService);
    });
    it("should be defined", () => {
        expect(cropService).toBeDefined();
    });
    // type relationsType = "none"| "type"| "strains"| "all";

    describe("create", () => {
        let func;
        let repoSpy;
        describe("successfull call", () => {
            beforeAll(async () => {
                repoSpy = jest.spyOn(mockRepository, "save");
                func = await cropService.create({ name: "avocado", color: "green", typeId: 1 });
            });
            afterAll(() => {
                repoSpy.mockRestore();
            });
            it("should return a crop object", async () => {
                console.log(func);
                expect(func).toEqual(oneCrop);

            });
            it("it should be called 1 time and with complete entity", () => {
                expect(repoSpy).toBeCalledTimes(1);
                expect(repoSpy).toBeCalledWith(oneCrop);
            });
        });
        describe("name mistake", () => {
            beforeAll(async () => {
                repoSpy = jest.spyOn(mockRepository, "save");
                func = await cropService.create({ name: "213123", color: "green", typeId: 1 });
            });
            afterAll(() => {
                repoSpy.mockRestore();
            });
            it("should throw error for invalid name", async () => {
                await expect(cropService.create({ name: "213123", color: "green", typeId: 1 })).rejects.toThrow(Error);
            });
            it("save shouldn't be called", () => {
                expect(repoSpy).toBeCalledTimes(0);
            });
            // called 3 times for the 3 calls
        });
        describe("color mistake", () => {
            beforeAll(async () => {
                repoSpy = jest.spyOn(mockRepository, "save");
                func = await cropService.create({ name: "avocado", color: "gree", typeId: 1 });
            });
            afterAll(() => {
                repoSpy.mockRestore();
            });
            it("should throw error for invalid color", async () => {
                await expect(cropService.create({ name: "213123", color: "gree", typeId: 1 })).rejects.toThrow(Error);
            });
            it("save shouldn't be called", () => {
                expect(repoSpy).toBeCalledTimes(0);
            });
            // called 3 times for the 3 calls
        });
        describe("typeId mistake", () => {
            beforeEach(() => {
                repoSpy = jest.spyOn(mockRepository, "save");
            });
            afterAll(() => {
                repoSpy.mockRestore();
            });
            it("should throw error for overflow typeId", async () => {
                // also for float numbers
                await expect(cropService.create({ name: "avocado", color: "green", typeId: Number.MAX_VALUE + 2313 })).rejects.toThrow(Error);
            });
            it("should throw error for negative value typeId", async () => {
                await expect(cropService.create({ name: "avocado", color: "green", typeId: -1 })).rejects.toThrow(Error);
            })
            it("should throw error for zero value typeId", async () => {
                await expect(cropService.create({ name: "avocado", color: "green", typeId: 0 })).rejects.toThrow(Error);
            })
            it("save shouldn't be called", () => {
                expect(repoSpy).toBeCalledTimes(0);
            });
            // called 3 times for the 3 calls
        });
    });
    describe("update",()=>{

    });
});