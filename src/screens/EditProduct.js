import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API, graphqlOperation} from 'aws-amplify';

import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

const EditProduct = props => {
  const userInfo = props?.route?.params?.userInfo;
  const data = props?.route?.params?.data;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    setName(data.name);
    setDescription(data.description);
    setPrice(data.price.toString());
  }, []);

  console.log(userInfo);

  const editProduct = async () => {
    let mainData = {
      userID: userInfo.sub,
      id: data.id,
      price: parseFloat(price ? price : 0),
      name: name,
      description: description,
    };
    console.log(mainData);
    const product = await API.graphql(
      graphqlOperation(mutations.updateProduct, {input: mainData}),
    );
    console.log('product', product);
    props.navigation.goBack();
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
          <TextInput
            placeholder="Enter the name"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <View style={{height: 20}} />
          <TextInput
            placeholder="Enter the description"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          <View style={{height: 20}} />
          <TextInput
            placeholder="Enter the price"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={price}
            onChangeText={setPrice}
          />
          <View style={{height: 20}} />
          <Button title="update product" onPress={editProduct} />
          <Button title="delete product" onPress={deleteProduct} />
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

export default EditProduct;
