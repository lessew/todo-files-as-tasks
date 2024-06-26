import { File } from "../File"
import { FileSystem } from "../FileSystem"

export class DummyFilesystem implements FileSystem {
	move(currentPath: string, newPath: string): Promise<void> {
		return Promise.resolve();
	}
	readDir(path: string): string[] | [] {
		return [];
	}
	pathIsFile(path: string): boolean {
		return true;
	}
	pathIsDirectory(path: string): boolean {
		return true;
	}
	getYAMLProperty(path: string, propName: string): string {
		return "";
	}
	setYAMLProperty(path: string, propName: string, propValue: string): Promise<void> {
		return Promise.resolve();
	}

}


export class DummyFile extends File {
	constructor() {
		super("", new DummyFilesystem())
	}
	override move(newPath: string): Promise<void> {
		return Promise.resolve();
	}

	override getYAMLProperty(name: string): string | null {
		return "";
	}

	override setYAMLProperty(name: string, value: string): Promise<void> {
		return Promise.resolve();
	}


}
