import { File } from "./File";
import { Filesystem } from "./Filesystem";
import { IOFactory } from "./IOFactory";

export class Directory {
	children: (File | Directory)[];
	fs: Filesystem;
	factory: IOFactory;
	fullPath: string;

	constructor(fullPath: string, factory: IOFactory, fs: Filesystem) {
		this.factory = factory;
		this.fs = fs;
		this.fullPath = fullPath;
		if (!this.fs.pathIsDirectory(fullPath)) {
			throw Error(`Path is not a directory: "${fullPath}"`);
		}
		this.loadChildren();
	}

	loadChildren(): void {
		let paths = this.fs.readDir(this.fullPath);
		let result: (File | Directory)[] = [];
		paths.forEach(childPath => { // markdown.md | home 
			if (this.fs.pathIsDirectory(childPath)) {
				let dir = this.factory.createDirectory(childPath) as Directory;
				result.push(dir);
			}
			else if (this.fs.pathIsFile(childPath)) {
				let file = this.factory.createFile(childPath) as File;
				result.push(file);
			}
		})
		this.children = result;
	}

	getDirectories(): Directory[] {
		let result: Directory[] = [this];

		this.children.forEach((resource) => {
			if (this.factory.isFile(resource)) {
				// nothin'
			}
			else if (this.factory.isDirectory(resource)) {
				result = [...result, ...resource.getDirectories()];
			}
		})
		return result;
	}

	getFiles(): File[] {
		let result: File[] = [];
		this.children.forEach(resource => {
			if (this.factory.isFile(resource)) {
				result.push(resource);
			}
			else if (this.factory.isDirectory(resource)) {
				result = [...result, ...resource.getFiles()];
			}
		})
		return result;
	}

}
