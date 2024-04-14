export abstract class PathStrategy{
    regExp:RegExp = /^[a-zA-Z\/\.]+$/;


    /**
     * Derive the value from the path of the file
     * @param path the fullpath of the file
     */
    abstract getValue(path:string):string;

    validate(newVal:string):boolean{
        const match = this.regExp.test(newVal);
        return match;
    }

    getBasename(path:string):string{
        //     split into array by /
        //                     take last element of array
        //                                  // remove extension if it exists
        return path.split("/").reverse()[0].split(".")[0];
    }

    getNewFullPathWithBasename(path:string,basename:string){ 
        const replaceMe = this.getBasename(path);
        const result = path.replace(replaceMe,basename);
        return result;
    }

    getFolderName(path:string):string{
               // split into array by /
                            // take second element (first element is filename)
        return path.split("/").reverse()[1];
    }
        
    getNewFullPathWithTopLevelFolder(path:string,newFoldername:string){
        const replaceMe = this.getFolderName(path);
        const result = path.replace(replaceMe,newFoldername);
        return result;
    }
/*
    private getFileExtension(path:string):string{
        const s = path.split("/").reverse()[0].split(".");
        if(s.length>1){
            return "." + s.reverse()[0];
        }
        else{
            return "";
        }
    }
*/
}