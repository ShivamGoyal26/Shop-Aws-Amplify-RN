import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AddProduct from '../screens/AddProduct';
import MyProducts from '../screens/MyProducts';
import EditProduct from '../screens/EditProduct';
import EditProfile from '../screens/EditProfile';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="MyProducts" component={MyProducts} />
        <Stack.Screen name="EditProduct" component={EditProduct} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
