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