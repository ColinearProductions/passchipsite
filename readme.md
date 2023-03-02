# Passchip site

## Dependencies

- Firebase CLI (https://firebase.google.com/docs/cli)

## Deployments

### Pre-deploy

Run `setup_workspace_windows.bat` or linux alternative
Run `python generate.py`. This will parse the dynamic mako templates and spit out the static page, with translations included.

### Deploy

Run `cd public` and `fireabase login` (most only be done once) and then `firebase deploy`
