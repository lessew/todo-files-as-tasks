
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
Unit Tests as described here: https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/for+Plugin+Developers+to+Automate+Tests

# Memory usage details

- unload() is not used as to my knowledge no special objects are created that should be destroyed when the plugin unloads.
- The ObsidianFolder class runs a recursive method that iterates through all subfolders. Assumed is a folder structure with reasonable number of folders and files. TODO explain better.



