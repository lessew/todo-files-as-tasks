import { CachedMetadata, TFile, TFolder } from "obsidian";
import FileAsTaskPlugin from "main";
import { Filesystem } from "../FileSystem";

export class ObsidianFilesystem implements Filesystem {
	plugin: FileAsTaskPlugin;

	constructor(plugin: FileAsTaskPlugin) {
		this.plugin = plugin;
	}

	readDir(path: string): string[] {

		let resource = this.plugin.obsidianApp.vault.getAbstractFileByPath(path);
		let result: string[] = [];

		if (resource instanceof TFolder) {
			resource.children.forEach((child => {
				result.push(child.path);
			}));
			return result;
		}
		else {
			throw new Error(`Path is not a folder ${path}`);
		}
	}

	async touch(fullPath: string): Promise<void> {
		await this.plugin.obsidianApp.vault.create(fullPath, "");
	}

	pathIsDirectory(path: string): boolean {
		let resource = this.plugin.obsidianApp.vault.getAbstractFileByPath(path);
		return resource instanceof TFolder;
	}

	pathIsFile(path: string): boolean {
		let resource = this.plugin.obsidianApp.vault.getAbstractFileByPath(path);
		return resource instanceof TFile;
	}

	private getTFile(path: string): TFile {
		return this.plugin.obsidianFacade.getTFile(path);
	}

	async move(currentPath: string, newPath: string): Promise<void> {
		let file = this.getTFile(currentPath);
		await this.plugin.obsidianFacade.moveFile(file, newPath);
	}

	getYAMLProperty(path: string, name: string): string | "" {
		let file = this.getTFile(path);
		const meta: CachedMetadata = this.plugin.obsidianFacade.getMeta(file);
		if (meta && meta.frontmatter && meta.frontmatter[name]) {
			return meta.frontmatter[name];
		}
		else {
			return "";
		}
	}

	async setYAMLProperty(path: string, name: string, value: string): Promise<void> {
		let file = this.getTFile(path);
		await this.plugin.obsidianFacade.setMeta(file, name, value);
	}
}
