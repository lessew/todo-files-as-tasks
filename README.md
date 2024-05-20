
# Todo: Files as Tasks

A todo plugin that treats files as tasks. Create smart lists by filtering on YAML properties:
- Context (e.g. Desk, Phone, Read)
- Status (e.g. Inbox, Waiting, Deferred)
- Starred or unstarred
- Label (any freetext value)

# General usage and Limitations 

- Use yaml codeblocks starting with 'fat' to configure your list
- Each yaml codeblock starts with defining the rootpath from which the list should be created
- From the rootpath, all .md files are read as tasks. Their parent folder is treated as project
- Each .md file can have optional context, status, starred, label YAML fields which can be used to filter


Usage examples:

## List all files as tasks in /todo-home/

```code
```fat

rootPath: todo-home

```

Note: Configuration is read as YAML: the following is not valid as the space is missing

```
```fat

rootPath:todo-home 

```
```

## List all files as tasks in /todo-home with status 'Inbox' 

```code
```fat

rootPath: todo-home
status: Inbox
```

## List all files as tasks in /todo-home with context 'Desk'

```code
```fat

rootPath: todo-home
context: Desk
```

## List all files as tasks in /todo-home with context 'Desk' and status 'Done'

```code
```fat

rootPath: todo-home
context: Desk
status: Done
```


# Technical Details

Obsidian developer policies(https://docs.obsidian.md/Developer+policies)  are followed as much as possible.
Unit Tests as described here: https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/for+Plugin+Developers+to+Autmate+Tests

# Memory usage details

- unload() is not used as to my knowledge no special objects are created that should be destroyed when the plugin unloads.
- The ObsidianFolder class runs a recursive method that iterates through all subfolders. Assumed is a folder structure with reasonable number of folders and files. TODO explain better.

# Reloading
I tried to use standard buil-in reload functions of Obsidian to re-paint the page whenever a file-as-task is updated. However I hit a bit of a snag there, as I couldn't get the update events to trigger. I suspect this only happens when the current file is updated, and even then if the codeblock that handles the plugin is updated. In my case, the user can update files outside of that scope. 

I ended up keeping a list of codeblocks in the plugin and adding a reload() function that iterates and reloads each.

# Concurrency
I learned that for disk operations (updating yaml properties or moving a file), async await is not enough to reload files. See the code below:
```code
        let file = this.app.vault.getAbstractFileByPath(path);
        let propName = "status";
        let propValue = "Inbox";
        await this.obsidianApp.fileManager.processFrontMatter(file,(frontmatter) => {
            frontmatter[propName] = propValue;
        })
        let updatedFileWithoutDelay = this.app.vault.getAbstractFileByPath(path);
        // updatedFileWithoutDelay does *not* contain the new yaml property status with value "Inbox"
        await delay(150ms);
        let updatedFileWithDelay = this.app.vault.getAbstractFileByPath(path);
      // updatedFileWithDelay *does* contain the new yaml property status with value "Inbox"`
```
On my machine a wait of 150ms is required in order to correctly reload. This is needed in the following cases:
- When a new task is created, to update the lists on the current page
- When a task is updated (eg a yaml property, title or project)
- During the automated acceptance tests as a lot of files are moved around and updated

I solved this by adding a lot of delays() in the acceptance tests and adding one delay in the reload() function of the plugin.

