

export class Configuration{
    _domain: string;
    _project:string;

    public get domain(){
        return this._domain;
    }

    public set domain(d:string){
        this._domain = d;
    }

    public get project(){
        return this._project;
    }

    public set project(p:string){
        this._project = p;
    }
}