import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API, graphqlOperation} from 'aws-amplify';

import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import {myProducts} from '../queries';
import {useFocusEffect} from '@react-navigation/native';

const MyProducts = props => {
  const userInfo = props?.route?.params?.userInfo;
  const [products, setProducts] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getMyProducts();
    }, []),
  );

  const getMyProducts = async () => {
    const products = await API.graphql(
      graphqlOperation(myProducts, {id: userInfo.sub}),
    );
    setProducts(products.data.productsByUserID.items);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('EditProduct', {
            userInfo,
            data: item,
          });
        }}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={{padding: 10}}>
          <Text>{item.name}</Text>
          <Text>Price: {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <Button title="Back" onPress={() => props.navigation.goBack()} />
        <Text>MY PRODUCTS</Text>
        <FlatList
          data={products}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
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
  image: {
    width: '100%',
    height: 300,
  },
});

export default MyProducts;
