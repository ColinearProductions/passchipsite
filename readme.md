# Passchip site

## Dependencies

- Firebase CLI (https://firebase.google.com/docs/cli)

## Deployments

### Pre-deploy

Run `setup_workspace_windows.bat` or linux alternative
Run `python generate.py`. This will parse the dynamic mako templates and spit out the static page, with translations included.

### Deploy

Push commit to remote master, the steps in `.github\workflows\firebase-hosting-pull-request.yml` will be executed

`git commit -am "chore: x"`
`git push`

On auto deployment failure

Run `fireabase login` and then `firebase deploy`
