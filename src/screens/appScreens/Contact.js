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

const Contact = ({ navigation }) => {
    return (
        <BaseScreen
            title={"Help & Support"}
            renderChild={Content({ navigation })} navigation={navigation} leftButton={true} paddingTop={false}
        />
    )
}


const Content = ({ navigation }) => {

    const { BaseUrl, appData, userDetails, userToken } = useContext(AuthContext)


    const activeColor = "#F5CF04"
    // const [name, setName] = useState(userDetails.cust_name)
    const [search, setSearch] = useState('')

    return (
        <View style={styles.contentScroll}>
            {/* <View style={{ justifyContent: 'center', width: '100%' }}> */}
            <Image source={require('../../assets/images/support1.webp')}

                style={{ width: 250, height: 300, left: 50 }}
            />
            {/* </View> */}
            <Text style={{
                fontSize: 20, fontWeight: '500', color: '#000',
                width: '100%',

                textAlign: 'center'
            }}>
                Hey we’re here to help!
            </Text>
            <Text style={{
                fontSize: 16, fontWeight: '500', color: '#aaa',
                width: '100%',

                textAlign: 'center'
            }}>
                Get any question about our service or your order?
                just ask! our shoply superhouse are ready to
                assist and support you.
            </Text>

            <View style={styles.cardWrapper}>
                <View style={{ left: 10 }}>
                    <Text style={{
                        fontSize: 20, fontWeight: '500', color: '#000',
                        width: '100%',

                        // textAlign: 'center'
                    }}>
                        Call Us
                    </Text>
                    <Text style={{
                        fontSize: 16, fontWeight: '500', color: '#aaa',
                        width: '100%',

                        // textAlign: 'center'
                    }}>
                        +91 9898989898
                    </Text>
                </View>
                <View style={{ right: 10 }}>
                    <MaterialIcons name="call" size={30} />
                </View>
            </View>
            <View style={styles.cardWrapper}>
                <View style={{ left: 10 }}>
                    <Text style={{
                        fontSize: 20, fontWeight: '500', color: '#000',
                        width: '100%',

                        // textAlign: 'center'
                    }}>
                        Email Us
                    </Text>
                    <Text style={{
                        fontSize: 16, fontWeight: '500', color: '#aaa',
                        width: '100%',

                        // textAlign: 'center'
                    }}>
                        support@techninza.in                    </Text>
                </View>
                <View style={{ right: 10 }}>
                    <MaterialIcons name="email" size={30} />
                </View>
            </View>











        </View>

    )
}

export default Contact

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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        marginTop: 10,
        width: '100%',
        // height: PixelRatio.getPixelSizeForLayoutSize(60),
        // marginBottom: 15,
        marginHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#fcfcfc',
        elevation: 3,
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