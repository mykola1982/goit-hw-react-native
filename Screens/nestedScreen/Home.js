import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";

import {
  selectAuthEmail,
  selectAvatar,
  selectUserName,
} from "../../redux/auth/authSelectors";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const Home = ({ navigation, route }) => {
  const email = useSelector(selectAuthEmail);
  const avatar = useSelector(selectAvatar);
  const name = useSelector(selectUserName);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    setLoad(true);
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        setPosts((prevState) => [...prevState, { id: doc.id, ...doc.data() }]);
      });
      setLoad(false);
    } catch (error) {
      setLoad(false);
      setError(error.message);
      Toast.show(`${error}`, {
        backgroundColor: "red",
        duration: 3000,
        position: 50,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.userContent}>
          {avatar ? (
            <Image style={styles.userAvatar} source={{ uri: avatar }} />
          ) : (
            <Image style={styles.userAvatar} source={photo} />
          )}
          <View style={styles.textContent}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>

        {posts.length > 0 && (
          <View
            style={{
              marginBottom: 100,
            }}
          >
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
      {load && (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 150,
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
    marginRight: 12,
  },
  locationText: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#212121",
  },
});
