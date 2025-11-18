import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostList = () => {
  return (
    <View style={styles.container}>
      <Text>PostList</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default PostList;
