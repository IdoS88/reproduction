import { getRepositoryToken } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CropsConnectionService } from './crops.connection.service';
import { CropType } from '../entities/cropType.entity';
import { Crop } from '../entities/crop.entity';
import { CropService } from './crop.service';
import { once } from 'events';
import { CropStrain } from '../entities/cropStrain.entity';
// @ts-ignore
import * as json from 'big-list-of-naughty-strings';
const oneCrop = new Crop();
oneCrop.id = expect.any(Number);
oneCrop.name = "avocado";
oneCrop.color = "green";
oneCrop.typeId = 1;
oneCrop.type = expect.any(CropType);
oneCrop.strains = expect.any(Array<CropStrain>);
const updateCrop = new Crop;
updateCrop.id = expect.any(Number);
updateCrop.name = "banana";
updateCrop.color = "yellow";
updateCrop.typeId = 3;
updateCrop.type = expect.any(CropType);
updateCrop.strains = expect.any(Array<CropStrain>);

const oneCropType = new CropType();
oneCropType.id = 3;
oneCropType.name = "Gidulim";

const mockRepository = {
    save: jest.fn((crop:Crop) => Promise.resolve(crop)),
    find: jest.fn(),
    findOne: jest.fn()
};
const mockConnectionService = {
    getStrainsByProject: jest.fn(projectId => []),
    getCropTypeById: jest.fn(id => Promise.resolve(oneCropType))
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
            json.forEach(word => {
                it("should throw error for invalid name", async () => {
                    await expect(cropService.create({ name: word, color: "green", typeId: 1 })).rejects.toThrow(Error);
                }); 
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
    describe("update", () => {
        let func;
        let spyCropId;
        describe("successfull call", () => {
            beforeAll(async () => {
                mockRepository.findOne.mockImplementationOnce((options: FindOneOptions<Crop>) => Promise.resolve(oneCrop));
                spyCropId = jest.spyOn(cropService, "getCropById");
                func = await cropService.update(1, { name: "banana", color: "yellow", typeId: 3 });
            });
            afterAll(() => {
                spyCropId.mockRestore();
                oneCrop.name = "avocado";
                oneCrop.color = "green";
                oneCrop.typeId = 1;
            });

            it("should return a crop object", () => {
                console.log(func);
                expect(func).toEqual(updateCrop);

            });
            it("should be called 1 time and with complete entity", () => {
                expect(mockRepository.save).toBeCalledTimes(1);
                expect(mockRepository.save).toBeCalledWith(updateCrop);
            });
            it("should be called 1 time and with id of input and return the searched crop", () => {
                expect(spyCropId).toBeCalledTimes(1);
                expect(spyCropId).toBeCalledWith(1, "all");
                expect(spyCropId.mock.results[0].value).resolves.toEqual(oneCrop);
            })
            it("should be called 1 time and with CropType id and return a croptype entity", async () => {
                expect(mockConnectionService.getCropTypeById).toHaveBeenCalledTimes(1);
                expect(mockConnectionService.getCropTypeById).toHaveBeenCalledWith(updateCrop.typeId);
                expect(mockConnectionService.getCropTypeById.mock.results[0].value).resolves.toEqual(oneCropType);
            });
        });
        describe("updated entity not found", () => {
            let spyCropId;
            beforeAll(async () => {
                mockRepository.findOne.mockResolvedValueOnce(null);
                spyCropId = jest.spyOn(cropService, "getCropById");
            });
            afterAll(() => {
                spyCropId.mockRestore();
            });
            it("should throw an exception for unfound entity to update", async () => {
                await expect(cropService.update(123123, { name: "banana", color: "yellow", typeId: 3 })).rejects.toThrow(Error);
            });
            it("should throw an exception for overflow number id", async () => {
                await expect(cropService.update(Number.MAX_VALUE + 21312312, { name: "banana", color: "yellow", typeId: 3 })).rejects.toThrow(Error);
            });
            it("should throw an exception for negative number id", async () => {
                await expect(cropService.update(-5, { name: "banana", color: "yellow", typeId: 3 })).rejects.toThrow(Error);
            });
        });
        describe("incorrect values in update", () => {
            let spyCropId;
            beforeAll(async () => {
                mockRepository.findOne.mockImplementation((options: FindOneOptions<Crop>) => Promise.resolve(oneCrop));
                spyCropId = jest.spyOn(cropService, "getCropById");
            });
            afterAll(() => {
                spyCropId.mockRestore();
            });
            it("should fails and throws an exception for invalid name", async () => {
                await expect(cropService.update(1, { name: "123123", color: "yellow", typeId: 3 })).rejects.toThrow(Error);
            });
            it("should fails and throws an exception for invalid name", async () => {
                await expect(cropService.update(1, { name: "@$@\n", color: "yellow", typeId: 3 })).rejects.toThrow(Error);
            });
            json.forEach(word => {
                it("should throw error for invalid name", async () => {
                    await expect(cropService.update(1, { name: word, color: "yellow", typeId: 3 })).rejects.toThrow(Error);
                }); 
            });
            it("should fails and throws an exception for invalid color", async () => {
                await expect(cropService.update(1, { name: "banana", color: "yell", typeId: 3 })).rejects.toThrow(Error);
            });
            it("should fails and throws an exception for invalid negative typeId", async () => {
                await expect(cropService.update(1, { name: "banana", color: "yellow", typeId: -5 })).rejects.toThrow(Error);
            });
            it("should fails and throws an exception for invalid overflow typeId number", async () => {
                await expect(cropService.update(1, { name: "123123", color: "yellow", typeId: Number.MAX_VALUE+21312321 })).rejects.toThrow(Error);
            });
        });
    });
});