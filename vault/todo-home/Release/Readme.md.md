---
Context: Read
Status: Next22222
Starred: shizznet
status: Done
---

A todo plugin that treats all .md files as tasks.


Usage examples:

## List all files as tasks in /todo-home/

```code
```yatodo

rootPath: todo-home

```

## List all files as tasks in /todo-home with status 'Inbox' 

```code
```yatodo

rootPath: todo-home
status: Inbox
```

## List all files as tasks in /todo-home with context 'Desk'

```code
```yatodo

rootPath: todo-home
context: Desk
```

## List all files as tasks in /todo-home with context 'Desk' and status 'Done'

```code
```yatodo

rootPath: todo-home
context: Desk
status: Done
```


# Limitations

- All files are read
- Untested: nested folders. Assumed is 1 level folder structure