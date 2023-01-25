import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, PixelRatio, TextInput, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import FontAwesome5, { FA5Style } from 'react-native-vector-icons/dist/FontAwesome5'
import { AuthContext } from '../../navigation/AuthProvider'
import BaseScreen from '../../components/BaseScreen'
import Input from '../../components/Input'
import Button from '../../components/Button'
import axios from 'react-native-axios'
import moment, { months } from 'moment/moment'
import RazorpayCheckout from 'react-native-razorpay';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dialog from "react-native-dialog";
const themeColor = '#F5CF04'


const PopularItem = ({ navigation, route }) => {

    const Header = route.params.header



    console.log(Header)
    return (
        <BaseScreen
            logo={
                <ImageBackground source={require('../../assets/images/4.png')}
                    style={{
                        width: 420,
                        height: 288,
                        top: 106,
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', top: 10 }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons color={'#fff'} name='arrow-back' style={{ right: 14 }} size={24}></MaterialIcons>
                        </TouchableOpacity>
                        <Text style={{
                            // fontSize: 22,
                            // top: 60,
                            fontSize: PixelRatio.getPixelSizeForLayoutSize(10),
                            color: '#fff', fontFamily: "Roboto-Bold"
                        }}>{Header}</Text>
                        <TouchableOpacity  >
                            <MaterialIcons color={'#fff'} name='share' size={24}></MaterialIcons>
                        </TouchableOpacity>

                    </View>
                </ImageBackground>
            }
            renderChild={Content({ navigation, route })} navigation={navigation} leftButton={true} paddingTop={false}
            paddingHorizontal={false}
        />
    )
}


const Content = ({ navigation, route }) => {

    const { BaseUrl, appData, userDetails, userToken } = useContext(AuthContext)
    // const background= '#fff'
    console.log(userToken, 'userToken')
    // console.log(route)
    const cat_id = route.params.productid
    const activeColor = "#F5CF04"

    const [addressid, setAddressid] = useState()
    const [address, setaddress] = useState()
    const [time, setTime] = useState('')
    const [slotid, setSlotId] = useState('')
    const [paymentStatus, setpaymentStatus] = useState()
    const [paymentid, setpaymentId] = useState()


    const [slottiming, setSlotTiming] = useState()
    const [category, setCategory] = useState()
    let crrDate = new Date()
    let localCrrDate = crrDate.toDateString()
    const [date, setDate] = useState('')
    const [errors, setErrors] = useState({})
    const [showCalendar, setShowCalendar] = useState(false)
    const [name, setName] = useState()

    const [price, setprice] = useState()



    const handleConfirm = (date) => {
        let local = date.toDateString()
        setDate(local)
        // const NewDate = moment(date).format("MMM Do YYYY")
        // setDateSlot(NewDate)
        console.log(date)
        hideDatePicker();
    };
    const showDatePicker = () => {
        setShowCalendar(true);
    };

    const hideDatePicker = () => {
        setShowCalendar(false);
    };



    console.log(paymentStatus)

    const validate = () => {
        let errors = {}
        if (!date) {
            errors.date = "date is required"
            setErrors(errors)
            return false
        }

        else if (!time) {
            errors.time = 'time is required'
            setErrors(errors)
            return false
        }
        else if (!address) {
            errors.time = 'Address is required'
            setErrors(errors)
            return false
        }
        else {
            setErrors({})
            return true
        }
    }

    const handleSubmit = async () => {
        let isValid = validate()
        if (isValid === true) {


            var options = {
                description: 'Credits towards consultation',
                image: 'https://i.imgur.com/3g7nmJC.jpg',
                currency: 'INR',
                key: 'rzp_test_7JFMstTaZGMnre',
                amount: `${category[0].price}00`,
                name: 'Acme Corp',
                // order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
                prefill: {
                    email: 'gaurav.kumar@example.com',
                    contact: '9191919191',
                    name: 'Gaurav Kumar'
                },
                theme: { color: '#53a20e' }
            }
            RazorpayCheckout.open(options).then((data) => {
                setpaymentStatus(1)
                setpaymentId(data.razorpay_payment_id)
                alert(data.razorpay_payment_id)

                paymentstatus()

                return false;
            }).catch((error) => {
                // handle failure

                setpaymentStatus(0)
                alert(`Error: ${error.code} | ${error.description}`);
                console.log(error.description, ' error')
            });


        }
    }
    console.log(paymentid, 'id')
    const paymentstatus = async () => {
        let data = new FormData()

        data.append('product_id', 5);
        data.append('date', date);
        data.append('slot', slotid);
        data.append('amount', category[0].price);
        data.append('address_id', 1);
        data.append('payment_status', paymentStatus);
        data.append('status', '1');
        data.append('payment_id', paymentid);


        await axios.post(BaseUrl + '/order/add', data, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                // console.log(response.data)
                if (response.data.status === 200) {
                    console.log(response.data)


                }
                else {
                    console.log(response.data.status)
                }

            })
            .catch((error) => {
                console.log(error)
            })

    }


    const getproduct = async () => {
        var data = new FormData()

        await axios.get(BaseUrl + `/single-product?id=5`, data, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                // console.log(response.data)
                if (response.data.status === 200) {

                    setCategory(response.data.single)
                    console.log(category[0].name)
                    console.log(category[0].price)

                                        
                }
                else {
                    console.log(response.data.status)
                }

            })
            .catch((error) => {
                // console.log(error)
            })

    }
    const getSlot = async () => {
        var data = new FormData()

        await axios.get(BaseUrl + `/slots`, data, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                console.log(response.data)
                if (response.data.status === 200) {

                    setSlotTiming(response.data.slots)
                }
                else {
                    console.log(response.data.status)
                }

            })
            .catch((error) => {
                // console.log(error)
            })

    }

    const getaddress = async () => {


        await axios.get('https://shopninja.in/chaku/api/address', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data)
                if (response.data.status === 200) {


                    setaddress(response.data.addresses)

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
        getaddress()
        getproduct()
        getSlot()
        // console.log(address)

    }, [])



    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}
        // justifyContent='center'
        >

            <View  >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}>
                    {category? category.map((item,index)=>
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{ fontSize: 20, color: '#000' }}>{item.name}</Text>
                    <View style={{ width: '30%', flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name='rupee-sign' size={14} color={'#000'} />
                        <Text style={{ fontSize: 16, borderRadius: 8, backgroundColor: '#ffb441', width: '50%', left: 4, textAlign: 'center', }}>{item.price}</Text>
                    </View>
                </View>
                    ):null}
                    
                </View>
                <Text style={{ fontSize: 12, fontWeight: '400', color: '#aaa', top: 5, paddingBottom: 10 }}>kings Road</Text>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={styles.subHeading}>Rating</Text>
                    <Text style={styles.subHeading}>(Reviews)</Text>
                </View>
            </View>
            <View>
                <Text style={{
                    top: 10, paddingBottom: 10,
                    color: '#000'
                }}>
                    Lorem ipsum dolor sit amet consectetur. Sit at tortor diam diam sed sit risus. Aliquet vulputate tempor lobortis velit venenatis tellus. A bibendum sagittis sed amet. Sit varius sit quam eget pretium. Lorem ipsum dolor sit amet consectetur. Sit at tortor diam diam sed sit risus. Aliquet vulputate tempor lobortis velit venenatis tellus. A bibendum sagittis sed amet. Sit varius sit quam eget pretium.
                </Text>
            </View>

            <Text style={{ fontSize: 16, color: '#000', marginTop: 10, fontWeight: '400' }}>
                Schedule Date:
            </Text>



            <View style={styles.inputWrapper}>
                <Text style={styles.input}>
                    {date ? date : '-- Select Date --'}
                </Text>
                <TouchableOpacity onPress={() => { showDatePicker() }}>
                    <MaterialIcons name="calendar-today" size={26} color='#FC9918' ></MaterialIcons>
                </TouchableOpacity>
            </View>
            {errors.date ?
                <Text style={{ color: 'red', marginTop: -10, }}>{errors.date}</Text>
                : null
            }

            <DateTimePickerModal
                isVisible={showCalendar}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}

                minimumDate={new Date()}
                mode="date">
            </DateTimePickerModal>

            <Text style={{ fontSize: 16, color: '#000', marginTop: 10, fontWeight: '400' }}>
                Time:  <Text style={styles.input}>{time ? time : ' Select slot '}</Text>
            </Text>
            {errors.time ?
                <Text style={{ color: 'red', marginTop: -10, }}>{errors.time}</Text>
                : null
            }
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginHorizontal: 10, }}>
                {slottiming ? slottiming.map((item, index) =>
                    <TouchableOpacity key={index}
                        onPress={() => { setTime(item.start_time + '-' + item.end_time), setSlotId(item.id) }}
                        style={[styles.cardWrapper, { width: '20%', justifyContent: 'center', marginHorizontal: 10, color: '#000', marginTop: 10 }]}
                    >
                        <Text style={{ color: '#000', fontWeight: '500', fontFamily: 'Roboto' }}>{item.start_time} - {item.end_time}</Text>
                    </TouchableOpacity>
                ) : null}
            </ScrollView>

            <Text style={[styles.input, { fontSize: 16, fontWeight: '400' }]}>Add Address</Text>
            {address ? address.map((item, index) =>
                <View key={index}

                    style={[item.is_default === 1 ? styles.addressWrapper : null]} >
                    {item.is_default == 1 ?
                        <View  >

                            <Text style={{ color: '#000', fontWeight: '500', fontFamily: 'Roboto' }}

                            >  H.No {item.house_no}, Street No. {item.street}, {item.landmark}, {item.town}, {item.state}, {item.pin_code}</Text>
                        </View>

                        : null}

                </View>

            ) : null}
            {address ?
                <View style={{ width: '98%', justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('AddressList') }}>
                        <Text style={{ color: '#ffb441' }}>Change Address</Text>
                    </TouchableOpacity>
                </View>
                : <View style={{ width: '98%', justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Address') }}>
                        <Text style={{ color: '#ffb441' }}>Add Address</Text>
                    </TouchableOpacity>
                </View>}
            <Button
                onPress={() => {
                    handleSubmit()
                    // navigation.navigate('Address')
                }
                }
                title={'Book Now'} />

        </ScrollView>


    )
}

export default PopularItem

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'relative',
        paddingTop: 10,
        top: 220,
        marginBottom: 250,
        paddingHorizontal: 10
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        // left: 7,
        width: '100%',
        // height: PixelRatio.getPixelSizeForLayoutSize(60),
        marginBottom: 15,
        marginHorizontal: 25,
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
    inputWrapper: {
        alignSelf: 'center',
        display: 'flex', flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        marginTop: 5,
        marginBottom: 15,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        elevation: 3,
        shadowColor: '#999',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    }, input: {
        color: '#000'
    },
    label: {
        color: '#000',
        fontSize: 16,
        marginBottom: 10,
        fontFamily: "Poppins-Medium",
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: '#aaa',
        borderWidth: 1,
        elevation: 1,
        shadowColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    addressWrapper: {
        alignSelf: 'center',
        display: 'flex', flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        marginTop: 5,
        marginBottom: 15,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        elevation: 3,
        padding: 5,
        shadowColor: '#999',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    }
})