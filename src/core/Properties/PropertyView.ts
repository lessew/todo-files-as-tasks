// TODO: use better symbols
export abstract class PropertyView{
    statusNotSet:string = "◌";
    statusInvalid:string = "⊗";
    editIcon:string = "✎";
    newWindowIcon:string = "✇";

    abstract build(rootElement:HTMLElement):void;
}