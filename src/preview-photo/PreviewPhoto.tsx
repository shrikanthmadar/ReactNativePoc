import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, TextInput, View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';


const PreviewPhoto=(props:any)=>{
    const {navigation,route,}=props;
   const  {photo,available,notes,isPreView}=route.params;
    const [tag, onChangeTag] = useState('');
    //const [available ,setAvailable]=useState(false);

    const getGUID = () => {
        let d = new Date().getTime();
        const guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return guid;
    }

    const savePhoto = async () => {

        Geolocation.getCurrentPosition(async (info) => {
            const newapi = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${info.coords.latitude}&lon=${info.coords.longitude}`
            const response = await fetch(newapi);
            const data = await response.json();
            const address = data.address.city + ',' + data.address.state + ',' + data.address.country;

            const api_key = 'a9b526db2539a2f651cef3ec787fa291'

            const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${info.coords.latitude}&lon=${info.coords.longitude}&appid=${api_key}&units=metric`

            const responseTemp = await fetch(weatherApi);
            const weatherDAta = await responseTemp.json();

            if(data&&weatherDAta){
            const imageDetails = {
                image: photo?.path,
                location: address,
                temperature: weatherDAta.main.temp,
                notes: tag,
                date: new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" }),
                id: getGUID()
            }
            const savedData = await AsyncStorage.getItem("appData");
            
                if (savedData) {
                    const Data = JSON.parse(savedData);
                    await AsyncStorage.setItem("appData", JSON.stringify([...Data, imageDetails]));
                } else {
                    await AsyncStorage.setItem("appData", JSON.stringify([imageDetails]));
                }
                //setIsPhoto(false);
            await navigation.navigate('Home')
        }
        });


    }

   return ( <SafeAreaView style={styles.preViewContainer}>
    
                <Image style={styles.preview} source={{ uri: "file://," + photo?.path }} />
                <TextInput onChangeText={onChangeTag} value={isPreView? tag: photo?.notes} placeholder="Add a comment" editable={!available} />
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    {
                        available ?
                            <View style={{ backgroundColor: "lightgreen", width: 200, height: 100, margin: 4, borderRadius: 10, alignItems: "center", justifyContent: "space-around" }}>
                                <Text style={{justifyContent:'space-evenly'}}>You have already clicked an image for the day
                                </Text>
                            </View> : isPreView ?
                            <View style={{margin:5}}>
                                <Button title='upload photo' onPress={savePhoto} />
                            </View>:<></>
                    }</View>
            </SafeAreaView>
            );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#fff',
        alignSelf: 'flex-end'
    },
    preViewContainer: {
        height: '100%',
        width: '100%'
    },
    preview: {
        //alignSelf: 'stretch',
        //flex: 1,
        height: '50%',
        width: '100%'
    }
});

export default  PreviewPhoto;