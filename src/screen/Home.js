import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Risol from '../assets/apples.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [
        {name: 'apple indonesia', price: 25000, img: Risol, jumlah: 1},
        {name: 'apple canada', price: 15000, img: Risol, jumlah: 1},
        {name: 'apple japan', price: 20000, img: Risol, jumlah: 1},
        {name: 'apple india', price: 10000, img: Risol, jumlah: 1},
        {name: 'apple jerman', price: 25000, img: Risol, jumlah: 1},
        {name: 'apple prancis', price: 25000, img: Risol, jumlah: 1},
      ],
      secondData: [
        {name: 'apple indonesia', price: 25000, img: Risol, jumlah: 1},
        {name: 'apple canada', price: 15000, img: Risol, jumlah: 1},
        {name: 'apple japan', price: 20000, img: Risol, jumlah: 1},
        {name: 'apple india', price: 10000, img: Risol, jumlah: 1},
        {name: 'apple jerman', price: 25000, img: Risol, jumlah: 1},
        {name: 'apple prancis', price: 25000, img: Risol, jumlah: 1},
      ],
      mainstore: [],
      mainview: true,
      search: '',
    };
  }

  async componentDidMount() {
    await this.create();
  }

  create = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Carts');
      this.setState({
        mainstore: jsonValue != null ? JSON.parse(jsonValue) : [],
      });
    } catch (err) {
      console.log(err);
    }
  };

  Buy = async e => {
    try {
      const json = [
        ...this.state.mainstore,
        {
          name: e.name,
          price: e.price,
          img: '../assets/apples.jpg',
          jumlah: 1,
        },
      ];
      const jsonValue = JSON.stringify(json);
      await AsyncStorage.setItem('Carts', jsonValue);
      Alert.alert('pembelian berhasil ditambah');
    } catch (err) {
      console.log(err);
    }
  };

  search = e => {
    const {products, secondData} = this.state;
    let text = e.toLowerCase();
    if (e.length < 1) {
      this.setState({
        products: secondData,
      });
    } else {
      this.setState({
        products: products.filter(value => {
          if (value.name.includes(text)) {
            return value;
          } else {
            return false;
          }
        }),
      });
    }
  };

  render() {
    const {products, mainstore, mainview, search} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Tanggerang Indonesia
              </Text>

              <Text style={styles.title}>Find Fresh Groceries</Text>
            </View>
            <Image
              source={Risol}
              style={{
                height: 40,
                width: 40,
                borderRadius: 40,
                alignSelf: 'center',
              }}
            />
          </View>
          <TextInput
            placeholder="search groceries"
            style={styles.inp}
            onChangeText={e => this.search(e)}
          />
          <View>
            <Text
              style={{fontWeight: 'bold', color: 'black', marginVertical: 10}}>
              Categories
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                style={styles.active}
                onPress={() => this.setState({mainview: true})}>
                <Text style={{color: 'white'}}>Apple</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.setState({mainview: false})}>
                <Text>Orange</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.setState({mainview: false})}>
                <Text>Banana</Text>
              </TouchableOpacity>
            </View>
          </View>
          {mainview ? (
            <View>
              {products.map((value, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderWidth: 0.5,
                    borderColor: 'lightgrey',
                    marginVertical: 5,
                    backgroundColor: 'white',
                    elevation: 8,
                  }}
                  key={index}>
                  <Image
                    source={value.img}
                    style={{width: 100, height: 100, margin: 5}}
                  />
                  <View style={{justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold'}}>{value.name}</Text>
                    <Text>Rp.{value.price}/Kg</Text>
                  </View>
                  <View
                    style={{
                      width: 100,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 70,
                        backgroundColor: '#29a329',
                        padding: 5,
                        borderRadius: 8,
                        marginVertical: 5,
                      }}
                      onPress={() => this.Buy(value)}>
                      <Text style={{textAlign: 'center', color: 'white'}}>
                        Buy
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 25,
                  paddingVertical: 20,
                }}>
                maaf data belum tersedia
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    color: '#29a329',
  },
  inp: {
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: 'white',
    borderColor: 'lightgrey',
  },
  btn: {
    padding: 8,
    backgroundColor: 'lightgrey',
    width: '25%',
    alignItems: 'center',
    borderRadius: 8,
  },
  active: {
    padding: 8,
    backgroundColor: 'green',
    width: '25%',
    alignItems: 'center',
    borderRadius: 8,
  },
});
