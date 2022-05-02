
export default class ProjectModel {
    public id : number;

    public name : string;
    public iconSrc : string;

    constructor(id : number, projectName : string, iconSrc : string) {
        this.id = id;
        this.name = projectName;
        this.iconSrc = iconSrc;
    }
}