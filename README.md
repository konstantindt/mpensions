# mpensions

## Getting started

```
$ node --version
v22.14.0
$ npm install
$ head /dev/urandom | tr -dc A-Za-z0-9 | head -c24 > postgre_development_password.txt
$ docker-compose -f docker-compose.development.yml up
$ APP_ENV=development npx mikro-orm-esm schema:fresh --run --seed
$ npm run test
$ npm run start
$ curl --http2-prior-knowledge http://localhost:3000/pensions?limit=2
```

## Challenges

* Running docker-compose breaks the linter. Linter attempts read without permission the local directory used for the volume.
* Setting up routes etc. is very manual.
* The parameter validator doesn't narrow down the TypeScript.
* curl needed `--http2-prior-knowledge` flag to work with the HTTP/2 server.

## Next steps

1. Add /searched-pensions endpoint
2. Add /all-pensions endpoint. As pensions and searched pensions are in different tables I believe this endpoint requires SQL query with `UNION ALL` which likely means that will have to use [Knex.js](https://knexjs.org/) directly, not via the ORM.
3. Update unit tests to use [test-containers](https://node.testcontainers.org/modules/postgresql/) for database.
4. Write more tests e.g. negative scenarios and combinations of filters.
5. Refactor ORM usage with dependency injection pattern (move init to src/repository.ts file.)
6. Protect APIs with JWT Authentication.
7. Intergrate OpenTelemetry.
8. Fix not persist property not being returned in response (broken response envelope.)
9. ...
