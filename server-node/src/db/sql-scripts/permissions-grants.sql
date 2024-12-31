-- Create a new database user for the application
CREATE USER i_pastor_admin WITH PASSWORD 'admin';

-- Grant all privileges on the schema to the new user
GRANT ALL PRIVILEGES ON SCHEMA public TO i_pastor_admin;

-- Grant all privileges on all tables in the schema to the new user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO i_pastor_admin;

-- Grant all privileges on all sequences in the schema to the new user
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO i_pastor_admin;

-- Grant all privileges on all functions in the schema to the new user
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO i_pastor_admin;

-- Grant all privileges on all types in the schema to the new user
GRANT ALL PRIVILEGES ON ALL TYPES IN SCHEMA public TO i_pastor_admin;

-- Drop the schema and recreate it
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Create the schema and grant permissions to the postgres user
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

-- Ensure the uuid-ossp extension is installed in your PostgreSQL database:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant SELECT permission on the user table to your database user
--GRANT SELECT ON TABLE public."user" TO i_pastor_admin;

-- If you need to grant more permissions, you can do so as needed
-- For example, to grant INSERT, UPDATE, and DELETE permissions:
--GRANT INSERT, UPDATE, DELETE ON TABLE public."user" TO i_pastor_admin;

-- Grant SELECT, INSERT, UPDATE, DELETE permissions on all tables in the public schema to i_pastor_admin
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.' || quote_ident(r.tablename) || ' TO i_pastor_admin;';
    END LOOP;
END $$;