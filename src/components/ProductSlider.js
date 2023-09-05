import { View , StyleSheet  , Image ,TouchableOpacity   , useWindowDimensions ,FlatList  } from 'react-native'
import React , {useState , useRef} from 'react'

const ProductSlider = ({ productImages }) => {

    const SliderComponent = ({ data , pointsShow }) => {
        const windowWidth = useWindowDimensions().width;
        const [activeSlide, setActiveSlide] = useState(0);
        const flatListRef = useRef(null);
      
        const navigateToSlide = (index) => {
          flatListRef.current.scrollToIndex({ index });
          setActiveSlide(index);
        };
      
        const renderItem = ({ item, index }) => {
        
      
          return (
            <TouchableOpacity
            key={index}
              activeOpacity={0.8}
              onPress={() => navigateToSlide(index)}
              style={[styles.itemContainer, { width: windowWidth }]}
            >
              <Image source={{ uri: item }} className="w-full h-56 rounded-xl" style={styles.image} resizeMode="cover" />
            </TouchableOpacity>
          );
        };
      
        const renderSlidePoint = (index) => (
          <TouchableOpacity
            key={index}
            style={[styles.slidePoint, activeSlide === index && styles.activeSlidePoint]}
            onPress={() => navigateToSlide(index)}
          />
        );
      
        return (
          <View style={styles.containerSlider} className="mt-5 flex-col items-center justify-center">
            <FlatList
              ref={flatListRef}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              bounces={false}
              scrollEventThrottle={32}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
                setActiveSlide(newIndex);
              }}
            />
    
            {pointsShow && (
              <View className="flex-row items-center justify-center mt-5" style={styles.slidePointsContainer} >
              {data.map((_, index) => renderSlidePoint(index))}
            </View>
            )}
    
          </View>
        );
      };

      return <SliderComponent data={productImages} pointsShow={true} />;

}


const styles = StyleSheet.create({  
    // image: {
    //     minWidth: '100%',
    //     maxWidth: '100%',
    //     borderRadius: 30,
    //     maxHeight: '100%',
    //     minHeight: '50%',
    //   },
      slidePointsContainer: {
        transform: [{ translateY: -45 }], 
      },
      slidePoint: {
        width: 10,
        height: 10,
        borderRadius: 4,
        backgroundColor: '#DADADA',
        marginHorizontal: 4,
      },
      activeSlidePoint: {
        backgroundColor: '#fff',
      },
      listContainer: {
        paddingVertical: 16,
        paddingHorizontal: 8,
      },
      itemContainer: {

      }
});


export default ProductSlider