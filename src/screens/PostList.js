import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { API_BASE_URL } from '../constants/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../constants/Theme';
import ModelLoading from '../shared/ModalLoading';
import { Routes } from '../constants/Constants';

const PostList = props => {
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleSearchText = text => {
    setSearchText(text);
    if (debounceTimer) clearTimeout(debounceTimer);
    const newTimer = setTimeout(() => {
      runDebounceSearch(text);
    }, 400);
    setDebounceTimer(newTimer);
  };

  const runDebounceSearch = text => {
    let search = text.toLowerCase();
    if (!search) {
      setPostsData(data);
      return;
    }
    const results = data.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(search);
      const usernameMatch = post.user.name.toLowerCase().includes(search);
      return titleMatch || usernameMatch;
    });
    setPostsData(results);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const posts = await fetch(`${API_BASE_URL}posts`);
      const users = await fetch(`${API_BASE_URL}users`);
      let postsResult = await posts.json();
      let usersResult = await users.json();
      const mergedPosts = postsResult.map(post => {
        const user = usersResult.find(u => u.id === post.userId);
        return {
          ...post,
          user: user,
        };
      });
      setPostsData(mergedPosts);
      setData(mergedPosts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(`API Error for posts:`, error);
    }
  };

  const searchView = () => (
    <View style={styles.searchView}>
      <TextInput
        style={styles.textInput}
        onChangeText={handleSearchText}
        value={searchText}
        placeholder="Search post"
        placeholderTextColor={Theme.colors.placeHolder}
        maxLength={25}
        selectionColor={Theme.colors.primaryColor}
      />
      <Icon
        name="magnify"
        size={30}
        color={Theme.colors.primaryColor}
        style={styles.searchIcon}
      />
    </View>
  );

  const emptyComponent = () => (
    <View style={styles.emptyView}>
      <Icon
        name="message-image"
        size={200}
        color={Theme.colors.primaryColor}
        style={{ opacity: 0.5 }}
      />
      <Text style={styles.emptyText}>No posts to display</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.flatListCardView}
        onPress={() => onPostClicked(item)}
      >
        <View style={styles.cardDetailsView}>
          <Text style={styles.cardTitleText}>{item.title}</Text>
          <View style={styles.nameView}>
            <Text
              style={styles.cardNameText}
              onPress={() => onNameClicked(item.user)}
            >
              {item.user.name}
            </Text>
            <Text style={styles.cardNameText}>Read More {'>'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onPostClicked = data => {
    props.navigation.navigate(Routes.Post, {
      params: {
        data: data,
      },
    });
  };

  const onNameClicked = data => {
    props.navigation.navigate(Routes.User, {
      params: {
        data: data,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Theme.colors.primaryColor,
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Image
          source={require('../../assets/name.png')}
          style={{ width: 180, height: 30 }}
        />
      </View>
      <ModelLoading visible={isloading} />
      {searchView()}
      <FlatList
        data={postsData}
        renderItem={renderItem}
        ListEmptyComponent={emptyComponent}
        contentContainerStyle={styles.flatlistStyle}
      />
    </View>
  );
};

export default PostList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primaryLight,
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: Theme.colors.primaryColor,
    paddingHorizontal: 15,
    color: Theme.colors.primaryDark,
    fontSize: Theme.fontSize.medium,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
    top: 6,
  },
  searchView: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 100,
    elevation: 5,
    backgroundColor: Theme.colors.white,
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
    paddingTop: 10,
    paddingBottom: 100,
  },
  flatListCardView: {
    borderRadius: 5,
    backgroundColor: Theme.colors.white,
    elevation: 2,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  cardDetailsView: {
    padding: 20,
  },
  cardTitleText: {
    color: Theme.colors.primaryDark,
    lineHeight: 20,
    fontWeight: '500',
    marginBottom: 15,
  },
  cardNameText: {
    color: Theme.colors.primaryColor,
    fontSize: Theme.fontSize.medium,
    alignSelf: 'flex-start',
  },
  nameView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
