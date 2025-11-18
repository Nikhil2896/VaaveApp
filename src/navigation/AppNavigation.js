import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PostList from '../screens/PostList';
import Post from '../screens/Post';
import User from '../screens/User';
import { Routes } from '../constants/Constants';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.Name}>
        <Stack.Screen
          name={Routes.PostList}
          component={PostList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.Post}
          component={Post}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.User}
          component={User}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
