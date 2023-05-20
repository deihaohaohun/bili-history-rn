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

export default function DoingScreen() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchDoingVideos();
  }, []);

  const fetchDoingVideos = () => {
    return axios.get("http://192.168.18.8:3000/videos/Doing").then(resp => {
      setVideos(resp.data);
    });
  };

  const addVideoHistory = async id => {
    await axios.put(`http://192.168.18.8:3000/videos/${id}`).then(() => {
      toast.show({ description: "追番成功!", placement: "top" });
    });
    let video = videos.find(v => v.id === id);
    let idx = videos.findIndex(v => v.id === id);
    video.current += 1;
    videos.splice(idx, 1, video);
    return setVideos([...videos]);
  };

  const Item = ({ id, title, cover, total, current }) => (
    <View style={styles.item}>
      <View style={styles.video}>
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
        <View style={{ padding: 3 }}>
          <LoadingButton
            tip="追一集?"
            size="sm"
            onPress={() => addVideoHistory(id)}
          >
            追一集
          </LoadingButton>
        </View>
        <View style={styles.tag}>
          <Badge colorScheme="danger">{current + " / " + total}</Badge>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      <FlatList
        style={styles.container}
        data={videos}
        numColumns={3}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            cover={item.cover}
            id={item.id}
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
          await fetchDoingVideos();
          setLoading(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000003",
  },
  item: {
    width: width / 3,
    padding: 3,
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
