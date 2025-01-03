FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Run TypeORM migrations
RUN npm run migration:run

# Seed the database
RUN npm run db:seed

# Expose the port the app runs on
EXPOSE 4500

# Command to run the app
CMD [ "npm", "start" ]
