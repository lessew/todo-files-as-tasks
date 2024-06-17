import { Directory } from "src/Filesystem/Directory";
import { FileAsTask } from "../FileAsTask/FileAsTask";
import { Filter, FilterOperator } from "./Filter";
import { File } from "src/Filesystem/File";
import { PathPropertyHelper } from "src/Properties/PathPropertyHelper";

<<<<<<< HEAD
export class FileAsTaskCollection {
	private rootDirectory: Directory;
	private filesAsTask: FileAsTask[];
	private filters: Filter[];
	private pathHelper: PathPropertyHelper;

	constructor(rf: Directory, ph: PathPropertyHelper) {
		this.rootDirectory = rf;
		this.loadFilesAsTask();
		this.filters = [];
		this.pathHelper = ph;
	}

	private loadFilesAsTask() {
		const files: File[] = this.rootDirectory.getFiles();
		let fats: FileAsTask[] = [];

		files.forEach(aFile => {
			let fat: FileAsTask = new FileAsTask(aFile, this.pathHelper);
			fats.push(fat);
		})
		this.filesAsTask = fats;
	}

	getRootDirectory(): Directory {
		return this.rootDirectory;
	}

	filterBy(filter: Filter): FileAsTaskCollection {
		let filtered = this.filesAsTask.filter((aFile) => {
			const propertyValue: string = aFile.get(filter.propertyName);

			if (filter.operator == FilterOperator.exclude) {
				return (propertyValue != filter.propertyValue)
			}
			else if (filter.operator == FilterOperator.include) {
				return (propertyValue == filter.propertyValue)
			}
		})
		this.filesAsTask = filtered;
		this.filters.push(filter);
		return this;
	}

	bulkFilterBy(list: Filter[]): FileAsTaskCollection {
		list.forEach(filterBy => {
			this.filterBy(filterBy);
		});
		return this;
	}

	get(): FileAsTask[] {
		return this.filesAsTask;
	}
}
