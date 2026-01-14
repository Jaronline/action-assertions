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
