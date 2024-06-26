import { File } from "src/FileSystem/File";
import { PathPropertyHelper } from "src/Properties/PathPropertyHelper";

export class FileAsTask {
	file: File;
	static PROJECT_FIELD = "project";
	static TITLE_FIELD = "title";
	private pathHelper: PathPropertyHelper;


	constructor(file: File, pathH: PathPropertyHelper) {
		this.file = file;
		this.pathHelper = pathH;
	}

	getProject(): string {
		return this.pathHelper.getDirectory(this.file.fullPath);
	}

	getLink(): string {
		return this.file.fullPath;
	}

	async setProject(newProject: string): Promise<void> {
		let newPath = this.pathHelper.getPathWithNewDirectory(this.file.fullPath, newProject);
		if (this.pathHelper.isValidPath(newPath)) {
			await this.file.move(newPath)
		}
		else {
			throw new Error(`setProject: path is not valid: ${newPath}`)
		}
	}

	getTitle(): string {
		return this.pathHelper.getBasename(this.file.fullPath);
	}

	async setTitle(basename: string): Promise<void> {
		let newPath = this.pathHelper.getPathWithNewBasename(basename, this.file.fullPath);
		await this.file.move(newPath);
	}

	getYAMLProperty(propName: string): string {
		let prop = this.file.getYAMLProperty(propName);
		return prop == null ? "" : prop;
	}

	async setYAMLProperty(propName: string, propValue: string) {
		await this.file.setYAMLProperty(propName, propValue);
	}


	get(propName: string): string {
		if (propName === FileAsTask.PROJECT_FIELD) {
			return this.getProject();
		}
		if (propName == FileAsTask.TITLE_FIELD) {
			return this.getTitle();
		}
		let val = this.getYAMLProperty(propName);
		if (typeof val === 'undefined') {
			return "";
		}
		return this.getYAMLProperty(propName);
	}
}
