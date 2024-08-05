# Expert

## this is a project for the managing the food in the house 

- [Overview](#Overview)
- [Installation](#Installation)
- [Usages](#Usages)



## Overview
this is a project for the managing the food in the house 

## Installation

### Prerequisites

- Node.js
- npm or yarn


```bash
#clone the repository 
git clone https://github.com/Chaimalov/expert.git

# navigate to the project directory
cd expert

# Install dependencies
npm install
# or
yarn install
```

# Run the application 
```bash
#open three terminal in the root directory and run the following commands:
1. npx nx serve server
2. npx nx serve expert-client
3. npx nx serve emoji

# Open your browser and navigate to http://localhost:4200
```

# configuration
 Create a .env file in the root of ex.server directory and add the following environment variables:
 ```bash
 SENDGRID_API_KEY,
 EMOJI_SERVER,
 PORT
 ```

## Usages
1. Add food
2. Delete food
3. Edit food
4. Search food

