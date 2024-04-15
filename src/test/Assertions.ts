import { FolderModel } from "src/core/Interfaces/FolderModel";

export function assertFolderList(actualFolders:FolderModel[],expectedFolders:string[]):void{
    assert(actualFolders.length,expectedFolders.length,"Number of found folders correct?");
    for(let i=0;i<actualFolders.length;i++){
        if(expectedFolders.contains(actualFolders[i].name)){
            console.log(`TRUE: Foldername as expected: ${actualFolders[i].name}`)
        }
        else{
            console.log(`FALSE: Actual folder '${actualFolders[i].name}' not found in list ${expectedFolders.join(",")}`);
        }
    }
}

export function assert(actual:unknown,expected:unknown,message:string){
    let result = "";
    if(actual === expected){
        result = `TRUE: "${message}" - ${expected}`;
    }
    else{
        result = `FALSE: ${message} 
        Actual: "${actual}", 
        Expected: "${expected}"`
    }
    console.log(result);
}

export function assertTrue(isTrue:boolean,message:string){
    let result = "";
    if(isTrue){
        result = `TRUE: ${message}`;
    }
    else{
        result = `FALSE: ${message}`;
    }
    console.log(result)
}