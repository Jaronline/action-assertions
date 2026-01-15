## Assert File Not Exists

The `assert-file-not-exists` action checks if a specified file does not exist in the repository.
If the file exists, the action fails the workflow.

### Example Usage

```yml
name: Test

on:
  push:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Assert File Not Exists
        uses: jaronline/action-assertions/assert-file-not-exists@v1
        with:
            path: 'path/to/your/file.txt'
            message: 'File should not exist!' # Optional
```