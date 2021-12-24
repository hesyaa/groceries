import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import Risol from '../assets/apples.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      // carts: [
      //   {name: 'apel indo', price: 25000, img: Risol, jumlah: 2},
      //   {name: 'apel indo', price: 25000, img: Risol, jumlah: 2},
      //   {name: 'apel indo', price: 25000, img: Risol, jumlah: 2},
      //   {name: 'apel indo', price: 25000, img: Risol, jumlah: 2},
      //   {name: 'apel indo', price: 25000, img: Risol, jumlah: 2},
      // ],
      carts: [],
      mainstore: [],
      total: 0,
      totalHarga: 0,
    };
  }

  async componentDidMount() {
    try {
      const jsonValue = await AsyncStorage.getItem('Carts');
      this.setState({
        mainstore: jsonValue != null ? JSON.parse(jsonValue) : [],
      });
      this.get();
    } catch (err) {
      console.log(err);
    }
  }

  get = () => {
    const {mainstore} = this.state;
    let data = mainstore.length;
    let prices = mainstore.map(value => {
      return value.price;
    });

    let sum = prices.reduce((a, b) => {
      return a + b;
    });
    this.setState({
      total: data,
      totalHarga: sum,
    });
    console.log(sum);
  };

  process = (i, type, e) => {
    const {mainstore, carts, total, totalHarga} = this.state;
    let data = mainstore[i].jumlah;
    if (type) {
      data = data + 1;
      mainstore[i].jumlah = data;
      this.setState({
        mainstore,
        total: total + 1,
        totalHarga: totalHarga + e.price,
      });
    } else {
      data = data - 1;
      mainstore[i].jumlah = data;
      this.setState({
        mainstore,
        total: total - 1,
        totalHarga: totalHarga - e.price,
      });
    }
  };
  render() {
    const {carts, mainstore, total, totalHarga} = this.state;
    return (
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header Title="Cart Product" />
          {/* <Text>{JSON.stringify(mainstore)}</Text> */}
          {mainstore < 1 ? (
            <View>
              <Text style={{textAlign: 'center', fontSize: 25}}>
                belum ada pesanan
              </Text>
            </View>
          ) : (
            <View style={{paddingBottom: 70}}>
              {mainstore.map((value, index) => (
                <View style={styles.container} key={index}>
                  <Text
                    style={{
                      marginVertical: 5,
                      color: 'black',
                      padding: 10,
                      fontWeight: 'bold',
                    }}>
                    {value.name}
                  </Text>

                  <View style={styles.cartList}>
                    <Image source={Risol} style={{width: 100, height: 100}} />
                    <View style={{width: 100}}>
                      <Text>Rp.{value.price}</Text>
                      <Text>rate</Text>
                    </View>
                    <View
                      style={{
                        width: 100,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}>
                        <TouchableOpacity
                          style={styles.inp}
                          onPress={() => this.process(index, true, value)}>
                          <Text>+</Text>
                        </TouchableOpacity>
                        <Text>{value.jumlah}</Text>
                        <TouchableOpacity
                          style={styles.inp}
                          onPress={() => this.process(index, false, value)}>
                          <Text>-</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
        <View style={{marginHorizontal: 20}}>
          <TouchableOpacity style={styles.checkout}>
            <View>
              <Text style={{color: 'white'}}>Total: {total}</Text>
              <Text style={{color: 'white'}}>Rp.{totalHarga}</Text>
            </View>
            <Text style={{color: 'white'}}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Cart;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  cartList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  inp: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 2,
    width: '25%',
    margin: 5,
    alignItems: 'center',
    borderRadius: 8,
  },
  checkout: {
    backgroundColor: '#29a329',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 8,
    width: '100%',
    elevation: 8,
  },
});
