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
- Just in time: `ng serve` will run on `4200`
- SSR: `ng build` then `ng serve` to run on `3000`

### Search Engine (Meilisearch)
Run: `./meilisearch --master-key="BlackProstateCancerNetwork"`
This will run on `http://localhost:7700`

## Environment Variables
Create a `.env` file from the env.example
