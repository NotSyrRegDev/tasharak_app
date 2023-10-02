import React, { useState , useContext } from 'react';
import {  View , Text  , TouchableOpacity , Image, StyleSheet  , TextInput} from 'react-native';
import { AuthenticationContext } from '../context/AuthContext';
import {COLORS, SPACING , FONTSIZE , BORDERRADIUS, FONTFAMILY} from '../theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import InputHeader from '../components/InputHeader';
import SearchBar from '../components/SearchBar';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';




export const HeaderOrders = ({navigation}) => {
  return (
    <View className="flex items-center pt-16 pb-5" style={styles.topAreaHeadins}  >

<Text className="text-3xl text-center text-white mt-8"  style={styles.title} > إيجاراتي  </Text>

<View className="flex items-center mb-5" style={styles.topAreaHeadins}  >

<View
  className="mt-8  rounded-full px-6 py-4"
    style={styles.button}
    >

<View className="flex-row items-center " >

<TouchableOpacity onPress={() => setActiveState('tenant') } className="mx-2 " >
<Text style={[styles.buttonText , activeState == "tenant" ? styles.activeBtnText : '' ]} className="mx-3" > مستأجر </Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => setActiveState('rented') }  >
<Text style={[styles.buttonText , activeState == "rented" ? styles.activeBtnText : '']} className="mx-3" > مؤجر </Text>
</TouchableOpacity>
  
    
    </View>
  </View>

</View>

</View>
  )
}


export const HeaderScreenGoBack = ({navigation , title}) => {
    return (
      <View style={styles.dirR} className="bg-white shadow-sm" >
 <View className="pt-20 pb-5" >
      <View className="flex-row items-center   relative"   >
          <TouchableOpacity className="px-4" onPress={() => navigation.goBack() } >
      <SimpleLineIcons name="arrow-right" size={24} color="#007FB7" />
      </TouchableOpacity>
            
      <Text className="text-2xl text-center"  style={styles.titleBack} > {title}   </Text>
      </View>
          </View>
      </View>
     
  
    )
  }

  export const HeaderSubCategory = ({ navigation , title }) => {
    return (
      <View style={styles.dirR} >

      <View className="pt-20 pb-5" >
      <View className="flex-row items-center relative"   >

      <TouchableOpacity className="px-4" onPress={() => navigation.goBack() } >
      <SimpleLineIcons name="arrow-right" size={24} color="#007FB7" />
      </TouchableOpacity>
        
      <Text className="text-xl text-center"  style={styles.titleSub} > {title}  </Text>
      </View>
      </View>

      <View style={{  paddingHorizontal: 20 }} >
      <SearchBar navigation={navigation} placeholder={"عن ماذا تبحث"} icon={"search"} />
      </View>

      </View>
    )
  }

export const HeaderCategories = ({navigation}) => {
  return (
    <View className="flex items-center pt-20 pb-5" style={styles.topAreaHeadins}  >
  
    <Text className="text-3xl text-center text-white mb-4"  style={styles.title} > التصنيفات  </Text>
    <SearchBar navigation={navigation} placeholder={"عن ماذا تبحث"} icon={"search"} />
  

    </View>
  )
}



export const HeaderExperinces = ({navigation}) => {
    return (
      <View  className="flex flex-row items-center justify-between pt-14 pb-2"  style={{ paddingHorizontal: 25 , backgroundColor: COLORS.Red }}  >
      
       <TouchableOpacity  onPress={()=> navigation.navigate('AddExperienceScreen') }>
        <AntDesign name="plus" size={24} color={COLORS.White} />
        </TouchableOpacity> 
  
      <View>
      <Text className="text-lg text-white text-left" style={[styles.font ]} >    إضافة تجربة  </Text>  
      </View>
  
        
          </View>
    )
  }

