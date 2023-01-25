import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, PixelRatio, TextInput, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import { AuthContext } from '../../navigation/AuthProvider'
import BaseScreen from '../../components/BaseScreen'
import Input from '../../components/Input'
import Button from '../../components/Button'
import moment, { months } from 'moment/moment'
import axios from 'react-native-axios'
import Dialog from "react-native-dialog";

const themeColor = '#F5CF04'
const Data = [
    { id: 1, Day: 'Mon', Date: '12' },
    { id: 2, Day: 'Mon', Date: '13' },
    { id: 3, Day: 'Mon', Date: '14' },
    { id: 4, Day: 'Mon', Date: '15' },
    { id: 5, Day: 'Mon', Date: '16' },

]

const Time = [
    { id: 1, Time: '10:00' },
    { id: 2, Time: '10:00' },
    { id: 3, Time: '10:00' },
    { id: 4, Time: '10:00' },
    { id: 5, Time: '10:00' },

]
const BookingCancel = ({ navigation }) => {
    return (
        <BaseScreen
            title={'Booking Cancel'}
            renderChild={Content({ navigation })} navigation={navigation} leftButton={true} paddingTop={false}
        />
    )
}


const Content = ({ navigation }) => {

    const { BaseUrl, appData, userDetails, userToken, fetching, setFetching } = useContext(AuthContext)
    // const background= '#fff'

    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic

        updateOrder()
        setTimeout(() => {
            navigation.goBack() 
        }, 1000);
        clearTimeout()

        setVisible(false);
    };


    var bookingsDetails = []
    const activeColor = "#F5CF04"
    // const [name, setName] = useState(userDetails.cust_name)
    const [search, setSearch] = useState('')
    const [detail, setDetails] = useState([])

    const getDetail = async () => {


        await axios.get(BaseUrl + `/single-order?order_id=16`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data)
                if (response.data.status === 200) {
                    setDetails(response.data.order)
                }
                else {
                    console.log(response.data.status)
                }

            })
            .catch((error) => {
                console.log(error)
            })



    }

    const updateOrder = async () => {

        let form = new FormData()
        form.append('status', 1)
        form.append('order_id', 16)
        await axios.post(BaseUrl + `/order/update?status=0&order_id=16`, form, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data)
                if (response.data.status === 200) {
                    setFetching({ type: 'setSuccess', value: { heading: " Success !", data: response.data.message } })

                }
                else {
                    console.log(response.data.status)
                }

            })
            .catch((error) => {
                console.log(error)
            })



    }


    useEffect(() => {
        getDetail()
        console.log(detail.amount, 'details')
    }, [])


    return (
        <View style={styles.contentScroll} showsVerticalScrollIndicator={false}
        // justifyContent='center'
        >
            <View style={{
                // display: 'flex',
                // justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingVertical: 6,
                width: '100%',
                // height: PixelRatio.getPixelSizeForLayoutSize(60),
                marginVertical: 10,
                backgroundColor: '#fff',
                // marginTop: 20,
                paddingBottom: 10,
                borderRadius: 8,
                borderColor: '#fff',
                elevation: 3,
                shadowColor: '#000',
                // for ios below 
                // shadowOffset: { width: 5, height: 5 }
            }}>


                <View>
                    <Image
                        source={require('../../assets/images/3.png')}
                        style={{
                            width: 95,
                            height: 94,
                            borderRadius: 10,
                            // right: 80,

                        }} />
                </View>
                <View style={{ left: 10, marginBottom: 20 }} >

                    <Text style={[styles.subHeading1, { fontSize: 20, color: '#000', fontWeight: '600', bottom: 4, fontFamily: 'Montserrat', top: 2 }]}>
                        Steak Knife
                    </Text>
                    <Text style={[styles.subHeading1, { fontSize: 16, color: '#000', fontWeight: '600', fontFamily: 'Montserrat', top: 2 }]}>Lorem ipsum dolor sit amet </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', top: 6 }}>

                        {/* <Text style={[styles.subHeading1, { fontSize: 16, color:
                             '#000', fontWeight: '600', fontFamily: 'Montserrat', top: 1 }]}>Rating</Text> */}
                        <FontAwesome5 name='rupee-sign' size={13} style={{ top: 1 }} color={'#ffbc2d'} />
                        <Text style={{ fontSize: 16, color: "#ffbc2d" }}>{detail.amount}</Text>



                    </View>
                </View>

            </View>

            <View style={{
                width: '100%', borderWidth: 2, borderColor: '#000', borderRadius: 10,
                justifyContent: 'center'
            }}>
                <Text style={{ width: '100%', fontSize: 20, color: '#000', borderBottomWidth: 2, borderColor: '#000', textAlign: 'center' }}>Booking Details</Text>
                <View style={styles.box}>
                    <Text style={styles.text}>Booking Date</Text>
                    <Text style={styles.boxtxt}>{detail.date}</Text>
                </View>
                <View style={styles.box} >
                    <Text style={styles.text}>Booking Slot
                    </Text>
                    <Text style={styles.boxtxt}>{detail.slot}</Text>
                </View>
            </View>
            <View style={{
                width: '100%', borderWidth: 2, borderColor: '#000', borderRadius: 10,
                justifyContent: 'center',
                marginTop: 20
            }}>
                <Text style={{ width: '100%', fontSize: 20, color: '#000', borderBottomWidth: 2, borderColor: '#000', textAlign: 'center' }}>Payment Details</Text>

                <View style={[styles.box, {
                    borderTopWidth: 2,
                    borderColor: '#000',
                    left: 0,
                    // justifyContent: 'center'
                    alignItems: 'center'

                }]} >
                    <Text style={styles.text}> Total
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: 0, marginRight: 10 }}>


                        <FontAwesome5 name='rupee-sign' size={13} style={{ top: 1 }} color={'#ffbc2d'} />
                        <Text style={{ fontSize: 16, color: "#ffbc2d" }}>{detail.amount}</Text>



                    </View>


                </View>
            </View>

            <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', alignSelf: 'center', width: '100%' }}>

            <Button title={'Cancel Appointment'} onPress={() => showDialog()} />
            </View>
            <Dialog.Container contentStyle={styles.dialogcontainer} visible={visible}>
                <Dialog.Title style={{
                    color: '#000', width: '100%', textAlign: 'center',
                    fontSize: 16, fontFamily: 'Montserrat',
                    fontWeight: '500'
                }}> Cancel Appointment?</Dialog.Title>


                <Text style={{ color: '#000', fontSize: 14, textAlign: 'center', width: '100%' }}>
                    Do you want to Cancel Booking?
                </Text>

                <View>

                    <Button title={'Yes'} onPress={() => { handleDelete() }} />

                </View>
                <View>
                    <Dialog.Button label="NO"
                        style={{ color: '#000', fontSize: 16 }}
                        onPress={handleCancel} />
                </View>
            </Dialog.Container>
        </View>


    )
}

export default BookingCancel

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
        // alignSelf: "center",
        // display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        // left: 7,
        width: '48%',
        // height: PixelRatio.getPixelSizeForLayoutSize(60),
        marginBottom: 15,
        marginHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#fcfcfc',
        elevation: 3,
        shadowColor: '#000',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
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
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        left: 10,
        paddingVertical: 10

    },
    boxtxt: {
        color: '#ffbc2d',
        right: 20,
        fontSize: 16
    },
    text: {
        color: '#000',

        fontSize: 16
    }

})