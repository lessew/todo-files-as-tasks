import { Directory } from "src/FileSystem/Directory";
import { PathPropertyHelper } from "src/Properties/PathPropertyHelper";
import { FileAsTask } from "./FileAsTask";
import { File } from "src/FileSystem/File";

export class FileAsTaskFactory {


	static loadFilesAsTask(rootDir: Directory, pathHelper: PathPropertyHelper): FileAsTask[] {
		const files: File[] = rootDir.getFiles();
		let fats: FileAsTask[] = [];

		files.forEach(aFile => {
			let fat: FileAsTask = new FileAsTask(aFile, pathHelper);
			fats.push(fat);
		})
		return fats;
	}
}
