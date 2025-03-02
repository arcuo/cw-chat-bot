# Setup Postgres locally

## Start the database
```bash
cd lib/db
docker-compose up -d
```

## Stop the database
```bash
docker-compose down
docker-compose down -v # remove volumes and resetting the database
```