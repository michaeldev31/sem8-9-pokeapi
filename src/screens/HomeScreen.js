import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl } from "react-native";
import { getPokemons } from "../api/pokeapi";

export default function HomeScreen({ navigation, route }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);

  const limit = route.params?.limit || 20;

  const loadPokemons = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      const data = await getPokemons(limit, isRefresh ? 0 : offset);
      const newList = isRefresh ? data.results : [...pokemons, ...data.results];
      setPokemons(newList);
      setOffset(isRefresh ? limit : offset + limit);
    } catch (err) {
      setError("Error cargando los Pokémon 😞");
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPokemons(true);
  }, [limit]);

  
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadPokemons(true);
  }, [limit]);

  const handleLoadMore = () => {
    if (!loading) loadPokemons();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetallePokemon", { url: item.url })}
      style={{ padding: 15, borderBottomWidth: 1, borderColor: "#ddd" }}
    >
      <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
      <Text>{item.url}</Text>
    </TouchableOpacity>
  );

  if (loading && pokemons.length === 0)
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;

  if (error)
    return (
      <View style={{ marginTop: 50, alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 50 }}>No hay Pokémon </Text>}
      ListFooterComponent={loading ? <ActivityIndicator style={{ margin: 20 }} /> : null}
    />
  );
}
