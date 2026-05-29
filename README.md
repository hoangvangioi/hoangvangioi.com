This is a [Cloudflare Workers](https://developers.cloudflare.com/workers) project bootstrapped with [`npm create cloudflare@latest`].

## Getting Started

### Create a new Worker project

```bash
npm create cloudflare@latest
```

### Run the development server:

Create a new file named `.dev.vars` and add the following lines:
```
API_URL=http://localhost:3000/api/search
CROSS_ORIGIN_URL=http://localhost:3000
```

After that, run the command.
```bash
npm run dev
```
Open [http://localhost:8787](http://localhost:8787) with your browser to see the result.

### Deploy your project

```bash
npm run deploy
```