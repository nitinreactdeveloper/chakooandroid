import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, PixelRatio, TextInput, Image, ScrollView, ImageBackground, Dimensions, FlatList } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { AuthContext } from '../../navigation/AuthProvider'
import BaseScreen from '../../components/BaseScreen'
import Input from '../../components/Input'
import Button from '../../components/Button'
import moment from 'moment/moment'
import axios from 'react-native-axios'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'


const themeColor = '#F5CF04'

const Search = ({ navigation }) => {
    return (
        <BaseScreen
            title={'Search'}
            renderChild={Content({ navigation })} navigation={navigation} leftButton={true} paddingTop={false} paddingHorizontal={true}

        />
    )
}


const Content = ({ navigation }) => {

    const { BaseUrl, fetching, setFetchinh, userToken } = useContext(AuthContext)

    console.log(userToken)
    const [selected, setSelected] = useState(false)





    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}
        // justifyContent='center'
        >
            <View style={{ flexDirection: 'row', alignItems: "center", backgroundColor: '#f4f4f4', alignSelf: 'center', width: '100%', paddingHorizontal: 10, borderRadius: 10 }} >
                <TextInput placeholder='Search' placeholderTextColor={'#000'} style={{ paddingLeft: 10, width: '90%' }} />
                <TouchableOpacity onPress={() => setSelected(true)}>
                    <MaterialIcons name='search' size={20} color={'#000'} />
                </TouchableOpacity>
            </View>

            {selected === true ?
                <View style={{
                    flex: 1, 
                    // justifyContent: 'center',
                    alignSelf: 'center'
                }} >
                    <Text style={{color: '#000', fontSize: 18, left: 10}}>

                        No Data Found
                    </Text>
                </View>
                : null}
        </ScrollView>

    )
}

export default Search;

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
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6),
        color: '#000',
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
        left: 10,
        // width: '48%',
        // height: PixelRatio.getPixelSizeForLayoutSize(60),
        // marginBottom: 15,
        marginHorizontal: 10,
        backgroundColor: '#fff',
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
    },
    cardImg: {
        width: 70,
        height: 70,
        alignItems: 'center',
        // left: 20

    },
    username: {
        color: '#000',
        // marginTop: 25,
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'SF Pro Text',
        // left: 15
    },
    user: {
        color: '#000',

        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'SF Pro Text',
        // left: 22
    },


})