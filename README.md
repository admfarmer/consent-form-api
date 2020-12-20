# Fastify and TypeScript

## Installation

```
npm i typescript -g
npm i ts-node -g
```

```
git clone https://github.com/admfarmer/consent-form-api.git consent-form-api
cd consent-form-api
npm i
```

## Running

```
cp configtxt config
npm start
```

open browser and go to http://localhost:3000

## PM2

```
pm2 start --interpreter ts-node src/app.ts MyServerName
```
