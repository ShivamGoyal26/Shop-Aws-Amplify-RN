import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API, graphqlOperation, Storage} from 'aws-amplify';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

const AddProduct = props => {
  const userInfo = props?.route?.params?.userInfo;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const getImage = async () => {
    const result = await launchImageLibrary();
    setImage(result);
  };

  const createProduct = async () => {
    let link = '';
    if (image) {
      let result = image;
      const photoResponse = await fetch(result.assets[0].uri);
      const blob = await photoResponse.blob();
      link = await Storage.put(result.assets[0].fileName, blob, {
        contentType: blob._data.type,
      });
    }
    let data = {
      image: image ? link.key : null,
      userID: userInfo.sub,
      price: parseFloat(price ? price : 0),
      name: name,
      description: description,
    };
    console.log('>>>> data', data);
    const product = await API.graphql(
      graphqlOperation(mutations.createProduct, {input: data}),
    );

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
          <TouchableOpacity onPress={getImage}>
            {image ? <Text>Have image</Text> : <Text>Pick Image</Text>}
          </TouchableOpacity>
          <Button title="create product" onPress={createProduct} />
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

export default AddProduct;
