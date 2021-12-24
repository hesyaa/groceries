import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({Title}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'white'}}>{Title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#29a329',
    padding: 20,
  },
});
