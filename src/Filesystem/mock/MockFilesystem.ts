import { Filesystem } from "../Filesystem";
import { MockFileTree } from "./MockFileTree";

export class MockFileSystem implements FileSystem {
	tree: MockFileTree;

	constructor(data: MockFileTree) {
		this.tree = data;
	}


	async move(currentPath: string, newPath: string): Promise<void> {

	}

	async touch(fullPath: string): Promise<void> {
		return;
	}

	readDir(path: string): string[] | [] {
		if (path in this.tree.directories) {
			return this.tree.directories[path];
		}
		return [];
	}

	pathIsFile(path: string): boolean {
		return path in this.tree.files;
	}

	pathIsDirectory(path: string): boolean {
		return path in this.tree.directories;
	}

	getYAMLProperty(path: string, propName: string): string | "" {
		try {
			return this.tree.files[path].yaml![propName];
		}
		catch (e) {
			return "";
		}
	}

	async setYAMLProperty(path: string, propName: string, propValue: string): Promise<void> {
		if (!('yaml' in this.tree.files[path])) {
			this.tree.files[path].yaml = {};
		}
		this.tree.files[path].yaml![propName] = propValue;
	}

}
