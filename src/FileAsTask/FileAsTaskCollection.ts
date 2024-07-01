import { FileAsTask } from "../FileAsTask/FileAsTask";
import { Filter, FilterOperator } from "./Filter";

export class FileAsTaskCollection {
	private fats: FileAsTask[];
	private filters: Filter[];

	constructor(fats: FileAsTask[]) {
		this.fats = fats;
		this.filters = [];
	}

	filterBy(filter: Filter): FileAsTaskCollection {
		let filtered = this.fats.filter((aFile) => {
			const propertyValue: string = aFile.get(filter.propertyName);

			if (filter.operator == FilterOperator.exclude) {
				console.log(`comparing ${propertyValue}!= ${filter.propertyValue}`)
				return (propertyValue != filter.propertyValue)
			}
			else if (filter.operator == FilterOperator.include) {
				console.log(`comparing ${propertyValue}== ${filter.propertyValue}`)
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
