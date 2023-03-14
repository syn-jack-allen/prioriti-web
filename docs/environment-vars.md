# Next Environment Vars

The files `.env.development` and `.env.production` are for development and production environments.

Any vars in these files are overrided by `.env.local`. This `.env.local` should be added to git ignore and is only used for local testing. Because it is ignored, we can store secrets inside it.

All env vars are server-side by default. Prefix the env var with `NEXT_PUBLIC_` to make it available in the browser.
