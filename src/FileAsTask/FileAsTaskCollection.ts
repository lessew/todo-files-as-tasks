import { FileAsTask } from "../FileAsTask/FileAsTask";
import { Filter, FilterOperator } from "./Filter";

export class FileAsTaskCollection {
	private fats: FileAsTask[];
	private filters: Filter[];

	constructor(fats: FileAsTask[]) {
		this.fats = fats;
		this.filters = [];
		if (this.fats.length == 0) {
			console.error("No FileAsTasks found before filtering!");
		}
	}

	filterBy(filter: Filter): FileAsTaskCollection {
		if (this.fats.length == 0) {
			return this;
		}


		let filtered = this.fats.filter((aFile) => {
			const propertyValue: string = aFile.get(filter.propertyName);

			if (filter.operator == FilterOperator.exclude) {
				return (propertyValue != filter.propertyValue)
			}
			else if (filter.operator == FilterOperator.include) {
				return (propertyValue == filter.propertyValue)
			}
			else {
				console.error(`FilterOperator not recognized`);
			}
		})
		this.fats = filtered;
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
		return this.fats;
	}
}
