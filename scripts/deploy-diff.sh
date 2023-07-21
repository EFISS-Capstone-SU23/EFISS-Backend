#!/bin/bash

# Define the list of microservices and their corresponding folders
microservices=("auth" "mailer" "normal-user" "product" "search" "ads")

if [ $# -eq 0 ]; then
    echo "No arguments provided. Please provide the diff mode, either `dev` or `prod`."
    echo "Example: ./deploy-diff.sh dev"
    exit 1
fi

if [ "$1" != "dev" ] && [ "$1" != "prod" ]; then
    echo "Invalid argument provided. Please provide the diff mode, either `dev` or `prod`."
    echo "Example: ./deploy-diff.sh dev"
    exit 1
fi

# check if GIT_HEAD_REF is set
if [ -z "$GITHUB_HEAD_REF" ]; then
    echo "GITHUB_HEAD_REF is not set. Please run this script in GitHub Actions."
    exit 1
fi

echo "GITHUB_HEAD_REF is set to $GITHUB_HEAD_REF"

changed_ts_files=""
if [ "$1" == "dev" ]; then
    echo "Deploying to dev environment..."
    # https://stackoverflow.com/questions/65944700/how-to-run-git-diff-in-github-actions
	changed_ts_files=$(git diff --name-only --diff-filter=d origin/develop origin/${GITHUB_HEAD_REF} | grep -E '\.ts$$' | awk -F'/' '{print $1}' | sort | uniq)
elif [ "$1" == "prod" ]; then
    echo "Deploying to prod environment..."
	changed_ts_files=$(git diff --name-only --diff-filter=d origin/main origin/${GITHUB_HEAD_REF} | grep -E '\.ts$$' | awk -F'/' '{print $1}' | sort | uniq)
fi

selected=()
while read -r line; do
    selected+=("$line")
done <<< "$changed_ts_files"

echo "Selected microservices to deploy: ${selected[@]}"

url="asia-southeast1-docker.pkg.dev/even-acumen-386115/efiss"
timestamp=$(date +%Y%m%d%H%M%S)

# Build and push the selected microservices
for service in "${selected[@]}"; do
    echo "Building and pushing $service..."
    cd "$service" || echo "Failed to cd into $service" && exit 1
    docker build -t $url/$service:latest -t $url/$service:$timestamp .
    docker push $url/$service:latest
    docker push $url/$service:$timestamp
    cd ..
done

echo "All microservices have been built and pushed to the container registry successfully."
exit 0