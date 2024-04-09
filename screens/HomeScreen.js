import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlices'
import NavFavorites from '../components/NavFavorites'

const HomeScreen = () => {
  const dispatch = useDispatch()
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100, height: 100, resizeMode: 'contain'
          }}
          source={{
            uri: 'https://links.papareact.com/gzs',
          }}
        />

        <GooglePlacesAutocomplete
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
          placeholder='Where from?'
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              FontSize: 18,
            }
          }}
          onPress={(data, details = null) => {
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description,
            }))
            dispatch(setDestination(null))
          }}
          fetchDetails={true}
          returnKeyType={'search'}
          minLength={2}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en'
          }}
        />


        <NavOptions />
        <NavFavorites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
