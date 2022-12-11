import {memo} from 'react';
import {Storage} from 'aws-amplify';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const ProductItem = props => {
  const [image, setImage] = useState('');

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const link = await Storage.get(props.item.image);
    setImage(link);
  };

  return (
    <View>
      <Image source={{uri: image}} style={styles.image} />
      <View style={{padding: 10}}>
        <Text>{props.item.name}</Text>
        <Text>Price: {props.item.price}</Text>
        <Text>Last Updated: {moment(props.item.updatedAt).fromNow()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
});

export default memo(ProductItem);
