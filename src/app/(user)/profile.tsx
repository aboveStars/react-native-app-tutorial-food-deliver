import { View, Text, Button } from "react-native";
import React from "react";
import { supabase } from "@/src/lib/supabase";

type Props = {};

const profile = (props: Props) => {
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={async () => {
          await supabase.auth.signOut();
        }}
      />
    </View>
  );
};

export default profile;
