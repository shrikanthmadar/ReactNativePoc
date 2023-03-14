import { Image, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from '../feature/gallerySlice';


const Gallery = (props: any) => {
    const { navigation } = props;
    //const [currentData, setCurrentData] = useState<any>([{}]);
    //const currentData=useSelector((state:any)=>state?.counter?.value);
    //console.log(currentData,"current data")
    const [viewpic, setViewPic] = useState(false);
    const [Photo, setPhotoDetails] = useState<any>();
    const dispatch=useDispatch();
    const currentData:any=useSelector((state:any)=>state?.gallery?.value)
    console.log(currentData,"gallery.tsx")

    useEffect(() => {

        getAppData();
    }, [])

    const getAppData = async () => {
        try {


            const savedData = await AsyncStorage.getItem("appData");
            if (savedData) {
                const Data = JSON.parse(savedData);
                //setCurrentData(Data);
                dispatch(setInitialState(Data));
            }

        } catch (error) {
            console.log(error);
        }
    };


    const list = currentData?.payload?.map((x: any, index: number) => {
        return <TouchableOpacity key={x.id} onPress={() => {
            navigation.navigate('PreviewPhoto', {
                available: false, photo: {
                    path: x?.image,
                    notes: x.notes
                },
                isPreView: false
            });
        }}>
            <View  style={{ display: "flex", flexWrap: 'wrap', flexDirection: 'row' }} >
                <Image style={{ width: '100%', height: 200, margin: 5 }} source={{ uri: "file://," + x?.image }} />
                <View style={{ position: 'absolute', top: 10, left: 10, right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={{ color: "white" }}>{x.date?.split(',')[1]}</Text>
                </View>
                <View style={{ position: 'absolute', top: 0, left: 10, right: 0, bottom: 10, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                    <Text numberOfLines={1} style={{ color: "white" }}>{x.location}</Text>
                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, right: 10, bottom: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Text style={{ color: "white" }}>{x.temperature}&deg;C</Text>
                </View>
            </View>
        </TouchableOpacity>
    });

    //}
    const reTakePhoto = () => {
        setViewPic(false);
    }

    return (currentData.length === 0 ?
        <View style={{ alignItems: "center" }}>
            <View style={{ backgroundColor: "lightgreen", width: 200, height: 100, margin: 4, borderRadius: 10, alignItems: "center", justifyContent: "space-around" }}>
                <Text>You have no memories .Please click on plus icon to start clicking the image</Text></View>
            <View style={{ backgroundColor: "gray", width: 150, height: 50, margin: 4, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                <Text>Refresh again...!</Text></View>

        </View> : viewpic ?


            <View style={{}} >
                <View style={{ height: 500, width: "100%", borderColor: 'red' }}  >
                    <Image style={{ height: "100%", width: "100%" }} source={{ uri: "file://," + Photo?.image }} />
                </View>
                <View style={{ borderColor: 'red' }} >
                    <TextInput value={Photo?.notes} placeholder="Add a comment" />
                </View>
                <View style={{ borderColor: 'red' }} >
                    <Button title='back' onPress={reTakePhoto} />
                </View>

            </View>

            :
            <View>
                <View style={{ display: "flex", flexWrap: 'wrap', flexDirection: 'row' }}>
                    {list}
                </View>
            </View>
    )
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
    preview: {

        height: '100%',
        width: '100%'
    },
    preViewContainer: {
        height: 'auto',
        width: 'auto'
    },
});

export default Gallery;