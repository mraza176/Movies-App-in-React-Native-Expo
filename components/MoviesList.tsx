import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { router } from "expo-router";

const MoviesList = ({ title, movies }: { title: string; movies: [] }) => {
  return (
    <View
      style={{
        marginTop: 30,
        marginBottom:
          title.includes("Science") || title.includes("Similar") ? 30 : 0,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
          marginVertical: 10,
        }}
      >
        {title}
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item: {
          id: string;
          title: string;
          year: number;
          medium_cover_image: string;
        }) => item.id}
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
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              {item.title.length > 15
                ? `${item.title.substring(0, 15)}...`
                : item.title}
            </Text>
            <Text style={{ color: "white" }}>{item.year}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MoviesList;
