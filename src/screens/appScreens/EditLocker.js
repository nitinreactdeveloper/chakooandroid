import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, Share, Linking, Alert } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import { AuthContext } from '../../navigation/AuthProvider'
import axios from 'react-native-axios'
// import RazorpayCheckout from 'react-native-razorpay'
import PopUpAlerts from '../../components/PopUpAlerts'
import BaseScreen from '../../components/BaseScreen'
import Button from '../../components/Button'
import Input from '../../components/Input'

const EditLocker = ({ navigation, route }) => {


    return (
        <BaseScreen title="Edit Your Locker" navigation={navigation} renderChild={Content({ navigation, route })}
            specialButton={
                <TouchableOpacity onPress={() => { navigation.navigate('Transactions') }}>
                    <MaterialIcons name="history" size={25} color='#000'></MaterialIcons>
                </TouchableOpacity>} />
    )
}
const errorColor =
    '#fe0000'

const darkBlue = '#2C467B'
const Content = ({ navigation, route }) => {
    console.log(route)
    const locker_name = route.params.lockername
    const locker_amt = route.params.lockeramount
    console.log(locker_name)
    const { BaseUrl, userDetails, userToken, fetching, setFetching } = useContext(AuthContext)

    const activeColor = "green"

    const [lockername, setLockerName] = useState(locker_name)
    const [errors, setErrors] = useState({})
    const [amount, setAmount] = useState(locker_amt)
    const [mainBalance, setMainBalance] = useState(6000)
    const [searchError, setSearchError] = useState(false)
    const [popup, setPopup] = useState(false)


    const handleSubmit = () => {
        let isValid = validate()
        if (isValid === true) {
            Withdraw()
            setTimeout(() => {
                navigation.goBack()
            }, 500);
        }
    }











    return (
        <>


            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}
            // justifyContent='center'
            >



                <View style={styles.cardWrapper}>
                    <Input
                        name="lockername" value={lockername} placeholder='Enter Locker Name'


                        onChangeText={(text) => {
                            setLockerName(text)
                        }}
                    >
                    </Input>


                    <Input
                        name="amount" value={amount} placeholder='Enter Your Locker Amount'

                        onChangeText={setAmount}
                    >
                    </Input>
                    {/* {errors.password ?
                <Text style={{ color: errorColor, marginBottom: 10, marginTop: -15 }}>{errors.password}</Text>
                : null
            } */}
                    <View style={[styles.rowAlign, { justifyContent: 'space-around' }]}>

                        <TouchableOpacity style={[styles.socialBtn,]}
                            onPress={() => { handleSubmit() }}>

                            <Text style={styles.solidBtnTxt}>Update Locker</Text>
                        </TouchableOpacity>
                    </View>
                </View>




            </ScrollView >
        </>
    )
}

export default EditLocker

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        // backgroundColor:'black'
        // borderWidth:1,borderColor:'#fff'
    },
    socialBtn: {
        marginVertical: 10,
        alignSelf: 'flex-end',
        display: 'flex', flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 40,
        borderRadius: 25,
        backgroundColor: '#F5CF04',
    },
    solidBtnTxt: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: "PTSans-Bold",
        marginLeft: 10
    },
    catTitle: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        fontFamily: "PTSans-Bold",
    },
    rowAlign: {
        display: 'flex', flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
        // borderWidth:1
    },
    imgWrapper: {
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center', alignItems: 'center',
        width: 150,
        height: 100,
        // borderRadius: 60,
        // borderWidth: 1,
        borderColor: '#555',
        overflow: 'hidden'
    },
    bgImg: {
        width: 150,
        height: 100,
        // borderRadius: 95 / 2,
        resizeMode: 'contain',
        // backgroundColor:'#222'
    },
    rowWrap: {
        // marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        // paddingLeft: 10,
        marginBottom: 10,
        borderRadius: 5,
        // backgroundColor: 'green',
    },
    cardWrapper: {
        marginBottom: 20,
        display: 'flex',
        // justifyContent: 'center', alignItems: 'center',
        padding: 10,
        width: '95%',
        // height: 140,
        borderRadius: 5,
        borderWidth: 0.5,
        backgroundColor: '#fff',
        borderColor: '#eee',
        overflow: 'hidden',
        marginHorizontal: 8,
        elevation: 3,
        shadowColor: '#000',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },
    heading: {
        // textAlign: 'center',
        fontSize: 18,
        color: '#000',
        fontWeight: '700',
        marginLeft: 10
    },
    subtitle: {
        fontSize: 16,
        color: '#000',
        lineHeight: 26,
        // textAlign:'center'
    },
    container: {
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
        flex: 1,
        backgroundColor: '#0009',
        zIndex: 100,
        justifyContent: 'center', alignItems: 'center'
    }

})
