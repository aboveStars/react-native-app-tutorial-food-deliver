import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = "https://xtssvscbgykuqvoizajv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0c3N2c2NiZ3lrdXF2b2l6YWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxMDQzNjMsImV4cCI6MjAzMzY4MDM2M30.dMJm9WULl58HUvHhePk1_D4355rjooOyUUxiWaxZeJo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
