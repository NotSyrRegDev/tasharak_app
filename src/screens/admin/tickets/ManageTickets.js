import React, {useContext, useEffect, useState , useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../../../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {  query , collection , getDocs , db , where } from "../../../../firebase";
import { AdminContext } from '../../../context/AdminContext';
import { useFocusEffect } from '@react-navigation/native';



const ManageTickets = ({navigation , route}) => {
  const [error , setError] = useState();
  const [isLoading , setIsLoading] = useState();
  const [ ticketsArray , setTicketsArray ] = useState([]);
  const [ showsArray , setShowsArray ] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const { success , deleteRecord } = useContext(AdminContext);


  useFocusEffect(
    useCallback(() => {
      const getTimesData = async () => {
        setIsLoading(true);
        try {
          const q = query(collection(db, "tickets"), where("rel_event_id", "==", route.params.eventId));
          const querySnapshot = await getDocs(q);
          const ticketsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setTicketsArray(ticketsData);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      getTimesData();
    }, [route.params.eventId]) // Add any other dependencies you need
  );

  useEffect(() => {
    setIsLoading(true);
  
    const getTimesData = async () => {
      try {
        const q = query(collection(db, "shows"), where("rel_event_id", "==", route.params.eventId ) );
        const querySnapshot = await getDocs(q);
        const showsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setShowsArray(showsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    getTimesData();
  }, []);

  
  const handleModal = (  id ) => {
    setModalVisible(!modalVisible);
    setEditId(id);
    }

  if (
    isLoading
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />
        <View style={styles.loadingContainer} className="flex items-center justify-center h-full mt-10" >
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

    <Text style={styles.font} className="block text-black font-bold mb-2 text-2xl"  >
    { route.params.eventName}
        </Text>

        <Text style={styles.font} className="block text-black font-bold mt-8 mb-2 text-xl"  >
      المقاعد المتوفرة : {ticketsArray.length}
        </Text>

        <View className="flex flex-col mt-2" >

        {ticketsArray && ticketsArray.length !== 0 ? ticketsArray.map(({ ticket_price , tikcet_avaliable , id}) => (

          <TouchableOpacity
   onPress={() => handleModal(id) }
      className="w-full flex-row justify-around items-center p-4 text-sm rounded-lg bg-gray-100 border  mb-5"
      key={id}
    >
      <View>
        <Text className="text-black text-lg" style={styles.font}>
          الحالة: {tikcet_avaliable == true ? "متوفرة" : "غير متوفرة" }
        </Text>
        <Text className="text-green-600 text-lg mt-1" style={styles.font}>
          السعر : {ticket_price} ر.س
        </Text>
      </View>

      <View>
            <Entypo
        name="ticket"
        size={34}
        style={{ color: '#4FC3F7' }}
      />
      </View>
    </TouchableOpacity>

          )) : (
          <Text style={styles.font} className="bg-red-500 mt-5 p-2 w-96 rounded-full block text-black font-bold mb-10 text-lg"  >
          لا يوجد مقاعد بعد  
          </Text>
          ) }

       
       {showsArray && showsArray.length !== 0 ? (
        <TouchableOpacity
        className="mt-3 text-black py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => navigation.navigate('AddTicket' , {
          eventId: route.params.eventId,
          eventName: route.params.eventName
        } )}>
          <Text style={styles.buttonText}> إضافة مقاعد </Text>
        </TouchableOpacity>
       ) : (
        <View>
        <Text style={styles.font} className="bg-green-500 mt-5 p-2 w-96 rounded-full block text-black font-bold mb-3 text-base"  >
         يجب عليك اضافة عروض للتمكن من اضافة مقاعد
          </Text>

          <TouchableOpacity
        className="mt-1 text-black py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>  الرجوع  </Text>
        </TouchableOpacity>
   </View>
       ) }

       {showsArray.length >= 1 && (
        <TouchableOpacity
    className="text-black mt-2 text-sm px-6 py-4 "
      
      onPress={() => navigation.goBack()  }>
      <Text style={styles.buttonText}>  رجوع  </Text>
    </TouchableOpacity>
       )}
      
      

        </View>



    </View>

    <Modal transparent={true} visible={modalVisible} animationType="slide">

<View style={styles.modalContainer} >
  <View style={styles.modalContent} >

  {error && (
          <View className=" p-4 text-sm text-black rounded-lg bg-red-500   text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}

        {success && (
          <View className=" p-4 text-sm text-black rounded-lg bg-green-500 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
        )}
      
          <View className="flex felx-row items-center justify-center" >
          <Text className="text-black text-center text-lg mb-5" style={styles.font} > الاجرائات على المقعد  </Text>
          
          <TouchableOpacity
            className="mt-2 text-center text-black py-3 bg-red-400  rounded-lg text-sm px-6  mb-2 w-full"
              style={styles.buttonBG}
              onPress={() => {
                deleteRecord("tickets" , editId);
              } }>
              <Text style={styles.buttonText}>   حذف المقعد   </Text>
            </TouchableOpacity>
        
      <TouchableOpacity
        className="mt-2 text-center text-black py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBorder}
          onPress={() => setModalVisible(!modalVisible) }>
          <Text  style={styles.buttonTextBorder}>   اغلاق </Text>
        </TouchableOpacity>
        
      </View>
      </View>
    </View>
    </Modal>


    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.White,
    paddingHorizontal: 20,
  },
  InputHeaderContainer: {
    marginTop: SPACING.space_36,
  },

 
  icon_logo: {
    width: 150,
    height: 50,
  },
  button: {
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
  inputBox: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
    direction: 'rtl',
    width: '100%',
  },
  inputStyle: {
    width: '100%',
    paddingVertical: SPACING.space_4,
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,

  },
  textAreaInput: {
    textAlignVertical: 'top',
    height: 120, 
  },
  textInput: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
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
  starIcon: {
    color: COLORS.DarkRed,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 25,
   
  },
  modalContent: {
    borderRadius: 10,
    minWidth: '79%',
    padding: 20,
    backgroundColor: COLORS.White,
  },
  buttonBG: {
    minWidth: '85%',
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.DarkRed,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonTextBorder: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.Black,
    textAlign: 'center',
  },

});

export default ManageTickets;
