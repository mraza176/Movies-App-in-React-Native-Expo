import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getSearchMovies } from "@/api";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<[]>([]);
  const { query } = useLocalSearchParams();

  const fetchData = async () => {
    setIsLoading(true);
    setMovies(await getSearchMovies(query.toString()));
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
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ paddingBottom: 30 }}
        >
          <Ionicons name="arrow-back-outline" size={28} color="white" />
        </TouchableOpacity>
        <View style={{ paddingBottom: 20 }}>
          <Text style={{ color: "white", fontSize: 38, fontWeight: "bold" }}>
            Search Results for "{query}"
          </Text>
        </View>
        <FlatList
          data={movies}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingBottom: 20,
          }}
          keyExtractor={(item: {
            id: string;
            title: string;
            year: number;
            medium_cover_image: string;
          }) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/movie/${item.id}`)}>
              <Image
                source={{ uri: item.medium_cover_image }}
                width={175}
                height={275}
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
      </SafeAreaView>
    </>
  );
};

export default Search;
