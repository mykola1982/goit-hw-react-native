import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import photo from "../../assets/photo.jpg";

export const Home = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.userContent}>
          <Image style={styles.userAvatar} source={photo} />
          <View style={styles.textContent}>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.userEmail}>natali@mail.com</Text>
          </View>
        </View>

        {posts.length > 0 && (
          <View style={{ marginBottom: 100 }}>
            <FlatList
              data={posts}
              keyExtractor={(item, indx) => indx.toString()}
              renderItem={({ item }) => (
                <View style={{}}>
                  <Image source={{ uri: item.photo }} style={styles.image} />
                  <Text
                    style={{
                      ...styles.placeName,
                      fontFamily: "Roboto-Medium",
                    }}
                  >
                    {item.name}
                  </Text>

                  <View style={styles.locationCommentContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: item.id,
                          photo: item.photo,
                        })
                      }
                    >
                      <View style={styles.commentContainer}>
                        <FontAwesome
                          style={styles.logo}
                          name="comment-o"
                          size={24}
                          color="black"
                        />

                        <Text style={styles.amount}>{item.comments}</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Map", {
                          location: item.location,
                        })
                      }
                    >
                      <View style={styles.location}>
                        <EvilIcons name="location" size={24} color="black" />
                        <Text
                          style={{
                            ...styles.locationText,
                            fontFamily: "Roboto-Regular",
                          }}
                        >
                          {item.placeName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.75,

    backgroundColor: "#FFFFFF",
  },

  mainContainer: { marginHorizontal: 16 },
  userContent: {
    flexDirection: "row",
    marginTop: 32,
    marginBottom: 32,
  },
  userAvatar: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: "red",
  },

  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 15,
    color: "rgba(33, 33, 33, 0.8)",
  },

  image: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },

  placeName: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "#212121",
    marginBottom: 11,
  },

  locationCommentContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 8,
  },

  commentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    marginRight: 6,
  },
  amound: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#212121",
  },
});
