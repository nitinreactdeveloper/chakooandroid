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
const Mybooking = ({ navigation }) => {
    return (
        <BaseScreen
            title={'My Orders'}
            renderChild={Content({ navigation })} navigation={navigation} leftButton={true} paddingTop={false}
        />
    )
}


const Content = ({ navigation }) => {


    const Completed = [
        { id: 1, img: require('../../assets/images/3.png') },
        { id: 2, img: require('../../assets/images/3.png') },
        { id: 3, img: require('../../assets/images/3.png') },
        { id: 4, img: require('../../assets/images/3.png') },
        { id: 5, img: require('../../assets/images/3.png') },


    ]
    const Cancel = [
        { id: 1, img: require('../../assets/images/3.png') },
        { id: 2, img: require('../../assets/images/3.png') },
        { id: 3, img: require('../../assets/images/3.png') },
        { id: 4, img: require('../../assets/images/3.png') },
        { id: 5, img: require('../../assets/images/3.png') },


    ]


    const [selectedTab, setSelectedTab] = useState(0)
    const [tabcolor, settabcolor] = useState('#000')
    const [tab, setTab] = useState(1)



    const { BaseUrl, appData, userDetails, userToken } = useContext(AuthContext)
    // const background= '#fff'

    const activeColor = "#F5CF04"
    // const [name, setName] = useState(userDetails.cust_name)
    const [search, setSearch] = useState('')
    const [bookings, setBookings] = useState([])
    const [history, setHistory] = useState()
    const [productid, setProductid] = useState()

    const getbookings = async () => {


        await axios.get(BaseUrl + '/bookings', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data)
                if (response.data.status === 200) {


                    setBookings(response.data.bookings)



                }
                else {
                    console.log(response.data.status)
                }

            })
            .catch((error) => {
                console.log(error, ' error while fetching api ')
            })

    }

    useEffect(() => {
        getbookings()
    }, [])


    return (

        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}
        // justifyContent='center'
        >



            <View style={[styles.rowAlign, { paddingHorizontal: 5, marginTop: 25, marginBottom: 10, justifyContent: 'space-around' }]}>
                <TouchableOpacity style={styles.tabBtn}
                    onPress={() => setTab(1)}>
                    <Text style={[styles.cardWrapper, { color: tab === 1 ? '#fff' : '#848484', backgroundColor: tab == 1 ? '#FFB441' : '#fff' }]}>Bookings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabBtn}
                    onPress={() => setTab(2)}>
                    <Text style={[styles.cardWrapper, { color: tab === 2 ? '#fff' : '#848484', backgroundColor: tab == 2 ? '#FFB441' : '#fff' }]}>History</Text>
                </TouchableOpacity>


            </View>

            {


                tab === 1 ?
                    <View style={{ paddingHorizontal: 10 }}>
                        {bookings ? bookings.map((item, index) =>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('BookingCancel')}
                                key={index}
                                style={{
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
                                        source={{
                                            uri: item.product.banner
                                        }}
                                        style={{
                                            width: 95,
                                            height: 94,
                                            borderRadius: 10,
                                            left: 6

                                        }} />
                                </View>

                                <View style={{ left: 14, marginBottom: 20, }} >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={[styles.subHeading1, { fontSize: 20, color: '#000', fontWeight: '600', bottom: 4, fontFamily: 'Montserrat', top: 2 }]}>
                                            {item.product.name}
                                        </Text>
                                        {/* <Text style={{ backgroundColor: 'lightgreen', width: '40%', textAlign: 'center', borderRadius: 8, right: 6 }}>{item.address.name}</Text> */}
                                    </View>
                                    <Text style={[styles.subHeading1, { fontSize: 16, color: '#000', fontWeight: '600', fontFamily: 'Montserrat', top: 2 }]}>Lorem ipsum dolor sit amet </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', top: 6 }}>
                                        <FontAwesome5 name="rupee-sign" size={16} color={'#000'} />
                                        {/* <Text style={[styles.subHeading1, { fontSize: 16, color: '#000', fontWeight: '600', fontFamily: 'Montserrat', top: 1 }]}>Rating</Text> */}
                                        <Text style={{ fontSize: 16, color: "#ffbc2d", right: 0 }}>{item.product.price}</Text>



                                    </View>
                                </View>

                            </TouchableOpacity>
                        ) : null

                        }

                    </View> :
                    tab === 2 ?
                        <View style={{ paddingHorizontal: 10 }}>
                            {Cancel.map((item, index) =>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate('BookingCancel')}
                                    key={index}
                                    style={{
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
                                            source={item.img}
                                            style={{
                                                width: 95,
                                                height: 94,
                                                borderRadius: 10,
                                                left: 6

                                            }} />
                                    </View>
                                    <View style={{ left: 14, marginBottom: 20, }} >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={[styles.subHeading1, { fontSize: 20, color: '#000', fontWeight: '600', bottom: 4, fontFamily: 'Montserrat', top: 2 }]}>
                                                Steak Knife
                                            </Text>
                                            <Text style={{ backgroundColor: '#FCA3A3', width: '40%', textAlign: 'center', borderRadius: 8, right: 6 }}>Cancelled</Text>
                                        </View>
                                        <Text style={[styles.subHeading1, { fontSize: 16, color: '#000', fontWeight: '600', fontFamily: 'Montserrat', top: 2 }]}>Lorem ipsum dolor sit amet </Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', top: 6 }}>

                                            <Text style={[styles.subHeading1, { fontSize: 16, color: '#000', fontWeight: '600', fontFamily: 'Montserrat', top: 1 }]}>Rating</Text>
                                            <Text style={{ fontSize: 16, color: "#ffbc2d", right: 6 }}>Rs.600</Text>



                                        </View>
                                    </View>

                                </TouchableOpacity>
                            )

                            }

                        </View> :
                        null}
        </ScrollView>



    )
}

export default Mybooking;

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
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        fontSize: 16,
        paddingHorizontal: 20,
        paddingTop: 8,
        // left: 7,
        // width: '48%',
        // height: PixelRatio.getPixelSizeForLayoutSize(60),
        marginBottom: 15,
        marginHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#fcfcfc',
        elevation: 3,
        shadowColor: '#fff',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },
    rowAlign: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tabBtnTxt: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
        backgroundColor: "#000000",
        borderWidth: 1,
        borderColor: "#323232",
        paddingHorizontal: 5,
        borderRadius: 5,
        marginHorizontal: 5
    },
    subHeading1: {
        // fontSize: 16,
        // fontSize: PixelRatio.getPixelSizeForLayoutSize(6),
        color: '#000',
        fontFamily: "Roboto-Medium",
    },



})