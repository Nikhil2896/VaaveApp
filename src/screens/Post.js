import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Post = () => {
  return (
    <View style={styles.container}>
      <Text>Post</Text>
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

export default Post;
