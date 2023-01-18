## Deploying using Fly.io

Out of the box, [Fly.io](https://fly.io/) has excellent support for Remix applications, so we've decided to set up a development flow using Fly for DEPT DASH™ projects that lack complexity (read: no database).

Do the following to prepare for your first deployment:

1. Install the Fly.io command line tools ("flyctl")

```bash
# homebrew
brew install flyctl
# linux or others
curl -L https://fly.io/install.sh | sh
# windows
iwr https://fly.io/install.ps1 -useb | iex
```

2. Sign up for Fly.io by visiting https://fly.io/docs/hands-on/sign-up/ .
3. Log into Fly.io using
   ```
   flyctl auth login
   ```
4. Generate an auth token using
   ```
   flyctl auth token
   ```
5. Add the token as `FLY_API_TOKEN` to your Github Secrets
6. Edit the `fly.toml` file as necessary to update the Fly configuration.

For more detailed instructions about the Fly deployment process, see the [Fly.io documentation for Remix](https://fly.io/docs/getting-started/remix/) or the [Fly.io getting started guide](https://fly.io/docs/hands-on/).
