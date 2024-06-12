import { withLayoutContext } from "expo-router";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator() {
  return (
    <TopTabs>
      <TopTabs.Screen
        name="index"
        options={{
          title: "Active",
        }}
      />
      <TopTabs.Screen
        name="archive"
        options={{
          title: "Delivered",
        }}
      />
    </TopTabs>
  );
}
