export interface Observer {
    update():Promise<void>;
}