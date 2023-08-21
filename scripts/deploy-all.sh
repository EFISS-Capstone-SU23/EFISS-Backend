#!/bin/bash

# Define the list of microservices and their corresponding folders
selected=("auth" "mailer" "normal-user" "product" "search" "ads" "admin")
echo "Selected microservices: ${selected[@]}"

url="asia-southeast1-docker.pkg.dev/efiss-duong/efiss"
timestamp=$(date +%Y%m%d%H%M%S)

# Build and push the selected microservices
for service in "${selected[@]}"; do
    echo "Building and pushing $service..."
    cd "$service" || exit
    docker build -t $url/$service:latest -t $url/$service:$timestamp .
    docker push $url/$service:latest
    docker push $url/$service:$timestamp
    cd ..
done