-- Drop the existing policy and recreate with proper permissions for anon users
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;

-- Create policy that explicitly allows anon role to insert
CREATE POLICY "Anyone can create orders" 
ON public.orders 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);