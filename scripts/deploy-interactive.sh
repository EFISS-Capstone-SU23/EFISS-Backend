#!/bin/bash

# Define the list of microservices and their corresponding folders
microservices=("auth" "mailer" "normal-user" "product" "search" "ads")
folders=("auth" "mailer" "normal-user" "product" "search" "ads")

# Create an array to store the dialog checklist options
dialog_options=()
for ((i=0; i<${#microservices[@]}; i++)); do
    dialog_options+=("$i" "${microservices[i]}" off)
done

# Prompt the user to select the microservices using dialog
selected=()
while true; do
    choices=$(dialog --clear --stdout --checklist "Select the microservices to build and push:" 0 0 0 "${dialog_options[@]}")
    if [ -z "$choices" ]; then
        echo "No microservices selected. Exiting..."
        exit 0
    fi

    # Convert the dialog choices to selected microservices
    IFS=" " read -ra selected_indices <<< "$choices"
    for index in "${selected_indices[@]}"; do
        selected+=("${folders[index]}")
    done

    # Confirm the selection with the user
    dialog --clear --yesno "You have selected: $choices. Proceed with building and pushing?" 0 0
    if [ $? -eq 0 ]; then
        break
    else
        selected=()
    fi
done

echo "Selected microservices: ${selected[@]}"

url="asia-southeast1-docker.pkg.dev/even-acumen-386115/efiss"
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