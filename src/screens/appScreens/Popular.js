import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, PixelRatio, TextInput, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import { AuthContext } from '../../navigation/AuthProvider'
import BaseScreen from '../../components/BaseScreen'
import Input from '../../components/Input'
import Button from '../../components/Button'
import moment from 'moment/moment'
import axios from 'react-native-axios'


const themeColor = '#F5CF04'



const Popular = ({ navigation }) => {
    return (
        <BaseScreen
            title={'Popular'}
            renderChild={Content({ navigation })} navigation={navigation} leftButton={true} paddingTop={false}
            paddingHorizontal={false}
        />
    )
}


const Content = ({ navigation }) => {

    const { BaseUrl, appData, userDetails, userToken } = useContext(AuthContext)
    const activeColor = "#F5CF04"
    const [search, setSearch] = useState('')
    const [popular, setPopular] = useState()

    const getPopular = async () => {

        let form = new FormData()

        await axios.get(BaseUrl + '/products/popular', form, {
            headers: { "Content-type": "multipart/form-data" }

        })
            .then((response) => {
                console.log(response.data, 'Popular')
                if (response.data.status === 200) {

                    setPopular(response.data.popular_products)
                }
            })
            .catch((error) => {
                // setMessage('Network issue.')
                console.log(error, 'error while fetching popular api')
                // setLoading(false)
            })
    }



    useEffect(() => {

        getPopular()

    }, [])



    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}
        // justifyContent='center'
        >
            <View horizontal={true} style={{ flexDirection: 'row', flexWrap: 'wrap' }} showsHorizontalScrollIndicator={false}>
                {popular ? popular.map((item, index) =>
                    <TouchableOpacity key={index}
                        onPress={() => { navigation.navigate('PopularItem', { header: item.name, tabbtn: 1 }) }}
                        style={{
                            alignSelf: "center",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 10,
                            left: 4,
                            right: 4,
                            width: '48%',
                            // height: PixelRatio.getPixelSizeForLayoutSize(60),
                            marginBottom: 15,
                            marginHorizontal: 2,
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            borderColor: '#fcfcfc',
                            elevation: 3,
                            shadowColor: '#000',
                            // for ios below 
                            shadowOffset: { width: 5, height: 5 }
                        }}
                    >
                        <View style={{ width: 130, height: 130 }}>
                            <Image source={{ uri: item.banner }} style={{
                                height: 120,
                                borderRadius: 10,
                                // paddingHorizontal: 10,
                                width: 130
                            }} />
                        </View>


                        <Text style={[styles.subHeading,]}>{item.name}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <FontAwesome5 name='rupee-sign' color={'#000'} />
                            <Text style={[styles.subHeading1, { fontSize: 12, color: '#787272', fontWeight: '600', fontFamily: 'Montserrat', top: 1, left: 4 }]}>{item.price}</Text>
                        </View>
                    </TouchableOpacity>
                ) : null}



            </View >



        </ScrollView>













    )
}

export default Popular

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'relative',
        paddingTop: 10,
    },
    heading: {
        // fontSize: 18,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(7),
        color: '#000',
        fontFamily: "Roboto-Bold",
        marginBottom: 5,
    },
    subHeadingBold: {
        // fontSize: 16,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6),
        color: '#000',
        fontFamily: "Roboto-SemiBold",
    },
    subHeading: {
        // fontSize: 16,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5),
        color: '#000',
        fontWeight: '600',
        fontFamily: "Roboto-Medium",
    },
    smTxt: {
        // fontSize: 12,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(4.5),
        color: '#000',
        fontFamily: 'Roboto-Regular'
    },
    regTxt: {
        // fontSize: 14,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5.5),
        color: '#000',
        fontFamily: 'Roboto-Regular'
    },
    fontMedium: {
        fontFamily: 'Roboto-Medium'
    },

    cardWrapper: {
        alignSelf: "center",
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 10,
        left: 7,
        // width: '48%',
        // height: PixelRatio.getPixelSizeForLayoutSize(60),
        // marginBottom: 15,
        marginHorizontal: 8,
        // backgroundColor: '#fff',
        // borderRadius: 8,
        // borderColor: '#fcfcfc',
        // elevation: 3,
        // shadowColor: '#000',
        // for ios below 
        // shadowOffset: { width: 5, height: 5 }
    },
    rowAlign: {
        display: 'flex', flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowWrap: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 5,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    iconTxtBtn: {
        display: 'flex', flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        paddingHorizontal: 10,
    },
    badge: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 25,
        borderRadius: 5,
        backgroundColor: '#2a2',
    },
    secondaryBtn: {
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        alignItems: 'flex-end',
        width: 70,
        height: 25,
        borderRadius: 5,
        backgroundColor: '#fff',
        // borderWidth: 1,
        borderColor: themeColor,
    },
    secondaryBtnTxt: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5.5),
        color: themeColor,
        // fontFamily: 'Roboto-Bold',
        fontFamily: 'Roboto-Medium',
    },
    subHeading1: {
        // fontSize: 16,
        // fontSize: PixelRatio.getPixelSizeForLayoutSize(6),
        color: '#000',
        fontFamily: "Roboto-Medium",
    }

})