import { StyleSheet } from "react-native";

const CommonStyles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rooms: {
    margin: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  roomsPreview: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  roomsPrice: {
    position: "absolute",
    bottom: 10,
    left: 0,
    padding: 10,
    fontSize: 16,
    backgroundColor: "black",
    color: "white",
  },
  roomsOwner: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default CommonStyles;