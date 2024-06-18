import { Whitelist } from "./Whitelist";

export class PathPropertyHelper {
	allowedFolders: Whitelist;
	defaultValue: string;

	constructor(allowed: string[], defaultValue: number) {
		this.allowedFolders = new Whitelist(allowed);
		this.defaultValue = allowed[defaultValue];
	}

	getPathWithNewBasename(newBasename: string, fullPath: string): string {
		const replaceMe = this.getBasename(fullPath);
		const result = fullPath.replace(replaceMe, newBasename);
		return result;
	}

	getBasename(fullPath: string): string {
		//     split into array by /
		//                     take last element of array
		//                                  // remove extension if it exists
		return fullPath.split("/").reverse()[0].split(".")[0];
	}

	getFilename(fullPath: string): string {
		//     split into array by /
		//                     take last element of array
		//                                  // remove extension if it exists
		return fullPath.split("/").reverse()[0];
	}

	getPathWithNewDirectory(currentPath: string, newDirectory: string): string {
		// => "path","path/to/workproject/this.md","path/to/newproject"  
		const currentDirectory = this.getDirectory(currentPath); // => to/workproject
		const result = currentPath.replace(currentDirectory, newDirectory); // => path/to/newproject/this.md
		return result;
	}

	setFolderlist(folders: string[]): void {
		this.allowedFolders = new Whitelist(folders);
	}

	getFolderlist(): Whitelist {
		return this.allowedFolders;
	}

	getDirectory(fullPath: string): string {
		let f = this.getFilename(fullPath);
		return fullPath.replace(f, "");
	}

	validate(newValue: string): boolean {
		return newValue in this.allowedFolders.toArray();
	}

}
