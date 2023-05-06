import React, { useState } from "react";
import {
  NativeBaseProvider,
  Badge,
  Button,
  Tooltip,
  Popover,
  Pressable,
} from "native-base";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Shadow } from "react-native-shadow-2";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Doing"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "正在追",
          tabBarActiveTintColor: "deeppink",
          tabBarIcon: focused =>
            focused ? (
              <Icon name="home" size={22} />
            ) : (
              <Icon name="home-outline" size={22} />
            ),
        }}
      />
      <Tab.Screen
        name="Todo"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "准备追",
          tabBarActiveTintColor: "deeppink",
          tabBarIcon: focused =>
            focused ? (
              <Icon name="md-list-circle" size={26} />
            ) : (
              <Icon name="md-list-circle-outline" size={26} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const width = Dimensions.get("window").width;

function HomeScreen() {
  const [loading, setLoading] = useState(false);

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "摇曳露营 摇曳露营 摇曳露营",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Shadow
        style={styles.video}
        distance={3}
        startColor="#00000008"
        offset={[2, 2]}
      >
        <Popover
          placement="bottom"
          trigger={triggerProps => {
            return (
              <View style={styles.cover}>
                <Pressable {...triggerProps}>
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{
                      uri: "https://gd-hbimg.huaban.com/ffe2125f49120523e3ce6c653c3f730277b2d62b1b766-KftMJD_fw240webp",
                    }}
                  ></Image>
                </Pressable>
              </View>
            );
          }}
        >
          <Popover.Content>
            <Popover.Body _text={{ fontSize: 10 }}>{title}</Popover.Body>
          </Popover.Content>
        </Popover>

        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>

        <Button
          size={"xs"}
          style={{ marginBottom: 5, marginHorizontal: 5 }}
          onPress={() => console.log("hello world")}
        >
          标记完成
        </Button>
        <View style={styles.tag}>
          <Badge colorScheme="danger">bilibili</Badge>
        </View>
      </Shadow>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={DATA}
      numColumns={3}
      renderItem={({ item }) => <Item title={item.title} />}
      keyExtractor={item => item.id}
      ListFooterComponent={
        <Text style={{ textAlign: "center" }}>没有更多了</Text>
      }
      refreshing={loading}
      onRefresh={() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }}
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MyTabs}
            options={{ title: "首页" }}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
  },
  item: {
    padding: 6,
    width: width / 3,
  },
  video: {
    width: "100%",
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "#fff",
    position: "relative",
  },
  cover: {
    height: 180,
    backgroundColor: "#00000010",
  },
  title: {
    fontSize: 10,
    padding: 5,
  },
  tag: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});
