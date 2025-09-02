#!/bin/bash

# Iterate over all .stub files in the src/config/env/ directory
for file in src/config/env/*.stub; do
  # Extract the base file name (without path and extension)
  filename=$(basename "$file" .stub)

  # Special case for default.stub to copy it as .env
  if [[ "$filename" == "default" ]]; then
    cp "$file" ./.env && echo "Copied $file as .env"
  else
    # Copy other files and rename them to .env.[filename]
    cp "$file" ./.env."$filename" && echo "Copied $file as .env.$filename"
  fi
done
