import FileAsTaskPlugin from "main";
import { Directory } from "../Directory";
import { File } from "../File";
import { IOFactory } from "../IOFactory";
import { ObsidianFileSystem } from "./ObsidianFilesystem";

export class ObsidianIOFactory extends IOFactory {
	plugin: FileAsTaskPlugin;
	fs: ObsidianFileSystem;

	constructor(plugin: FileAsTaskPlugin) {
		super();
		this.plugin = plugin;
		this.fs = new ObsidianFileSystem(plugin);
	}

	createFile(path: string): File | Error {
		if (this.fs.pathIsFile(path)) {
			let file = new File(path, this.fs);
			return file;
		}
		else {
			return new Error(`Path is not a file: ${path}`);
		}
	}



	createDirectory(path: string): Directory | Error {
		if (this.fs.pathIsDirectory(path)) {
			let dir = new Directory(path, this, this.fs);
			return dir;
		}
		else {
			return new Error(`Path is not a directory: ${path}`);
		}
	}

}
