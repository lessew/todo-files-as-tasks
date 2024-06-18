import { Whitelist } from "./Whitelist";

export class PathPropertyHelper {
	allowedDirectories: Whitelist;
	defaultValue: string;

	constructor(allowed: string[], defaultValue: number) {
		this.allowedDirectories = new Whitelist(allowed);
		this.defaultValue = allowed[defaultValue];
	}

	getPathWithNewBasename(newBasename: string, fullPath: string): string {
		const replaceMe = this.getBasename(fullPath);
		const result = fullPath.replace(replaceMe, newBasename);
		return result;
	}

	getPathWithNewDirectory(currentPath: string, newDirectory: string): string {
		// => "path","path/to/workproject/this.md","path/to/newproject"  
		const currentDirectory = this.getDirectory(currentPath); // => to/workproject
		const result = currentPath.replace(currentDirectory, newDirectory); // => path/to/newproject/this.md
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


	setDirectorylist(folders: string[]): void {
		this.allowedDirectories = new Whitelist(folders);
	}

	getDirectorylist(): Whitelist {
		return this.allowedDirectories;
	}

	getDirectory(fullPath: string): string {
		let f = this.getFilename(fullPath);
		return fullPath.replace(f, "");
	}

	validate(newValue: string): boolean {
		return newValue in this.allowedDirectories.toArray();
	}

}
