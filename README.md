# BPCN


## Stack
- Angular
- Strapi
- Redis cache
- Express API Proxy
- Meilisearch (todo)


## Spin Up Servers

### Strapi
`npm run develop`
will run on post `1337`

### Angular:
`ng serve` will run on `4200`

### API Proxy & Cache:
Ensure Redis is installed and running, then to run the proxy server: `node proxy-server.js`
which should run on `3000` and handle requests to news.

### Search Engine (Meilisearch)
Run: `./meilisearch --master-key="BlackProstateCancerNetwork"`
This will run on `http://localhost:7700`

## Environment Variables
Create a `.env` file from the env.example
