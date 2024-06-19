import { File } from "src/Filesystem/File";
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
		let newPath = this.pathHelper.getFullPathFromNewDirectory(newProject, this.file.fullPath);
		if (this.pathHelper.validate(newPath)) {
			await this.file.move(newPath)
		} {
			throw new Error(`setProject: path is not valid: ${newPath}`)
		}
	}

	getTitle(): string {
		return this.pathHelper.getBasename(this.file.fullPath);
	}

	async setTitle(basename: string): Promise<void> {
		let newPath = this.pathHelper.getFullPathFromNewBasename(basename, this.file.fullPath);
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
		return this.getYAMLProperty(propName);
	}
}
