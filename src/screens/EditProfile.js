import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API, graphqlOperation} from 'aws-amplify';

import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

const EditProfile = props => {
  const userInfo = props?.route?.params?.userInfo;
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setPhone(userInfo.phone_number);
  }, []);

  const editProfile = async () => {
    let mainData = {
      id: userInfo.sub,
      phone_number: phone,
    };
    console.log(mainData);
    const user = await API.graphql(
      graphqlOperation(mutations.updateUser, {input: mainData}),
    );
    console.log('product', user);
    // props.navigation.goBack();
  };

  const deleteProduct = async () => {
    let mainData = {
      id: data.id,
    };
    console.log(mainData);
    const product = await API.graphql(
      graphqlOperation(mutations.deleteProduct, {input: mainData}),
    );
    console.log('product', product);
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <Button title="Back" onPress={() => props.navigation.goBack()} />
        <View style={{padding: 20}}>
          <View style={{height: 20}} />
          <TextInput
            placeholder="Enter the price"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />
          <View style={{height: 20}} />
          <Button title="update profile" onPress={editProfile} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    color: 'black',
    fontSize: 15,
  },
});

export default EditProfile;
