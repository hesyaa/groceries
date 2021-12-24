import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Header from '../components/Header';
import Risol from '../assets/risol.jpg';

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      datas: [],
    };
  }

  async componentDidMount() {
    try {
      const data = await fetch('https://randomuser.me/api/');
      const json = await data.json();
      this.setState({
        datas: json.results,
      });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const {datas} = this.state;
    return (
      <View>
        <Header Title="Profile" />

        {datas.map((value, index) => (
          <View>
            <View
              style={{
                alignItems: 'center',
                height: 250,
                justifyContent: 'center',
              }}
              key={index}>
              <Image
                source={{uri: value.picture.large}}
                style={{width: 100, height: 100, borderRadius: 50}}
              />
              <Text style={{fontSize: 20, color: 'black'}}>
                {value.name.first}
              </Text>
            </View>

            <View style={styles.containerList}>
              <View style={styles.list}>
                <Text style={styles.text}>{value.login.username}</Text>
              </View>
              <View style={styles.list}>
                <Text style={styles.text}>{value.email}</Text>
              </View>
              <View style={styles.list}>
                <Text style={styles.text}>{value.phone}</Text>
              </View>
              <View style={styles.list}>
                <Text style={styles.text}>{value.location.city}</Text>
                <Text style={styles.text}>{value.location.country}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    color: 'black',
  },
  containerList: {
    backgroundColor: '##DCDCDC',
    height: '60%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 50,
    justifyContent: 'flex-start',
  },
});
