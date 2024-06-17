import { FileAsTask } from "../FileAsTask/FileAsTask";
import { Filter, FilterOperator } from "./Filter";

export class FileAsTaskCollection {
	private filesAsTask: FileAsTask[];
	private filters: Filter[];

	constructor(filesAsTask: FileAsTask[]) {
		this.filesAsTask = filesAsTask;
		this.filters = [];
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
