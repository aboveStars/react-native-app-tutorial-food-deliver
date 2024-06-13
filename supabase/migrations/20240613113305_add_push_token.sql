alter table "public"."profiles" drop column "stripe_costumer_id";

alter table "public"."profiles" add column "expo_push_token" text;

alter table "public"."profiles" add column "stripe_customer_id" text;


