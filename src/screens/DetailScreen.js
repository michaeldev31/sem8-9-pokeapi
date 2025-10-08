import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { getPokemonDetail } from '../api/pokeapi';

export default function DetailScreen({ route }) {
  const { url } = route.params;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    getPokemonDetail(url).then(setPokemon);
  }, [url]);

  if (!pokemon) return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;

  return (
    <View style={{ alignItems: 'center', marginTop: 40 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{pokemon.name}</Text>
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={{ width: 150, height: 150, margin: 20 }}
      />
      <Text>Altura: {pokemon.height}</Text>
      <Text>Peso: {pokemon.weight}</Text>
    </View>
  );
}
