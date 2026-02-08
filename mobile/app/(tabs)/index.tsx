import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="pt-20">
      <Text>HomeScreen</Text>
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Button variant="default" className="w-40">
        <Text>213</Text>
      </Button>
      <Button variant="default">
        <Text>213</Text>
      </Button>
    </View>
  );
}
