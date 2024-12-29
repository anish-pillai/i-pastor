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