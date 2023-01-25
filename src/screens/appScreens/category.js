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

const Data = [
    { id: 1, title: `chef's Knife`, img: require('../../assets/images/knife.png') },
    { id: 2, title: `chef's Knife`, img: require('../../assets/images/knife.png') },
    { id: 3, title: `chef's Knife`, img: require('../../assets/images/knife.png') },
    { id: 4, title: `chef's Knife`, img: require('../../assets/images/knife.png') },
    { id: 5, title: `chef's Knife`, img: require('../../assets/images/knife.png') },
    { id: 6, title: `chef's Knife`, img: require('../../assets/images/knife.png') },
    { id: 7, title: `chef's Knife`, img: require('../../assets/images/knife.png') },
    { id: 8, title: `chef's Knife`, img: require('../../assets/images/knife.png') },
    { id: 9, title: `chef's Knife`, img: require('../../assets/images/knife.png') },
    { id: 10, title: `chef's Knife`, img: require('../../assets/images/knife.png') },
    { id: 11, title: `chef's Knife`, img: require('../../assets/images/knife.png') },
    { id: 12, title: `chef's Knife`, img: require('../../assets/images/knife.png') },


]
const Data2 = [
    { id: 1, title: `chef's Knife`, img: require('../../assets/images/2.png') },
    { id: 2, title: `chef's Knife`, img: require('../../assets/images/2.png') },
    { id: 3, title: `chef's Knife`, img: require('../../assets/images/2.png') },
    { id: 4, title: `chef's Knife`, img: require('../../assets/images/2.png') },


]
const Data3 = [
    { id: 1, title: `chef's Knife`, img: require('../../assets/images/3.png') },
    { id: 2, title: `chef's Knife`, img: require('../../assets/images/3.png') },



]

const Category = ({ navigation }) => {
    return (
        <BaseScreen
            logo={
                <TouchableOpacity onPress={() => { }}>
                    <Text style={{
                        // fontSize: 22,
                        fontSize: PixelRatio.getPixelSizeForLayoutSize(8.5),
                        color: '#000', fontFamily: "Roboto-Bold"
                    }}>Category</Text>
                    {/* <Image source={require("../assets/images/drawer.png")} style={{
                      width: 150,
                      height: 50,
                      resizeMode: 'contain',
                      alignSelf: 'center'
                  }} ></Image> */}
                </TouchableOpacity>
            }
            renderChild={Content({ navigation })} navigation={navigation} leftButton={true} paddingTop={false}
        />
    )
}


const Content = ({ navigation }) => {

    const { BaseUrl, appData, userDetails, userToken } = useContext(AuthContext)


    const activeColor = "#F5CF04"
    // const [name, setName] = useState(userDetails.cust_name)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState()



    const getCategory = async () => {

        let form = new FormData()

        await axios.get(BaseUrl + '/categories', form, {
            headers: { "Content-type": "multipart/form-data" }

        })
            .then((response) => {
                console.log(response.data, 'Referral List')
                if (response.data.status === 200) {

                    setCategory(response.data.categories)
                }
            })
            .catch((error) => {
                // setMessage('Network issue.')
                console.log(error, 'error while fetching getcart api')
                // setLoading(false)
            })
    }


    useEffect(() => {
        getCategory()
    }, [])

    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}
        // justifyContent='center'
        >









            <Text style={{ paddingTop: 15, color: '#000', fontSize: 16, fontWeight: '600', left: 10 }}>Category</Text>


            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} showsHorizontalScrollIndicator={false}>
                {category ? category.map((item, index) =>
                    <TouchableOpacity key={index} style={styles.cardWrapper}
                        onPress={() => { navigation.navigate('PopularItem') }}
                    >
                        <Image source={item.icon} style={{ height: 70, width: 70, backgroundColor: '#000' }} />
                        <Text style={[styles.subHeading, { marginTop: 15 }]}>{item.name}</Text>
                    </TouchableOpacity>
                ) : null}


            </View>






        </ScrollView>

    )
}

export default Category

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