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