export const AdminHeaderUsers = ({navigation}) => {
    return (
      <View  className="flex flex-row items-center justify-between pt-14 pb-2"  style={{ paddingHorizontal: 25 , backgroundColor: COLORS.Red }}  >
      
       <TouchableOpacity  onPress={()=> navigation.navigate('AddExperienceScreen') }>
        <AntDesign name="user" size={24} color={COLORS.White} />
        </TouchableOpacity> 
  
      <View>
      <Text className="text-lg text-white text-left" style={[styles.font ]} >     إدارة المستخدمين  </Text>  
      </View>
  
        
          </View>
    )
  }
  
  
  export const HeaderLogo = ({navigation}) => {
    return (
      <View className="bg-white" style={{ paddingHorizontal: 15 }}  >
  <TouchableOpacity onPress={() => navigation.navigate('HomeTabs') } className="flex flex-row items-center justify-center pt-12 bg-white pb-2" >
      <Image source={require('../assets/icons/logo-green.png')} style={styles.logo} />
      </TouchableOpacity>
      </View>
  
    )
  }
  
  
  
  export const CustomHeader = ({ navigation }) => {
    const { isAuthenticated  } = useContext(AuthenticationContext);
    const [searchText, setSearchText] = useState('');
  
    const handleSearchSubmit = () => {
      if (searchText) {
        navigation.navigate('SearchScreen', {
          searchText: searchText,
        });
      }
    };
  
    return (
      <View  className="flex flex-row items-center justify-end pt-14 pb-2"  style={{ paddingHorizontal: 30 , backgroundColor: COLORS.Red }}  >
  
        <View className="ml-2"  style={[styles.searchBarContainer  ]} >
  <TouchableOpacity onPress={handleSearchSubmit} >
  <Ionicons name={"search"} size={18} color="#DADADA" />
      </TouchableOpacity>
      <TextInput
      className="block text-right px-2 text-base text-gray-500"
          style={styles.searchInput} 
          value={searchText}
          placeholder='أبحث عن التجارب الي تحبها'
          onChangeText={text => setSearchText(text)}
          placeholderTextColor="#888"
          onSubmitEditing={handleSearchSubmit}
        />       
      </View>
      <View className="ml-2" >
      <TouchableOpacity  onPress={() => navigation.navigate('NotificationsScreen') } >
        <Octicons name="bell" size={18} color={COLORS.White} />
        </TouchableOpacity>
      </View>
          </View>
    
    );
  };

  export const HeaderSearchGoBack = ({navigation}) => {

    const [searchText, setSearchText] = useState('');
  
    const handleSearchSubmit = () => {
      if (searchText) {
        navigation.navigate('SearchScreen', {
          searchText: searchText,
        });
      }
    };
  
    return (
      <View  className="flex flex-row items-center justify-center pt-14 pb-2"  style={{ paddingHorizontal: 25 , backgroundColor: COLORS.Red }}  >
  
     
  
        <View className="mx-6" style={[styles.searchBarContainer ]} >
  <TouchableOpacity onPress={handleSearchSubmit} >
  <Ionicons name={"search"} size={22} color="#DADADA" />
      </TouchableOpacity>
  
      <TextInput
      className="block text-right px-2 text-base text-gray-500"
          style={styles.searchInput} 
          value={searchText}
          placeholder='أبحث عن التجارب الي تحبها'
          onChangeText={text => setSearchText(text)}
          placeholderTextColor="#888"
          onSubmitEditing={handleSearchSubmit}
        />       
      </View>
  
      <View>
      <TouchableOpacity   onPress={() => navigation.goBack() } >
        <Feather name="chevron-right" size={28} color={COLORS.White} />
        </TouchableOpacity>
      </View>
     
     
       
          </View>
    )
  }

  export const HeaderEventGoBack = ({navigation}) => {
    return (
      <View  className="flex flex-row items-center justify-between pt-14 pb-2"  style={{ paddingHorizontal: 25 , backgroundColor: COLORS.Red }}  >
      <View>
        <Entypo name="heart-outlined" size={24} color={COLORS.White} />
        </View> 
      <View>
      <Text className="text-base text-white text-left" style={[styles.font ]} >    أسم الفعالية </Text>  
      </View>
        <TouchableOpacity  onPress={() => navigation.goBack() } >
        <Feather name="chevron-right" size={24} color={COLORS.White} />
        </TouchableOpacity>
          </View>
    )
  }
  

  export const AdminHeaderEvents = ({navigation  , navigate}) => {
    return (
  <View style={{ paddingHorizontal: 20 }} className=" pt-16 flex flex-row items-center justify-between w-full bg-white">
      <View  className="w-2/3 mx-1">
        <InputHeader />
      </View>

      <View className="w-1/3 mx-1">
        <TouchableOpacity
          className="text-black bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-2 py-4 mr-2 mb-2"
          style={styles.button}
          onPress={() => navigation.navigate(navigate)}
        >
          <Text style={styles.buttonText}> إنشاء </Text>
        </TouchableOpacity>
      </View>
    </View>
     
    
    )
  }


  
const styles = StyleSheet.create({
    logo: {
      resizeMode: 'cover',
      maxHeight: 60,
      maxWidth: 135,
    },
    buttonBorder: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: COLORS.DarkRed,
      borderRadius: BORDERRADIUS.radius_25,
      padding: 4
    },
    font: {
      fontFamily: FONTFAMILY.cairo
    },
    fontTajwal: {
      fontFamily: FONTFAMILY.tajawal,
      fontSize: FONTSIZE.size_16,
    },
    button: {
      backgroundColor: COLORS.DarkRed,
      borderRadius: BORDERRADIUS.radius_25,
    },
    buttonText: {
      fontFamily: FONTFAMILY.tajawal_bold,
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    profileContainer: {
      alignItems: 'center',
    },
    searchBarContainer: {
      flexDirection: 'row',
      backgroundColor: '#FFF',
      padding: 4,
      borderRadius: 50,
      alignItems: 'center',
      paddingHorizontal: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 20,
      elevation: 1,
      color: COLORS.Black
    },
    searchIcon: {
      marginRight: 20,
    },
    searchInput: {
      flex: 1,
      color: COLORS.Black,
      fontFamily: FONTFAMILY.cairo,
    },
    topAreaHeadins: {
      backgroundColor: COLORS.Blue,
      paddingHorizontal: 20,
    },
    title: {
      color: COLORS.White,
      fontFamily: FONTFAMILY.font_bold,
      fontWeight: 'bold',
      
    },
    titleBack: {
      color: COLORS.LightBLue,
      fontFamily: FONTFAMILY.font_bold,
      fontWeight: 'bold',
    },
    dirR: {
      direction: 'rtl',
    },
    titleSub: {
      color: COLORS.LightBLue,
      fontFamily: FONTFAMILY.font_bold,
      fontWeight: 'bold',
      
    },
  
  })
  
  