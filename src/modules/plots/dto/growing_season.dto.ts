export class CreateGrowingSeasonDTO {
    projectId : number; 
    name : string;
    startDate: Date;
    endDate: Date;
}

export class UpdateGrowingSeasonDTO {
    id: number;
    projectId : number; 
    name : string;
    startDate: Date;
    endDate: Date;
}