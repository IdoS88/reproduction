import { TestingModule, Test } from "@nestjs/testing";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { CropsConnectionService } from "./crops.connection.service";

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};

const mockRepository = {
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(array),
    findOne: jest.fn().mockResolvedValue(oneCropType),
};
const dataSourceMockFactory: () => MockType<DataSource> = {
    createQueryBuilder: jest.fn(() => {
        from: jest.fn(() => {
            leftJoin: jest.fn(() => {
                where: jest.fn(() => {
                    getMany: jest.fn(() => [])
                })
            })
        })
    })
};

describe("Crop Connection Service", () => {
    let cropConnectionService: CropsConnectionService;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CropsConnectionService,
                {
                    provide: getDataSourceToken(),
                    useValue: 
                },
            ],
        }).compile();

        cropConnectionService = module.get<CropsConnectionService>(CropsConnectionService);
    });
    it("should be defined", () => {
        expect(cropConnectionService).toBeDefined();

    })
});