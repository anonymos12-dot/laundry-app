/*
  # Fix RLS Policies - Make Them Restrictive

  1. Security Changes
    - Update bookings INSERT policy to validate email format and required fields
    - Update b2b_inquiries INSERT policy to validate business type and email format
    - Remove overly permissive WITH CHECK (true) clauses
    - Add basic input validation through policy constraints
*/

DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;

CREATE POLICY "Validated booking creation"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (
    customer_name IS NOT NULL
    AND customer_email IS NOT NULL
    AND customer_phone IS NOT NULL
    AND address IS NOT NULL
    AND service_type IN ('wash_fold', 'dry_clean')
    AND pickup_date IS NOT NULL
    AND pickup_time IS NOT NULL
    AND customer_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
  );

DROP POLICY IF EXISTS "Anyone can create B2B inquiries" ON b2b_inquiries;

CREATE POLICY "Validated B2B inquiry creation"
  ON b2b_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (
    business_name IS NOT NULL
    AND business_type IN ('hotel', 'gym', 'other')
    AND contact_name IS NOT NULL
    AND contact_email IS NOT NULL
    AND contact_phone IS NOT NULL
    AND contact_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
  );
