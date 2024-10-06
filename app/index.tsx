import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getLatestMovies } from "@/api";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    setMovies(await getLatestMovies());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <ActivityIndicator color="white" size={48} />
    </View>
  ) : (
    <>
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: "black",
          paddingTop: 10,
        }}
      >
        <View
          style={{
            paddingBottom: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 38,
              fontWeight: "bold",
            }}
          >
            Movies
          </Text>
          <Image
            source={{ uri: "https://avatar.iran.liara.run/public/boy" }}
            width={50}
            height={50}
          />
        </View>
        <View style={{ justifyContent: "center" }}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="white"
            style={{
              color: "white",
              borderColor: "white",
              padding: 10,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderRadius: 50,
            }}
          />
          <Ionicons
            name="search-outline"
            color="black"
            size={24}
            style={{
              position: "absolute",
              right: 3,
              backgroundColor: "#6ac045",
              padding: 10,
              borderRadius: 50,
            }}
          />
        </View>
        <ScrollView style={{ marginTop: 20 }}>
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            >
              Latest YIFI Movies
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={movies}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    marginRight: 20,
                  }}
                  onPress={() => router.push(`/movie/${item.id}`)}
                >
                  <Image
                    source={{
                      uri: item.medium_cover_image,
                    }}
                    width={150}
                    height={225}
                    style={{ borderRadius: 10 }}
                  />
                  <Text
                    style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
                  >
                    {item.title.length > 15
                      ? `${item.title.substring(0, 15)}...`
                      : item.title}
                  </Text>
                  <Text style={{ color: "white" }}>{item.year}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
