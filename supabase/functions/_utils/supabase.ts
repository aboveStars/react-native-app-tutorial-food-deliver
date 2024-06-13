import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { stripe } from "../_utils/stripe.ts";

export const createOrRetrieveProfile = async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    }
  );
  // Now we can get the session or user object
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) throw new Error("No user found");

  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw new Error("Profile not found");

  const stripe_customer_id = data.stripe_customer_id;

  console.log("Stripe Customer Id from database: ", stripe_customer_id);

  if (stripe_customer_id) return stripe_customer_id;

  const newCustomer = await stripe.customers.create({
    email: user.email,
    metadata: {
      uid: user.id,
    },
  });

  await supabaseClient
    .from("profiles")
    .update({
      stripe_customer_id: newCustomer.id,
    })
    .eq("id", user.id);

  return newCustomer.id;
};
