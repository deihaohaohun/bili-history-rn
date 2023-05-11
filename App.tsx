import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Badge,
  Button,
  Pressable,
  useToast,
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
import axios from "axios";
import { LoadingButton } from "./components/LoadingButton";

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
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [vidoes, setVideos] = useState([]);
  useEffect(() => {
    axios.get("http://192.168.18.8:3000/videos").then(resp => {
      setVideos(resp.data);
    });
  }, []);

  const addVideoHistory = async id => {
    return await axios.put(`http://192.168.18.8:3000/videos/${id}`).then(() => {
      toast.show({ description: "追番成功!", placement: "top" });
    });
  };

  const Item = ({ id, title, cover }) => (
    <View style={styles.item}>
      <Shadow
        style={styles.video}
        distance={3}
        startColor="#00000008"
        offset={[2, 2]}
      >
        <View style={styles.cover}>
          <Pressable
            onPress={() => toast.show({ description: title, placement: "top" })}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: cover,
              }}
            ></Image>
          </Pressable>
        </View>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Button.Group
          style={{ marginBottom: 5 }}
          isAttached
          mx={{
            base: "auto",
          }}
        >
          <LoadingButton size="sm">已看完</LoadingButton>
          <LoadingButton
            size="sm"
            variant="outline"
            onPress={() => addVideoHistory(id)}
          >
            追一集
          </LoadingButton>
        </Button.Group>
        <View style={styles.tag}>
          <Badge colorScheme="danger">bilibili</Badge>
        </View>
      </Shadow>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={vidoes}
      numColumns={3}
      renderItem={({ item }) => (
        <Item title={item.title} cover={item.cover} id={item.id} />
      )}
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
