export class CreatePlotDTO {
    projectId : number;
    crop_strainId : number;
    seasonId: number;
    main_gplotId: number;
    startDate: Date;
    endDate: Date;
}

export class UpdatePlotDTO {
    id: number;
    projectId : number;
    crop_strainId : number;
    seasonId: number;
    main_gplotId: number;
    startDate: Date;
    endDate: Date;
}