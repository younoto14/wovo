/*
# Create examples and analytics_logs tables

1. New Tables
   - `examples`
     - `id` (uuid, primary key)
     - `name` (text, project name)
     - `website_link` (text, URL to the project)
     - `business_type` (text, kind of business)
     - `pricing_chosen` (text, which pricing tier was selected)
     - `pinned` (boolean, pinned items appear first)
     - `created_at` (timestamptz)
   - `analytics_logs`
     - `id` (uuid, primary key)
     - `path` (text, visited page path)
     - `user_agent` (text, browser user agent)
     - `device_type` (text, mobile/tablet/desktop)
     - `visited_at` (timestamptz)

2. Security
   - Enable RLS on both tables.
   - Allow anon + authenticated full CRUD (single-tenant app, no sign-in screen).
   - The admin password gate is client-side only; all data is intentionally managed by one owner.

3. Notes
   - Pinned examples appear first in the public showcase.
   - Analytics are append-only from the frontend on every route change.
*/

CREATE TABLE IF NOT EXISTS examples (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  website_link text NOT NULL,
  business_type text NOT NULL,
  pricing_chosen text NOT NULL,
  pinned boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE examples ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_examples" ON examples;
CREATE POLICY "anon_select_examples" ON examples FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_examples" ON examples;
CREATE POLICY "anon_insert_examples" ON examples FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_examples" ON examples;
CREATE POLICY "anon_update_examples" ON examples FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_examples" ON examples;
CREATE POLICY "anon_delete_examples" ON examples FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS analytics_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  user_agent text,
  device_type text,
  visited_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_analytics" ON analytics_logs;
CREATE POLICY "anon_select_analytics" ON analytics_logs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_analytics" ON analytics_logs;
CREATE POLICY "anon_insert_analytics" ON analytics_logs FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_analytics" ON analytics_logs;
CREATE POLICY "anon_update_analytics" ON analytics_logs FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_analytics" ON analytics_logs;
CREATE POLICY "anon_delete_analytics" ON analytics_logs FOR DELETE
  TO anon, authenticated USING (true);
