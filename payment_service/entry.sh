#!/bin/sh

# Run database migrations
npx prisma migrate dev --name init --preview-feature

npx ts-node ./prisma/seeder/seed.ts

# Run the main container command
exec "$@"