# PaaSPure Hub
>  This is was created as part of my computing masters practicum. The PaaSPure HUB was intended to be used by users to look up and share their platform components. The idea is that the hub should allow users to view, rate modules/components and identify high quality modules/components for building their own PaaS.

## Development Instructions

``` bash
# Build image
docker-compose build

# Install dependencies (only required before running docker-compose up client)
docker-compose up setup

# Serve with hot reload at localhost:8080
docker-compose up client

# Run eslint
docker-compose up lint

# Run unit tests
docker-compose up unit-test

# Run e2e tests
docker-compose up e2e-test

# Build for production with minification
npm run build

# Build for production and view the bundle analyzer report
npm run build --report
```
