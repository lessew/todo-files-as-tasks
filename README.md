
# Todo: Files as Tasks

A todo plugin that treats files as tasks. Create smart lists by filtering on YAML properties:
- Context (e.g. Desk, Phone, Read)
- Status (e.g. Inbox, Waiting, Deferred)
- Starred or unstarred
- Label (any freetext value)

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


# Limitations

- All files are read
- Untested: nested folders. Assumed is 1 level folder structure