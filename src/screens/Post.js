import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Theme from '../constants/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { Routes } from '../constants/Constants';
import ModelLoading from '../shared/ModalLoading';
import { API_BASE_URL } from '../constants/Constants';

const Post = props => {
  const [postData, setPostData] = useState();
  const [isloading, setIsLoading] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [commentsLength, setCommentsLength] = useState(0);

  useEffect(() => {
    setPostData(props.route.params.params.data);
    getComments(props.route.params.params.data.id);
  }, []);

  const getComments = async id => {
    try {
      setIsLoading(true);
      const comments = await fetch(`${API_BASE_URL}/posts/${id}/comments`);
      let commentsResult = await comments.json();
      setCommentsData(commentsResult);
      setCommentsLength(commentsResult.length);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(`API Error for comments:`, error);
    }
  };

  const onNameClicked = data => {
    props.navigation.navigate(Routes.User, {
      params: {
        data: data,
      },
    });
  };

  const emptyComponent = () => (
    <View style={styles.emptyView}>
      <Icon
        name="chatbox-outline"
        size={200}
        color={Theme.colors.primaryColor}
        style={{ opacity: 0.5 }}
      />
      <Text style={styles.emptyText}>No comments to display</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.flatListCardView}>
        <Text style={styles.cardTitleText}>{item.name}</Text>
        <Text style={styles.cardNameText}>
          {item.body.replaceAll('\n', '')}
        </Text>
        <Text style={styles.commentPostedBy}>Posted By: {item.email}</Text>
      </View>
    );
  };

  return (
    <>
      {postData && (
        <View style={styles.container}>
          <ModelLoading visible={isloading} />
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
            <Text style={styles.countText}>{commentsLength}</Text>
          </View>
          <FlatList
            data={commentsData}
            renderItem={renderItem}
            ListEmptyComponent={emptyComponent}
            contentContainerStyle={styles.flatlistStyle}
          />
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
  countText: {
    color: Theme.colors.primaryLight,
    fontSize: Theme.fontSize.small,
    fontWeight: '500',
    fontSize: Theme.fontSize.medium,
    marginLeft: 15,
    backgroundColor: Theme.colors.primaryDark,
    padding: 3,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  emptyView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    color: Theme.colors.primaryColor,
    marginBottom: 10,
  },
  flatlistStyle: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  flatListCardView: {
    borderRadius: 5,
    backgroundColor: Theme.colors.white,
    elevation: 2,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 20,
  },
  cardTitleText: {
    color: Theme.colors.primaryColor,
    lineHeight: 20,
    fontWeight: '500',
    marginBottom: 15,
    fontSize: Theme.fontSize.regular,
  },
  cardNameText: {
    color: Theme.colors.primaryDark,
    fontSize: Theme.fontSize.medium,
    alignSelf: 'flex-start',
  },
  commentPostedBy: {
    color: Theme.colors.primaryColor,
    marginTop: 15,
    textAlign: 'right',
    fontSize: Theme.fontSize.small,
  },
});

export default Post;
