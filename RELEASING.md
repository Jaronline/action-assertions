# Action Assertions release process

## Preparation

- Push any outstanding changes to the main branch.
- Check that https://github.com/jaronline/action-assertions/actions is green for all workflows for the main branch.
- Decide on the version number to use for the release. The action releases should follow semantic versioning.
    - By default, a patch release is assumed (eg. `4.0.0` → `4.0.1`)
    - If new features have been added, bump the minor version (eg. `4.1.1` → `4.2.0`)
    - If a new major release is required, bump the major version (eg. `4.1.1` → `5.0.0`)

## Release jaronline/action-assertions

- Create a tag for the release. The tag should have the format `v5.0.0`
    - From CLI: `git tag -s -m "v5.0.0" v5.0.0 && git push --tags`
    - Note that we sign the tag and set the commit message for the tag to the newly released version.
- Go to https://github.com/jaronline/action-assertions/releases and "Draft new release"
    - Use the newly created tag and copy the tag name exactly as the release title.
    - Craft release notes content based on issues closed, PRs merged and commits
    - nclude a Full changelog link in the format https://github.com/jaronline/action-assertions/compare/v1.0.0...v1.1.0
- Publish the release.
- Force push the `v5` tag (or current major version) to point to the new release. It is conventional for users to bind to a major release version using this tag. 
    - From CLI: `git tag -f -s -a -m "v5.0.0" v5 v5.0.0 && git push -f --tags`
    - Note that we sign the tag and set the commit message for the tag to the newly released version.
