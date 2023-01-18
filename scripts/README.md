# Introduction

This directory contains scripts that are helpful to configure your stack, your GitHub secrets and other configurations that are needed.

# Requirements

- [GH CLI](https://cli.github.com/)

# Usage

On your project root, run the following command:

    npm run setup-helper

You will be ask to initialize your git repository, if you haven't done so already and to add a remote repository.
If you have already done so, you will see a menu like the following:

```
*************** Menu ********************
Update GitHub secrets
Quit
```

## Update GitHub secrets

This will run the script `github-secrets.sh` that will update the GitHub secrets for your repository with the values taken from your .envrc file.
