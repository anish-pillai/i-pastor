# Development Notes

## Initial Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/anish-pillai/i-pastor.git
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

Expected result(Result may vary):

```
    [ ] CreateUserTable1735344000000
    [ ] CreateChatTable1735344000100
    [ ] CreateMessageTable1735344000200
    [ ] CreateChatHistoryTable1735344000300
    [ ] UpdateSchemaToDecoupleMessage1735344000400
    [ ] UpdateSchemaToDecoupleMessage1735766856581
```

Apply Migrations

`npm run migration:run`

Seed the Database

`npm run db:seed`

Reset the Schema

`npm run schema:drop`

[First time Only] Generate the initial migration scripts

`npm run typeorm migration:generate -- ./migrations/InitialSchema -d src/data-source.ts`

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

