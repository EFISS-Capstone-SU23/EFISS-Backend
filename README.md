# EFISS-Backend

## Development

1. Copy and fill in the `.env` files in each service.

2. Run `docker compose up` to start the services.

## Deployment

```bash
make deploy_all
```

This will build each service into images and push them to the registry.