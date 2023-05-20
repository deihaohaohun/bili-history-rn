import axios from "axios";
import { useToast, Badge, Image } from "native-base";
import { useState, useEffect } from "react";
import {
  View,
  Pressable,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Shadow } from "react-native-shadow-2";

const width = Dimensions.get("window").width;

export default function DoneScreen() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios.get("http://192.168.18.8:3000/videos/Done").then(resp => {
      setVideos(resp.data);
    });
  }, []);

  const Item = ({ title, cover, status }) => (
    <View style={styles.item}>
      <Shadow
        style={styles.video}
        distance={3}
        startColor="#00000008"
        offset={[2, 2]}
      >
        <View style={styles.cover} className="relative">
          <Pressable
            onPress={() => toast.show({ description: title, placement: "top" })}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: cover,
              }}
              alt={title}
            ></Image>
          </Pressable>
        </View>
        <Text
          className="text-3xl"
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <View style={styles.tag}>
          <Badge colorScheme="danger">{status}</Badge>
        </View>
      </Shadow>
    </View>
  );

  return (
    <View className="flex-1">
      <FlatList
        style={styles.container}
        data={videos}
        numColumns={3}
        renderItem={({ item }) => (
          <Item title={item.title} cover={item.cover} status={item.status} />
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
    </View>
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
  episode: {},
  title: {
    padding: 3,
  },
  tag: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});
