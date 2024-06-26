import { Directory } from "../Directory";
import { File } from "../File";
import { IOFactory } from "../IOFactory";
import { MockFileSystem } from "./MockFilesystem";

export class MockIOFactory extends IOFactory {
	fs: MockFileSystem;

	constructor(fs: MockFileSystem) {
		super();
		this.fs = fs;
		return this;
	}

	createFile(fullPath: string): File {
		return new File(fullPath, this.fs);
	}
	createDirectory(fullPath: string): Directory {
		return new Directory(fullPath, this, this.fs);
	}

	createDummyFile() {
		return new File("", this.fs);
	}

}
