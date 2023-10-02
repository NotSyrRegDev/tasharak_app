import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Image,
  Modal
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../../theme/theme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDoc , doc , db   } from '../../../firebase';
import { AdminContext } from '../../context/AdminContext';


const Dashboard = ({navigation , route}) => {
  
  const [movieData, setMovieData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  
 
  
  const { convertTimeToDateString ,  deleteRecord , error , setError , success } = useContext(AdminContext);

  if (
    isLoading
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />

        {  /* TOP HEader */}
      <View className="flex flex-row items-center justify-between mt-16" >

      <Image source={require('../../assets/icons/logo_color_white.png')} style={styles.icon_logo} />

      </View>
      {  /* TOP HEader */}

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.DarkRed} />
        </View>
      </ScrollView>
    );
  }



  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar  />

    { /* EVENT MANAGE */ }
    <View className="mt-12" >

    <View className="mb-8" >
    <Text style={styles.font} className="block text-black font-bold mb-2 text-2xl"  >
      لوحة التحكم الرئيسية
        </Text>

   <View className="flex flex-row items-center justify-between flex-wrap mt-3" >

        <TouchableOpacity className="w-1/4 flex-col items-center" style={styles.boxManage} 
            onPress={() => navigation.navigate('ManageTourGuides' ) }
            >
         
            <Image source={require('../../assets/icons/admin_icons/tour-guide.png')} style={styles.iconBox} />
            <Text style={styles.font} className="text-black text-center mt-5 text-base" > المرشدين </Text>

            </TouchableOpacity>

            <TouchableOpacity className="w-1/4 flex-col items-center" style={styles.boxManage}
            onPress={() => navigation.navigate('CategoriesAdmin' ) }
             >
            <Image source={require('../../assets/icons/admin_icons/menu.png')} style={styles.iconBox} />
            <Text style={styles.font} className="text-black text-center mt-5 text-base" > الفئات </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/4 flex-col items-center" style={styles.boxManage}
            onPress={()=> navigation.navigate('CitiesAdmin' ) }
             >
            <Image source={require('../../assets/icons/admin_icons/condo.png')} style={styles.iconBox} />
            <Text style={styles.font} className="text-black text-center mt-5 text-base" > المدن </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/4 flex-col items-center" style={styles.boxManage}
             onPress={()=> navigation.navigate('ManageGroups' ) }
             >
            <Image source={require('../../assets/icons/admin_icons/about.png')} style={styles.iconBox} />
            <Text style={styles.font} className="text-black text-center mt-5 text-base" > القروبات </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/4 flex-col items-center" style={styles.boxManage}
             onPress={()=> navigation.navigate('ManageTopics' ) }
             >
            <Image source={require('../../assets/icons/admin_icons/hashtag.png')} style={styles.iconBox} />
            <Text style={styles.font} className="text-black text-center mt-5 text-base" > المواضيع </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/4 flex-col items-center" style={styles.boxManage}
             onPress={()=> navigation.navigate('ManageUsers' ) }
             >
            <Image source={require('../../assets/icons/admin_icons/user.png')} style={styles.iconBox} />
            <Text style={styles.font} className="text-black text-center mt-5 text-base" > المستخدمين </Text>
            </TouchableOpacity>

          </View>
      </View>

    <View className="mb-8" >
    <Text style={styles.font} className="block text-black font-bold mb-2 text-2xl"  >
     إعدادات التطبيق
        </Text>
    </View>

    <View className="mb-8" >
    <Text style={styles.font} className="block text-black font-bold mb-2 text-2xl"  >
     إحصائيات
        </Text>
    </View>


    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.White,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },


  icon_logo: {
    width: 150,
    height: 50,
  },

 


  font: {
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: FONTFAMILY.tajawal,
  },
  iconBox: {
    width:50 ,
    height:50,
  },
  boxManage: {
    borderRadius: 20,
    marginTop: 55,
    marginHorizontal: 10,
  },
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
    color: COLORS.White
  },

 
});

export default Dashboard;
