import { View , StyleSheet  , Image ,TouchableOpacity   , useWindowDimensions ,FlatList  } from 'react-native'
import {HomeSlidesOne  , HomeSlidesTwo  , HomeSlidesThree} from '../common/HomeSlides';
import React , {useState , useRef} from 'react';
const SliderComponent = ({ navigation ,  data , pointsShow , adsIndex }) => {
    const windowWidth = useWindowDimensions().width;
    const [activeSlide, setActiveSlide] = useState(0);
    const flatListRef = useRef(null);
  
    const navigateToSlide = (index) => {
      flatListRef.current.scrollToIndex({ index });
      setActiveSlide(index);
    };
  
    const renderItem = ({ item, index }) => {
      const imagePath = item.image;
  
      return (
        <TouchableOpacity
       key={item.id.toString()} // Use item.id
          activeOpacity={0.8}
          onPress={() => {
            navigateToSlide(index);
          
            if (index == 0 && adsIndex == 1 ) {
              navigation.navigate('SubCategoryScreen' , {
          categoryId: "MhEbS8RxW0HYYuZm17oP" ,
          categoryName: "مناسبات"
         })
            }
            if (index == 2 && adsIndex == 1) {
              navigation.navigate('AddScreenInfo')
            }
            if (index == 1 && adsIndex == 1) {
              navigation.navigate('NotificationsScreen')
            }

            if (index == 0 && adsIndex == 2 ) {
              navigation.navigate('SubCategoryScreen' , {
          categoryId: "p5X6SzXzzMrpQHxhPOAh" ,
          categoryName: "أجهزة إلكترونية  و تكنولوجية"
         })
            }

            if (index == 0 && adsIndex == 2 ) {
              navigation.navigate('SubCategoryScreen' , {
          categoryId: "p5X6SzXzzMrpQHxhPOAh" ,
          categoryName: "أجهزة إلكترونية  و تكنولوجية"
         })
            }

            if (index == 1 && adsIndex == 2 ) {
              navigation.navigate('SubCategoryScreen' , {
          categoryId: "I01631Pm7XdHSUjTQO6Z" ,
          categoryName: "مستلزمات بيتية ومكاتب"
         })
            }

            if (index == 2 && adsIndex == 2 ) {
              navigation.navigate('SubCategoryScreen' , {
                categoryId: "MhEbS8RxW0HYYuZm17oP" ,
          categoryName: "مناسبات"
         })
            }

            if (index == 0 && adsIndex == 3 ) {
              navigation.navigate('SubCategoryScreen' , {
                categoryId: "MhEbS8RxW0HYYuZm17oP" ,
          categoryName: "مناسبات"
         })
            }
            if (index == 1 && adsIndex == 3 ) {
              navigation.navigate('SubCategoryScreen' , {
                categoryId: "Qz4ystRefo1bvEAq2UK6" ,
          categoryName: "ملابس"
         })
            }
            if (index == 2 && adsIndex == 3 ) {
              navigation.navigate('SubCategoryScreen' , {
          categoryId: "p5X6SzXzzMrpQHxhPOAh" ,
          categoryName: "أجهزة إلكترونية  و تكنولوجية"
         })
            }
           
          }}
          style={[styles.itemContainer, { width: windowWidth }]}
        >
          <Image source={imagePath} style={styles.image} resizeMode="cover" />
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
        keyExtractor={(item) => item.id.toString()} // Use item.id
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
  
  const HomeAdsTop = ({navigation}) => {
    return <SliderComponent navigation={navigation} data={HomeSlidesOne} pointsShow={true} adsIndex={1} />;
  };
  
  const HomeAdsOffers = ({navigation}) => {
    return <SliderComponent navigation={navigation} data={HomeSlidesTwo} pointsShow={false} adsIndex={2} />;
  };
  
  const HomeAdsCategories = ({navigation}) => {
    return <SliderComponent navigation={navigation} data={HomeSlidesThree} pointsShow={false} adsIndex={3} />;
  };


const styles = StyleSheet.create({  
    image: {
        minWidth: '100%',
        maxWidth: '100%',
        borderRadius: 30,
        maxHeight: '100%',
        minHeight: '50%',
      },
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
});


export {HomeAdsTop , HomeAdsOffers , HomeAdsCategories}