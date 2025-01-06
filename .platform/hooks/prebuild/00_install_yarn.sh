#!/bin/bash
# Install Yarn globally
npm install -g yarn

# Use Yarn to install dependencies
cd /var/app/staging
yarn install
