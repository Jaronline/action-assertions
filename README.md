# GitHub Actions for Assertions

[![OpenSSF Scorecard](https://img.shields.io/ossf-scorecard/github.com/Jaronline/action-assertions?label=openssf+scorecard&style=flat)](https://scorecard.dev/viewer/?uri=github.com/Jaronline/action-assertions)

This repository contains a collection of GitHub Actions designed to assert various conditions in your workflows.
These actions can be used to validate outputs, check file existence, and compare values<!--, and more-->.

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
            expected: 'main'
            actual: ${{ github.ref_name }}
            message: 'Values are not equal!' # Optional
```

## Assert Not Equals

The `assert-not-equals` action checks if two values are not equal and fails the workflow if they are.

### Example Usage

```yml
name: Test

on:
  push:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Assert Not Equal
        uses: jaronline/action-assertions/assert-not-equals@v1
        with:
            unexpected: 'main'
            actual: ${{ github.ref_name }}
            message: 'Values should not be equal!' # Optional
```

## Assert Path Exists

The `assert-path-exists` action checks if a specified path exists in the repository.
If the path does not exist, the action fails the workflow.

### Example Usage

```yml
name: Test

on:
  push:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Assert Path Exists
        uses: jaronline/action-assertions/assert-path-exists@v1
        with:
            path: 'path/to/your/file.txt'
            message: 'Path does not exist!' # Optional
```

## Assert Path Not Exists

The `assert-path-not-exists` action checks if a specified path does not exist in the repository.
If the path exists, the action fails the workflow.

### Example Usage

```yml
name: Test

on:
  push:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Assert Path Not Exists
        uses: jaronline/action-assertions/assert-path-not-exists@v1
        with:
            path: 'path/to/your/file.txt'
            message: 'Path should not exist!' # Optional
```
