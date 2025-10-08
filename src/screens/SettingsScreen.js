import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function SettingsScreen({ navigation }) {
  const [selected, setSelected] = useState(20);

  const options = [10, 20, 50];

  return (
    <View style={{ marginTop: 40, alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Pokémon por página</Text>
      {options.map((opt) => (
        <Button
          key={opt}
          title={opt.toString()}
          onPress={() => {
            setSelected(opt);
            navigation.navigate('Pokemons', { limit: opt });
          }}
          color={opt === selected ? 'tomato' : 'gray'}
        />
      ))}
    </View>
  );
}
