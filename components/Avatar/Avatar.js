import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
// import * as ImagePicker from "expo-image-picker";
import AddIcon from "../svg/AddIcon";
// import DeleteIcon from "../svg/DeleteIcon/DeleteIcon";
// import uploadPhotoToServer, {
//   firebaseStore,
// } from "../../api/uploadPhotoToServer";
// import { useDispatch, useSelector } from "react-redux";
// import authSelectors from "../../redux/auth/authSelectors";
// import authOperations from "../../redux/auth/authOperations";

export default function Avatar() {
  return (
    <View style={styles.container}>
      <Image style={styles.img} />
      <TouchableOpacity style={styles.btn}>
        <AddIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  btn: {
    position: "absolute",
    right: -12,
    bottom: 14,
    width: 25,
    height: 25,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
});
