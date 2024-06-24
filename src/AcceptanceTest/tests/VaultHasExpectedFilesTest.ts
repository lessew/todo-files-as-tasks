import { Logger } from "../Logger";
import { getExpectedFiles, getExpectedFolders, getSettings, getYamlListAllFiles, ExpectedFileType } from "../MockItems";
import FileAsTaskPlugin from "main";
import { PluginSettings } from "src/Configuration/PluginSettings";
import { CodeBlockParser } from "src/Configuration/CodeBlockParser";

export class VaultHasExpectedFilesTest {
	logger: Logger;
	yaml: string;
	settings: PluginSettings;
	rootPath: string;
	codeBlockParser: CodeBlockParser;
	//rootFolder:FolderModel;
	//folders:FolderModel[];
	result: boolean;
	//fileAsTaskCollection:FileAsTaskCollection;
	plugin: FileAsTaskPlugin;

	constructor(logger: Logger, plugin: FileAsTaskPlugin) {
		this.logger = logger;
		this.plugin = plugin;
		return this;
	}

	async test(): Promise<VaultHasExpectedFilesTest> {
		this.logger.heading("Testing VaultHasExpectedFiles")
		this.arrange();
		await this.act();
		this.assert();
		if (this.result != false) {
			this.result = true;
		}
		else {
			this.logger.error("ERROR some tests did not run successfully, aborting")
		}

		return this;
	}

	arrange() {
		this.logger.log("Setting up");
		this.yaml = getYamlListAllFiles();
		this.settings = getSettings();
		this.logger.success("Completed setting up")
	}

	async act(): Promise<void> {
		this.logger.log("Loading yaml and folders")
		this.actLoadYAML();
		await this.actLoadFolders();
		this.actLoadFileCollection();
	}

	assert() {
		this.logger.log("Asserting");
		this.assertFolderList()
		this.assertFileList();
	}

	actLoadYAML() {
		this.codeBlockParser = new CodeBlockParser();
		const isLoaded = this.codeBlockParser.loadSource(this.yaml);
		if (isLoaded instanceof Error) {
			this.logger.error("Parsing YAML failed");
			this.setFailure();
			return;
		}
		const root = this.codeBlockParser.parseRootPath();
		if (root instanceof Error) {
			this.logger.error("Parsing root failed")
			this.setFailure();
			return;
		}
		this.rootPath = root;
		this.logger.success("Successfully loaded YAML")
	}

	async actLoadFolders(): Promise<void> {
		return;
		/*
		this.rootFolder = ObsidianFolder.create(this.rootPath,this.rootPath,this.plugin);
		let folders = this.rootFolder.getFolderPaths();
		let whitelist = new Whitelist(folders);
		let pSettings =this.settings.get(FileAsTask.PROJECT_FIELD) as ToplevelFolderPropertySettings;
		pSettings.setProjects(whitelist);
		pSettings.setDefaultValue(folders[0]);
		this.logger.success("Successfully loaded folders")
		*/
	}

	actLoadFileCollection() {
		/*
		let fc = new FileAsTaskCollection(this.rootFolder,this.settings);
		this.fileAsTaskCollection = fc;
		this.logger.success("Successfully loaded fileastaskcollection")
		*/
	}


	assertFolderList() {
		/*
		const expectedFolders = getExpectedFolders();
		const actualFolders = this.rootFolder.getFolderPaths();
		if(expectedFolders.length == actualFolders.length){
			this.logger.success("Right amount of folders found")
		}
		else{
			this.logger.error(`Found ${actualFolders.length} folders but expected ${expectedFolders.length}`)
			this.setFailure();
			return;
		}

		for(let i=0;i<expectedFolders.length;i++){
			if(!actualFolders.contains(expectedFolders[i])){
				this.logger.error(`${expectedFolders[i]} does not seem to exists as folder`);
				this.logger.error(`Folder found are: ${actualFolders.join(",")}`);
				this.setFailure();
				return;
			}
			else{
				this.logger.success(`Folder '${expectedFolders[i]}' was found`)
			}
		}
		*/
	}

	assertFileList() {
		/*
		const expectedFiles = getExpectedFiles();
		const tasks = this.fileAsTaskCollection.get();
		if(tasks.length != expectedFiles.length){
			this.logger.error(`Expected ${expectedFiles.length} files but found ${tasks.length}`);
			this.setFailure();
			return;
		}
		else{
			this.logger.success(`Right amount of files found: ${tasks.length}`)
		}
		for(let i=0;i<expectedFiles.length;i++){
			const expectedNeedle = expectedFiles[i];
			const foundNeedle = tasks.find((aTask) => {
				return aTask.file.path == expectedNeedle.path;
			})
			this.logger.log(`--Testing file ${expectedNeedle.title}`);
			if(foundNeedle==undefined){
				this.logger.error(`Could not find file ${expectedFiles[i].path}`)
				this.result = false;
				return;
			}
			this.logger.success(`Found file ${expectedFiles[i].path}`)
		   
			this.assertSingleTask(expectedNeedle,foundNeedle);

		}
		*/
	}

	assertSingleTask(expectedFile: ExpectedFileType, actualTask: FileAsTask) {
		/*
		this.assertSinglePropertyValue("project",actualTask,expectedFile.project);
		this.assertSinglePropertyValue("title",actualTask,expectedFile.title);
		this.assertSinglePropertyValue("status",actualTask,expectedFile.yaml.status!);
		this.assertSinglePropertyValue("context",actualTask,expectedFile.yaml.context!);
		this.assertSinglePropertyValue("starred",actualTask,expectedFile.yaml.starred!);
		*/
	}

	assertSinglePropertyValue(propName: string, aTask: FileAsTask, expectedValue: string) {
		/*
		if(aTask.get(propName) != expectedValue){
			this.setFailure();
			this.logger.error(`Looked in property ${propName} for value ${expectedValue} but found ${aTask.get(propName)} in file ${aTask.file.path}`)
		}
		else{
			this.logger.success(`Found value ${expectedValue} in ${propName}`);
		}
		*/
	}

	setFailure(): void {
		this.result = false;
	}

	isSuccess(): boolean {
		return (this.result === true);
	}

}
