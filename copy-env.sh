#!/bin/bash

# Command to copy all .env files from src/config/env/ to the root directory, excluding 'example' prefix
for file in src/config/env/*; do
  if [[ ! $(basename "$file") =~ ^example\. ]]; then
    cp "$file" ./"$(basename "$file")"
  fi
done
