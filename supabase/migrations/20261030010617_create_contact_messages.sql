/*
# Create contact_messages table (single-tenant, no auth)

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, not null) — sender's full name
  - `email` (text, not null) — sender's email address
  - `company` (text, optional) — sender's company/organization
  - `budget` (text, optional) — selected project budget range
  - `message` (text, not null) — the inquiry body
  - `created_at` (timestamptz, default now()) — submission timestamp

2. Security
- Enable RLS on `contact_messages`.
- Grant INSERT to `anon, authenticated` so the public contact form can submit.
- Grant SELECT to `authenticated` only — the studio team reads inquiries after signing in; anon/public cannot read submitted messages.
- INSERT policy allows any visitor (the form is public); SELECT is restricted to authenticated staff.

3. Notes
- This is a no-auth public site. Only the contact form writes data; visitors must not be able to read other people's submissions.
- No UPDATE/DELETE grants — messages are append-only from the website.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  budget text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_messages TO anon, authenticated;
GRANT SELECT ON contact_messages TO authenticated;

DROP POLICY IF EXISTS "public_insert_contact_messages" ON contact_messages;
CREATE POLICY "public_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "staff_read_contact_messages" ON contact_messages;
CREATE POLICY "staff_read_contact_messages"
ON contact_messages FOR SELECT
TO authenticated
USING (true);
