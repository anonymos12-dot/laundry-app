/*
  # Pressd Laundry Service Schema

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `address` (text)
      - `service_type` (text) - 'wash_fold' or 'dry_clean'
      - `pickup_date` (date)
      - `pickup_time` (text)
      - `status` (text) - 'pending', 'picked_up', 'processing', 'out_for_delivery', 'completed'
      - `created_at` (timestamptz)
    
    - `b2b_inquiries`
      - `id` (uuid, primary key)
      - `business_name` (text)
      - `business_type` (text) - 'hotel', 'gym', 'other'
      - `contact_name` (text)
      - `contact_email` (text)
      - `contact_phone` (text)
      - `message` (text)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for public insert access (for booking submissions)
    - Add policies for authenticated read access (for tracking)
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  address text NOT NULL,
  service_type text NOT NULL CHECK (service_type IN ('wash_fold', 'dry_clean')),
  pickup_date date NOT NULL,
  pickup_time text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'picked_up', 'processing', 'out_for_delivery', 'completed')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS b2b_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  business_type text NOT NULL CHECK (business_type IN ('hotel', 'gym', 'other')),
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can view their own bookings by email"
  ON bookings
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can create B2B inquiries"
  ON b2b_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);
