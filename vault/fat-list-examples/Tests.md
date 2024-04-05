## Checklist

- Git pull? Folders and files reset? npm run reset-test-vault
- Allowed values for context, starred, status reset?


Properties:
- Title (basename)
- Project (folder)
- Starred
- Status
- Context

# Test log

05-04-2024
- Duplicate tasks in different folders are not distinguishable from another
- not operator with starred may cause confusion

## All todos

![[All-todos-screenshot.png]]

```fat
rootPath: todo-home
```

## Lists tests

### All projects with context=deep, not starred

Expected: FInalize finance weekend NYC

```fat
rootPath: todo-home
context: Deep
starred: ✰
```

## Groceries not starred
Expected: Bread & Peppers

```fat 
rootPath: todo-home
project: Groceries
starred: not ⭐
```

### Status waiting

Expected: Finalize finance weekend, get mortgage details 2024, ask details re taxes

```fat
rootPath: todo-home
status: Waiting
```

## Mutation Test cases

- Edit title
	- Use correct format
	- Use incorrect format
- Click link
- Move to new project Taxes (subfolder)
- Move from project Taxes (subfolder)
- Move to project Kids (empty project)
- Adjust context
- Adjust status
- Adjust starred
