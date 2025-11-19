import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Theme from '../constants/Theme';
import Icon from 'react-native-vector-icons/Ionicons';

const User = props => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(props.route.params.params.data);
  }, []);

  const DetailsView = headprops => {
    return (
      <View style={styles.detailsView}>
        <Icon
          name={headprops.iconName}
          size={22}
          color={Theme.colors.primaryDark}
        />
        <View style={{ marginLeft: 30 }}>
          <Text style={styles.headingText}>{headprops.heading}</Text>
          <Text style={styles.detailsNameText}>{headprops.detail}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      {userData && (
        <View style={styles.container}>
          <View style={styles.mainView}>
            <Text style={styles.nameText}>{userData.name}</Text>
            <Text style={styles.userNameText}>@ {userData.username}</Text>
            <View style={styles.detailsMainView}>
              <DetailsView
                iconName={'mail-outline'}
                heading={'EMAIL'}
                detail={userData.email}
              />
              <DetailsView
                iconName={'tv-outline'}
                heading={'WEBSITE'}
                detail={userData.website}
              />
              <DetailsView
                iconName={'business-outline'}
                heading={'COMPANY'}
                detail={userData.company.name}
              />
              <DetailsView
                iconName={'location-outline'}
                heading={'CITY'}
                detail={userData.address.city}
              />
            </View>
          </View>
          <View style={styles.profileView}>
            <Icon
              name="person-outline"
              size={50}
              color={Theme.colors.primaryDark}
            />
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
  profileView: {
    width: 150,
    height: 150,
    backgroundColor: Theme.colors.primaryLight,
    alignSelf: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 10,
    borderColor: Theme.colors.white,
    elevation: 5,
    position: 'absolute',
    top: 70,
  },
  nameText: {
    color: Theme.colors.primaryDark,
    fontSize: Theme.fontSize.large,
    fontWeight: '700',
    marginTop: 100,
    alignSelf: 'center',
  },
  userNameText: {
    color: Theme.colors.primaryDark,
    alignSelf: 'center',
  },
  mainView: {
    borderRadius: 5,
    backgroundColor: Theme.colors.white,
    elevation: 2,
    marginHorizontal: 20,
    marginTop: 150,
  },
  detailsView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  headingText: {
    color: Theme.colors.placeHolder,
    fontSize: Theme.fontSize.small,
    fontWeight: '500',
  },
  detailsMainView: {
    padding: 40,
  },
  detailsNameText: {
    color: Theme.colors.primaryDark,
    fontSize: Theme.fontSize.regular,
  },
});

export default User;
