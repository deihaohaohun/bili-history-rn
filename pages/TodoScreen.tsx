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
import { LoadingButton } from "../components/LoadingButton";

const width = Dimensions.get("window").width;

export default function TodoScreen() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchTodoVideos();
  }, []);

  const fetchTodoVideos = () => {
    axios.get("http://192.168.18.8:3000/videos/Todo").then(resp => {
      setVideos(resp.data);
    });
  };

  const startVideo = async id => {
    await axios
      .put(`http://192.168.18.8:3000/videos/start/${id}`)
      .then(resp => {
        let index = videos.findIndex(item => id === item.id);
        videos.splice(index, 1);
        setVideos([...videos]);
      });
  };

  const Item = ({ id, title, cover, total, current }) => (
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
          style={styles.title}
          className="text-3xl"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <View style={{ padding: 3 }}>
          <LoadingButton
            tip="开始追番?"
            size="sm"
            onPress={() => {
              startVideo(id);
            }}
          >
            开始追
          </LoadingButton>
        </View>
        <View style={styles.tag}>
          <Badge colorScheme="danger">{current + " / " + total}</Badge>
        </View>
      </Shadow>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      className="bg-white"
      data={videos}
      numColumns={3}
      renderItem={({ item }) => (
        <Item
          id={item.id}
          title={item.title}
          cover={item.cover}
          total={item.total}
          current={item.current}
        />
      )}
      keyExtractor={item => item.id}
      ListFooterComponent={
        <Text style={{ textAlign: "center" }}>没有更多了</Text>
      }
      refreshing={loading}
      onRefresh={async () => {
        setLoading(true);
        await fetchTodoVideos();
        setLoading(false);
      }}
    />
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
    padding: 3,
  },
  tag: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});
