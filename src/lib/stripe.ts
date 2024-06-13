import { Alert } from "react-native";
import { supabase } from "./supabase";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: {
      amount: amount,
    },
  });

  if (data) {
    return data;
  }

  Alert.alert("Error fetching payment: ", error);
  return {};
};

export async function initialisePaymentSheet(amount: number) {
  const { paymentIntent, publishableKey } = await fetchPaymentSheetParams(
    amount
  );

  if (!paymentIntent || !publishableKey) {
    console.error("Payment Intent or publisiable key is undefined.");
    return;
  }

  await initPaymentSheet({
    merchantDisplayName: "aboveStars",
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: "Elon Musk",
    },
  });
}

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(error.message);
    return false;
  }

  return true;
};
