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