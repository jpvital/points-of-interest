#!/bin/bash

# Stop the current container
docker-compose down

# Rebuild the image
docker-compose build

# Start a new container
# to run in detache mode, add -d
docker-compose up