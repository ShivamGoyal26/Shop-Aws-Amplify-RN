import {Auth, Storage} from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, FlatList, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API, graphqlOperation} from 'aws-amplify';
import moment from 'moment';

import {useFocusEffect} from '@react-navigation/native';
import {getAllProducts} from '../queries';
import ProductItem from '../components/ProductItem';

const Home = props => {
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
    setUserInfo(authUser.attributes);
  };

  useFocusEffect(
    React.useCallback(() => {
      getProducts();
    }, []),
  );

  const getProducts = async () => {
    const products = await API.graphql(graphqlOperation(getAllProducts));
    setProducts(products.data.listProducts.items);
  };

  const getImage = async () => {
    const link = await Storage.get('4D11DCCC-0AD7-462F-BBBD-CFB25FF864AC.png');
    console.log(link);
  };

  useEffect(() => {
    getImage();
  }, []);

  const renderItem = ({item}) => {
    return <ProductItem item={item} />;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        {userInfo ? (
          <Button
            title="Add Product"
            onPress={() => {
              props.navigation.navigate('AddProduct', {
                userInfo,
              });
            }}
          />
        ) : null}
        {userInfo ? (
          <Button
            title="My Product"
            onPress={() => {
              props.navigation.navigate('MyProducts', {
                userInfo,
              });
            }}
          />
        ) : null}
        {userInfo ? (
          <Button
            title="Edit Profile"
            onPress={() => {
              props.navigation.navigate('EditProfile', {
                userInfo,
              });
            }}
          />
        ) : null}
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
  image: {
    width: '100%',
    height: 300,
  },
});

export default Home;
