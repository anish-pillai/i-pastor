# Development Notes

## Initial Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/i-pastor.git
    cd i-pastor/server-node
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file based on the `.env.example`:
    ```sh
    cp .env.example .env
    ```

4. Update the `.env` file with your local environment variables.

## Database Setup

In DB, run this script:

`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`

Check Migration Status

`npm run migration:show`

Expected result:

Apply Migrations

`npm run migration:run`

Seed the Database

`npm run db:seed`

## Running the Application

1. Start the development server:
    ```sh
    npm run dev
    ```

2. The server should now be running at `http://localhost:3000`.

## Testing

Run the test suite:
    ```sh
    npm test
    ```

