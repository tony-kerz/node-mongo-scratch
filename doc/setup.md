# setup

this project illustrates

## bootstrap data

1. import initial json into mongo

   ```
   env MONGO_HOST={host}:{port} MONGO_DB=people-{env} yarn run import
   ```

   > example: `env MONGO_HOST=localhost:27018 MONGO_DB=people-dev yarn run import`

1. ingest initial json into transformed collection

   ```
   env MONGO_HOST={host}:{port} MONGO_DB=people-{env} yarn run ingest
   ```

   > example: `env MONGO_HOST=localhost:27018 MONGO_DB=people-dev yarn run ingest`

   result records should look like:

   ```
   {
       "foo": "bar"
   }
   ```

## seed data

in non-prod environments, it is sometimes desirable to seed the database with some mock data.

this can be accomplished via the command:

```
env MONGO_HOST={host}:{port} MONGO_DB=people-{env} yarn run seed
```

> example: `env MONGO_HOST=localhost:27018 MONGO_DB=people-dev yarn run seed`
