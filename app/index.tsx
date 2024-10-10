import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getHorrorMovies, getLatestMovies } from "@/api";
import { StatusBar } from "expo-status-bar";
import MoviesList from "@/components/MoviesList";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<{
    latestMovies: [];
    horrorMovies: [];
  }>({ latestMovies: [], horrorMovies: [] });

  const fetchData = async () => {
    setIsLoading(true);
    setMovies({
      latestMovies: await getLatestMovies(),
      horrorMovies: await getHorrorMovies(),
    });
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
        <ScrollView>
          <MoviesList
            title="Latest YIFI Movies"
            movies={movies?.latestMovies}
          />
          <MoviesList title="Horror Movies" movies={movies?.horrorMovies} />
          <MoviesList
            title="Latest YIFI Movies"
            movies={movies?.latestMovies}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
