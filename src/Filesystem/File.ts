import { Filesystem } from "./FileSystem";

export class File {
	fs: Filesystem;
	fullPath: string;

	constructor(fullPath: string, fs: Filesystem) {
		this.fs = fs;
		this.fullPath = fullPath;
		if (!fs.pathIsFile(fullPath)) {
			throw new Error(`"${fullPath}" is not a File`);
		}
	}

	async move(newPath: string): Promise<void> {
		await this.fs.move(this.fullPath, newPath);
		this.fullPath = newPath;
	}

	getYAMLProperty(name: string): string | null {
		return this.fs.getYAMLProperty(this.fullPath, name);
	};

	async setYAMLProperty(name: string, value: string): Promise<void> {
		return this.fs.setYAMLProperty(this.fullPath, name, value);
	}

	static async createEmptyFile(fullPath: string, fs: Filesystem, delay: (ms: number) => void): Promise<File> {
		await fs.touch(fullPath);
		delay(150);
		//await new Promise(resolve => setTimeout(resolve, 150));
		let f = new File(fullPath, fs);
		return f;

	}

}


