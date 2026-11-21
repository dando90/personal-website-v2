# Stefano Chiabrando — Portfolio

Personal portfolio built with Next.js App Router, TypeScript, and Tailwind CSS 4. The site supports English, Italian, and Spanish and is configured for static export.

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:5173`. The root page uses English when no language preference has been saved; the language selector remembers the selected language and page.

### Run with Docker

With Docker Engine or Docker Desktop and Docker Compose installed, Node.js and npm do not need to be installed on the host:

```bash
docker compose up --build
```

Compose installs dependencies inside the container and starts the Next.js development server on port `5173`. Open `http://localhost:5173`. Changes to project files are watched by the development server.

Stop the container with:

```bash
docker compose down
```

In VS Code, select **Reopen in Container**. The Dev Container override keeps the service available for the integrated terminal; start the development server there with `npm run dev`. The container installs dependencies with `npm ci` when it starts. The contact form's PHP endpoint is not executed by Next.js and requires a separate PHP runtime.

## Build and deployment

```bash
npm run lint
npm run build
```

Next.js creates the static export in `out/`.

### Automated FTPS deployment

The `.github/workflows/deploy.yml` workflow runs lint and builds the site on every push to `main`. FTP deployment is disabled initially and will not run on pushes until explicitly enabled.

In **Settings → Secrets and variables → Actions**, create these repository secrets:

- `FTP_SERVER`: the FTP host provided by the hosting provider.
- `FTP_USERNAME`: the FTP username.
- `FTP_PASSWORD`: the FTP password.

Create these repository variables:

- `FTP_SERVER_DIR`: the remote folder containing the website; it must end with a slash. `htdocs/` is an assumption to confirm with the provider. If the FTP account already opens in that folder, the value may instead be `./`.
- `FTP_DEPLOY_ENABLED`: leave unset or set to anything other than `true` initially. Set it to exactly `true` only after reviewing the first dry run and confirming the destination.

From the **Actions** tab, manually run **Build and deploy portfolio** with `dry_run` enabled (the default). The dry run connects over FTPS to calculate the planned operations, but does not modify the server. Before enabling deployment, confirm the remote directory, verify that the host supports explicit FTPS, and check that no unrelated file to preserve has the same path as a file in `out/`. The workflow will not automatically downgrade to unencrypted FTP.

After the review, set `FTP_DEPLOY_ENABLED=true`. Pushes to `main` will then deploy automatically. A manual run can also perform a live deployment, but only after the variable is enabled and `dry_run` is explicitly disabled.

The deploy uploads the `out/` export and stores `.ftp-deploy-sync-state.json` in the remote destination to track files managed by this action. Later deploys update those files and remove previously managed files that are no longer exported. The workflow does not mirror the whole server directory or clear it. These paths are always excluded from uploads and deletions:

- `projects/`: independent web projects uploaded separately.
- `workspace/`: private PHP workspace.
- `private/`: private PHP configuration and support files.
- `googlea7c98e5a36e23ffe.html`: Google verification file.

The first deploy does not know which files were uploaded manually before the action was configured. It cannot safely remove obsolete Next.js files from those earlier uploads; inspect them and remove them manually if desired. The dry run cannot prevent an unrelated remote file from being overwritten if it has the same path as an exported file. Identify any other manually maintained paths and add them to the workflow exclusions before enabling deployment.

The workflow uses explicit FTPS. If the provider does not support it, check with the hosting provider before changing the workflow to use unencrypted FTP.

The contact form sends requests to `/api/contact.php`. In production, the hosting provider must support PHP 8.4, sessions, and email delivery. The Next.js development server does not execute PHP.

## Project structure

- `src/app/[lang]`: statically generated pages for each language.
- `src/app/(entry)`: root page and initial language handling.
- `src/components`: shared layout and UI components.
- `src/content`: localized copy grouped by area.
- `src/features`: page-specific components and content.
- `src/lib/i18n.ts`: supported languages and language preference handling.
- `public/projects`: static project demos.
- `scripts`: project image optimization utilities.
