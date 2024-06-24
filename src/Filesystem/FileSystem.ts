export interface Filesystem {
	move(currentPath: string, newPath: string): Promise<void>;
	readDir(path: string): string[] | [];
	pathIsFile(path: string): boolean;
	pathIsDirectory(path: string): boolean;
	getYAMLProperty(path: string, propName: string): string | "";
	setYAMLProperty(path: string, propName: string, propValue: string): Promise<void>;
}
