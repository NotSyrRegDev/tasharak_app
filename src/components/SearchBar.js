import { View  , StyleSheet , TextInput , TouchableOpacity } from 'react-native'
import React , {useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { FONTFAMILY , COLORS } from '../theme/theme';


const SearchBar = ( { navigation , placeholder , icon } ) => {

  const [searchText, setSearchText] = useState('');

  const handleSearchSubmit = () => {
    if (searchText) {
      navigation.navigate('SearchScreen', {
        searchText: searchText,
      });
    }
  };

  return (
    <View style={styles.searchBarContainer}>
    
    <TextInput
    className="block text-right px-2 text-base text-gray-500"
        style={styles.searchInput}
        vlaue={searchText}
        onChangeText={text => setSearchText(text)}
        placeholder={placeholder}
        placeholderTextColor="#888"
        onSubmitEditing={handleSearchSubmit}
      />
      <TouchableOpacity onPress={handleSearchSubmit} >
      <Ionicons name={icon} size={28} color="#DADADA" />
      </TouchableOpacity>
        
    </View>
  )
}

const styles = StyleSheet.create({ 

    searchBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 50,
        alignItems: 'center',
        paddingHorizontal: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 20,
        elevation: 1,
      },
      searchIcon: {
        marginRight: 20,
      },
      searchInput: {
        flex: 1,
        color: COLORS.Black,
        fontFamily: FONTFAMILY.font_regular,
      },
});

export default SearchBar