import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../constants/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { Routes } from '../constants/Constants';

const Post = props => {
  const [postData, setPostData] = useState();

  useEffect(() => {
    setPostData(props.route.params.params.data);
    console.log(props.route.params.params.data);
  }, []);

  const onNameClicked = data => {
    props.navigation.navigate(Routes.User, {
      params: {
        data: data,
      },
    });
  };

  return (
    <>
      {postData && (
        <View style={styles.container}>
          <View style={styles.postView}>
            <Icon
              name={'chevron-back-outline'}
              size={30}
              color={Theme.colors.primaryDark}
              onPress={() => props.navigation.goBack()}
              style={{ padding: 20 }}
            />
            <Text style={styles.postTitle}>{postData.title}</Text>
            <Text style={styles.postBody}>
              {postData.body.replaceAll('\n', '')}
            </Text>
            <Text
              style={styles.postedBy}
              onPress={() => onNameClicked(postData.user)}
            >
              Posted by: {postData.user.name}
            </Text>
          </View>
          <View style={styles.detailsView}>
            <Icon
              name={'chatbox-outline'}
              size={25}
              color={Theme.colors.primaryDark}
            />
            <Text style={styles.headingText}>Comments</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primaryLight,
  },
  postTitle: {
    color: Theme.colors.primaryDark,
    fontWeight: '700',
    fontSize: Theme.fontSize.large,
    marginBottom: 15,
    paddingHorizontal: 30,
  },
  postBody: {
    color: Theme.colors.primaryDark,
    fontSize: Theme.fontSize.regular,
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  postView: {
    backgroundColor: Theme.colors.white,
  },
  postedBy: {
    color: Theme.colors.primaryColor,
    fontSize: Theme.fontSize.medium,
    marginBottom: 35,
    paddingHorizontal: 30,
  },
  detailsView: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  headingText: {
    color: Theme.colors.primaryDark,
    fontSize: Theme.fontSize.small,
    fontWeight: '500',
    fontSize: Theme.fontSize.large,
    marginLeft: 15,
  },
});

export default Post;
