# GitHub Actions for Assertions

This repository contains a collection of GitHub Actions designed to assert various conditions in your workflows.
These actions can be used to validate outputs<!--, check file existence, compare values, and more-->.

## Assert Equals

The `assert-equals` action checks if two values are equal and fails the workflow if they are not.

### Example Usage

```yml
name: Test

on:
  push:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Assert Equal
        uses: jaronline/action-assertions/assert-equals@v1
        with:
            expected: 'hello'
            actual: 'hello'
            message: 'Values are not equal!' # Optional
```

## Assert File Exists

The `assert-file-exists` action checks if a specified file exists in the repository.
If the file does not exist, or the path is a directory, the action fails the workflow.

### Example Usage

```yml
name: Test
on:
  push:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Assert File Exists
        uses: jaronline/action-assertions/assert-file-exists@v1
        with:
            path: 'path/to/your/file.txt'
            message: 'File does not exist!' # Optional
```
