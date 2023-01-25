import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, PixelRatio, TextInput, Image, ScrollView, ImageBackground, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons'
import { AuthContext } from '../../navigation/AuthProvider'
import BaseScreen from '../../components/BaseScreen'
import Input from '../../components/Input'
import Button from '../../components/Button'
import moment from 'moment/moment'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Feather from 'react-native-vector-icons/dist/Feather'
import Foundation from 'react-native-vector-icons/dist/Foundation'

import { BaseButton } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'

const themeColor = '#F5CF04'





const Profile = ({ navigation }) => {
    return (
        <BaseScreen


            title={'Profile'}
            renderChild={Content({ navigation })} navigation={navigation} paddingTop={false} paddingHorizontal={false} />
    )
}


const Content = ({ navigation }) => {

    const { BaseUrl, appData, userDetails, userToken, logout } = useContext(AuthContext)



    return (

        <View style={styles.contentScroll}>
            <View style={{ width: '100%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Image source={require('../../assets/images/logo.png')}
                    style={{
                        width: 160,
                        height: 160
                    }}
                />
            </View>
            <Text style={{ width: '100%', textAlign: 'center', fontSize: 24, fontFamily: 'Roboto', fontWeight: '600', color: '#000', left: 5, marginBottom: 10 }}>
                Nitin
            </Text>


            <TouchableOpacity style={styles.cardwrap} onPress={() => navigation.navigate('Bookings')}>
                <AntDesign name="calendar" color={'#555'} size={25} />

                <Text style={styles.cardWrapper}> My Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardwrap} onPress={() => navigation.navigate('AddressList')}>
                <FontAwesome5 name="address-book" color={'#555'} size={25} />

                <Text style={styles.cardWrapper}> My Addresses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardwrap} onPress={() => navigation.navigate('Contact')}>
                <AntDesign name="contacts" color={'#555'} size={25} />

                <Text style={styles.cardWrapper}> Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardwrap} onPress={() => navigation.navigate('Notifications')}>
                <Ionicons name="ios-notifications-outline" color={'#555'} size={25} />

                <Text style={styles.cardWrapper}> Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardwrap} onPress={() => navigation.navigate('Contact')}>
                <Feather name="help-circle" color={'#555'} size={25} />

                <Text style={styles.cardWrapper}> Help & Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardwrap} onPress={() => navigation.navigate('Term')}>
                <MaterialIcons name="privacy-tip" color={'#555'} size={25} />

                <Text style={styles.cardWrapper}> Terms</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ChangePassword') }} style={styles.cardwrap}>
                <AntDesign name="key" color={'#555'} size={25} />

                <Text style={[styles.cardWrapper]}>change Password</Text>
            </TouchableOpacity>






            <Button title={'logOut'}
                onPress={() => logout()}
            />



        </View>



    )
}

export default Profile

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'relative',
        paddingTop: 10,
        paddingBottom: 100,
        // marginTop: 100
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
        fontSize: 14,
        color: '#938888',
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
        color: '#000',
        fontFamily: 'Roboto',
        fontWeight: '600',
        // flexDirection: 'row',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 10,
        textAlign: 'left',
        // left: 7,

        width: '95%',
        // height: PixelRatio.getPixelSizeForLayoutSize(40),
        // marginBottom: 15,
        marginHorizontal: 8,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginRight: 10,

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
    cardwrap: { flexDirection: 'row', paddingLeft: 20, alignItems: 'center' },
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
    },
    postWrapper: {
        marginTop: 10,
        // marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 20,
        width: '100%',
        justifyContent: 'center',
        alignSelf: "center",
        backgroundColor: '#fff',
        borderRadius: 11,
        borderColor: '#fcfcfc',
        elevation: 3,
        shadowColor: '#000',
    },
    imgcard: {
        width: 51,
        height: 51,
        marginHorizontal: 10
    }

})