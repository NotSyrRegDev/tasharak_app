import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS} from '../../theme/theme';
import {  query , collection , getDocs , db } from "../../../firebase";
import SubMovieCard from '../../components/SubMovieCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthenticationContext } from '../../context/AuthContext';
const {width, height} = Dimensions.get('window');

const AdminManageEvents = ({navigation}) => {

  const [error , setError] = useState();
  const [isLoading , setIsLoading] = useState();
  const [allEventsList, setAllEventsList] = useState(null);
  const { onLogout } = useContext(AuthenticationContext);

  useEffect(() => {
    setIsLoading(true);
  
    const getEventsData = async () => {
      try {
        const q = query(collection(db, "events"));
        const querySnapshot = await getDocs(q);
        const eventData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setAllEventsList(eventData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    getEventsData();
  }, []);

  

  if (
    allEventsList == undefined &&
    allEventsList == null 
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />
        {  /* TOP HEader */}
      <View className="flex flex-row items-center justify-center mt-16" >
      <Image source={require('../../assets/icons/logo_color_white.png')} style={styles.icon_logo} />
      </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.DarkRed} />
        </View>
      </ScrollView>
    );
  }


  return (
    <ScrollView style={styles.container} bounces={false}>
  <StatusBar hidden />
  

  {/* Rest of the code */}
  {error && (
          <View className="p-4 text-sm text-black rounded-lg bg-red-500 text-right mb-5 flex items-end">
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
  
  
  {allEventsList.length !== 0 ? (
    <FlatList
  nestedScrollEnabled={true} 
    data={allEventsList}
    keyExtractor={(item) => item.id}
    showsHorizontalScrollIndicator={false}
    bounces={false}
    contentContainerStyle={styles.containerGap36}
    numColumns={2}
    renderItem={({ item, index }) => (
      <SubMovieCard
        shoudlMarginatedAtEnd={true}
        cardFunction={() => {
        navigation.navigate('ManageEvent', { movieid: item.id });
        }}
        cardWidth={width / 2.2}
        isFirst={index == 0 ? true : false}
        title={item.event_name}
        imagePath={item.event_images[0] ? item.event_images[0] : ''}
        style={{ margin: 10 }}
      />
    )}
  />
  ) : (
    <View className="flex items-center justify-center h-full" >

<Text style={styles.font} className="block text-black font-bold mb-2 text-lg text-center"  >
      لم نستطع العثور على شئ
  </Text>

  
</View>
  )}
 

        <View className="flex items-center justify-center" style={styles.logoutContainer} >
        <TouchableOpacity
        className="text-black py-3 mb-6 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6   w-full"
          style={styles.button}
          onPress={() => onLogout() }>
          <Text style={styles.buttonText}> تسجيل الخروج </Text>
        </TouchableOpacity>
        </View>
    

</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.White,
    paddingHorizontal: 20,
  },
  logo: {
    resizeMode: 'cover',
    maxHeight: 100,
    maxWidth: 320,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  containerGap36: {
    gap: SPACING.space_12,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 50,
  },
  starIcon: {
    color: COLORS.DarkRed,
  },
  icon_logo: {
    width: 150,
    height: 50,
  },
  button: {
    marginTop: 55,
    marginBottom: 20,
    backgroundColor: COLORS.DarkRed,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonText: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
    color: COLORS.White
  },
  logoutContainer:{
    transform: [{ translateY: -40 }], 
  },
  font: {
    fontWeight: 'bold',
    fontFamily: FONTFAMILY.tajawal,
  },

});

export default AdminManageEvents;
