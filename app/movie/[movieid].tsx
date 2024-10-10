import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import { getMovie, getMovieSuggestions } from "@/api";
import MoviesList from "@/components/MoviesList";

const Movie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<{
    title?: string;
    year?: number;
    medium_cover_image?: string;
    genres?: string[];
    like_count?: number;
    rating?: number;
    cast?: [];
    medium_screenshot_image1?: string;
    medium_screenshot_image2?: string;
    medium_screenshot_image3?: string;
    description_full?: string;
  }>({});
  const [suggestions, setSuggestions] = useState<[]>([]);
  const { movieid } = useLocalSearchParams();

  const fetchData = async () => {
    setIsLoading(true);
    setMovie(await getMovie(movieid.toString()));
    setSuggestions(await getMovieSuggestions(movieid.toString()));
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
        <ScrollView style={{ flex: 1 }}>
          <View>
            <Text style={{ color: "white", fontSize: 38, fontWeight: "bold" }}>
              {movie.title}
            </Text>
            <Text style={{ color: "white", fontSize: 24 }}>{movie.year}</Text>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
            }}
          >
            <View
              style={{ padding: 5, backgroundColor: "white", borderRadius: 5 }}
            >
              <Image
                source={{
                  uri: movie.medium_cover_image,
                }}
                width={200}
                height={300}
              />
            </View>
            <View
              style={{
                marginLeft: 20,
                justifyContent: "flex-start",
              }}
            >
              {movie.genres?.map((genre: string) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 8,
                  }}
                  key={genre}
                >
                  <Octicons name="dot-fill" size={24} color="white" />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 24,
                      marginLeft: genre.length > 10 ? 0 : 10,
                    }}
                  >
                    {genre}
                  </Text>
                </View>
              ))}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: 140,
                  marginVertical: 15,
                }}
              >
                <Ionicons name="heart" size={32} color="green" />
                <Text style={{ color: "white", fontSize: 24 }}>
                  {movie.like_count}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: 138,
                  marginLeft: 2,
                }}
              >
                <FontAwesome name="imdb" size={32} color="yellow" />
                <Text
                  style={{ color: "white", fontSize: 24 }}
                >{`${movie.rating}/10`}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: "#6ac045",
              borderRadius: 5,
            }}
          >
            <Text
              style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
            >
              Download
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 28,
              fontWeight: "bold",
              marginTop: 30,
              marginBottom: 10,
            }}
          >
            Screenshots
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[
              { image: movie.medium_screenshot_image1 },
              { image: movie.medium_screenshot_image2 },
              { image: movie.medium_screenshot_image3 },
            ]}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.image }}
                width={350}
                height={197}
                style={{ borderRadius: 5, marginRight: 10 }}
              />
            )}
          />
          {movie.description_full && (
            <>
              <Text
                style={{
                  color: "white",
                  fontSize: 28,
                  fontWeight: "bold",
                  marginTop: 30,
                }}
              >
                Summary
              </Text>
              <Text
                style={{ color: "grey", fontSize: 20, textAlign: "justify" }}
              >
                {movie.description_full}
              </Text>
            </>
          )}
          {movie.cast && (
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 28,
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              >
                Cast
              </Text>
              {movie.cast?.map(
                (actor: {
                  name: string;
                  character_name: string;
                  url_small_image: string;
                  imdb_code: string;
                }) => (
                  <View
                    key={actor.imdb_code}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Image
                      source={{ uri: actor.url_small_image }}
                      width={60}
                      height={60}
                      style={{ borderRadius: 50 }}
                    />
                    <Text
                      style={{ color: "grey", fontSize: 20, marginLeft: 20 }}
                    >
                      {actor.name}
                    </Text>
                    <Text style={{ color: "white", fontSize: 20 }}>
                      {` as ${actor.character_name}`}
                    </Text>
                  </View>
                )
              )}
            </View>
          )}
          <MoviesList title="Similar Movies" movies={suggestions} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Movie;
