import { Todo } from "../Todo";

export interface View{
    todos:Todo[];

    // tbi: set configuration such as pagination, columns, sorting setc

    // rootElement is the return value
    build(rootElement:HTMLElement):HTMLElement;

}