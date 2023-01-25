import React, { useState, useEffect, useContext, useSyncExternalStore } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Button from '../../components/Button'
import Input from '../../components/Input'
import BaseScreen from '../../components/BaseScreen'
import { AuthContext } from '../../navigation/AuthProvider'
import axios from 'react-native-axios'
import DropDown from '../../components/DropDown'
import { useWorkletCallback } from 'react-native-reanimated'
// import { set } from 'react-native-reanimated'

const activeColor = "#fc9918"

const AddAddress = ({ navigation }) => {

    return (
        <BaseScreen title={'Add Address'} renderChild={Content({ navigation })}
            navigation={navigation} />
    )
}

const Content = ({ navigation }) => {

    const { logout, user, userDetails, userToken, setLoading, BaseUrl, getUser, refresh, setRefresh } = useContext(AuthContext)

    const [isSelected, setIsSelected] = useState(false)
    const [name, setName] = useState()
    const [mobile, setMobile] = useState()
    const [locality, setlocality] = useState()
    const [street, setStreet] = useState()
    const [city, setcity] = useState()
    const [pincode, setpincode] = useState()
    const [state, setstate] = useState()
    const [house, setHouse] = useState()
    const [country, setcountry] = useState()
    const [type, setType] = useState('1')
    const [apiError, setApiError] = useState(false)
    const [errors, setErrors] = useState({})
    const [countryArr, setCountryArr] = useState([])

    const validate = () => {
        let errors = {}
        if (!name) {
            errors.name = "name is required"
            setErrors(errors)
            return false
        }
        else if (!mobile) {
            errors.mobile = "mobile is required"
            setErrors(errors)
            return false
        }
        else if (!/^[0]?[789]\d{9}$/.test(mobile)) {
            errors.mobile = "mobile no is invalid"
            setErrors(errors)
            return false
        }
        else if (!street) {
            errors.street = "address is required"
            setErrors(errors)
            return false
        }
        else if (!locality) {
            errors.locality = "locality is required"
            setErrors(errors)
            return false
        }
        else if (!city) {
            errors.city = "city is required"
            setErrors(errors)
            return false
        }
        else if (!state) {

            errors.state = "state is required"
            setErrors(errors)
            return false
        }
        else if (!house) {
            errors.house = "House no is required"
            setErrors(errors)
            return false
        }
        else if (!pincode) {
            errors.pincode = "pincode is required"
            setErrors(errors)
            return false
        }
        else if (!country) {
            errors.country = "country is required"
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
            saveaddress()

        }
    }
    console.log(userToken)


    const saveaddress = async () => {
        let form = new FormData()

        form.append('name', name)
        form.append('mobile', mobile)
        form.append('house_no', house)
        form.append('street', street)
        form.append('landmark', locality)
        form.append('town', city)
        form.append('state', state)
        form.append('country', country)
        form.append('pin_code', pincode)
        form.append('is_default', isSelected ? 1 : 0)
        console.log(country, state, name, mobile, house, street, locality, city, pincode)
        await axios.post(BaseUrl + "/add-address", form, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data'

            }
        })
            .then((response) => {

                console.log(response.data, 'save_customer_address Api successful')
                if (response.data.status === 200) {
                    // navigation.navigate('PopularItem')

                    alert('true')
                }
                else {
                    setApiError(response.data.msg)
                }
            })
            .catch((error) => {
                console.log(error, 'error while fetching save_customer_address Api')
                setLoading(false)
            })
    }



    const items = [
        { id: '1', name: "Home" },
        { id: '2', name: "Work" },
        { id: '3', name: "Other" },
    ]


    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>

            <Text style={styles.label}>Add Address</Text>

            {/* <Text style={styles.whiteTxt}>Add new address</Text> */}
            <Input
                name="name" value={name} placeholder='Name'
                // icon='house' 
                keyboardType='default'
                iconType={1}
                onChangeText={setName}>
            </Input>
            {errors.name ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.name}</Text>
                : null
            }
            <Input
                name="mobile" value={mobile} placeholder='Mobile Number'
                // icon='house' 
                keyboardType='default'
                iconType={1}
                onChangeText={setMobile}>
            </Input>
            {errors.mobile ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.mobile}</Text>
                : null
            }
            <Input
                name="street" value={street} placeholder='street nno'
                // icon='house' 
                keyboardType='default'
                iconType={1}
                onChangeText={setStreet}>
            </Input>
            {errors.street ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.street}</Text>
                : null
            }

            <Input
                name="locality" value={locality} placeholder='Landmark'
                iconType={1}
                // editable={false}
                // icon='apartment' 
                keyboardType='default'
                onChangeText={setlocality}>
            </Input>
            {errors.locality ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.locality}</Text>
                : null
            }
            <Input
                name="house" value={house} placeholder='House No'
                // icon='location-city'
                iconType={1}
                keyboardType='default'
                onChangeText={setHouse}>
            </Input>
            {errors.house ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.house}</Text>
                : null
            }

            <Input
                name="city" value={city} placeholder='City/District'
                // icon='location-city'
                iconType={1}
                keyboardType='default'
                onChangeText={setcity}>
            </Input>
            {errors.city ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.city}</Text>
                : null
            }

            <Input
                name="state" value={state} placeholder='State'
                // icon='location-on'
                iconType={1}
                keyboardType='default'
                onChangeText={setstate}>
            </Input>
            {errors.state ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.state}</Text>
                : null
            }

            <Input
                name="pincode" value={pincode} placeholder='Pincode'
                // icon='fiber-pin'
                iconType={1}
                keyboardType='default'
                onChangeText={setpincode}>
            </Input>
            {errors.pincode ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.pincode}</Text>
                : null
            }

            <Input
                name="country" value={country} placeholder='Country'
                // icon='public'
                iconType={1}
                keyboardType='default'
                onChangeText={setcountry}>
            </Input>
            {errors.country ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.country}</Text>
                : null
            }

            {/* {countryArr ?
                <View style={{ marginTop: 0, marginBottom: 15 }}>
                    <DropDown data={countryArr} id={'country_id'} label={'country_name'} selected={country} setSelected={setcountry} />
                </View>
                : null
            }
            {errors.country ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.country}</Text>
                : null
            } */}

            {/* <Text style={styles.label}>Address Type</Text>


            <View style={[styles.rowWrap, { marginBottom: 10, justifyContent: 'flex-start' }]}>
                {items.map((item, idx) =>
                    <TouchableOpacity key={idx} style={[styles.category,
                        // { borderColor: type === item.id ? activeColor : '#ddd', borderWidth: 1 }
                    ]}
                        onPress={() => {
                            setType(item.id)
                        }}>
                        <TouchableOpacity
                            style={[styles.radio, { borderColor: type === item.id ? activeColor : '#A39C9C', backgroundColor: type === item.id ? activeColor : 'transparent', }]}
                            onPress={() => {
                                setType(item.id)
                            }}
                        >
                            <MaterialIcons name='circle' size={16} color={'#fff'}></MaterialIcons>
                        </TouchableOpacity>
                        <Text style={styles.whiteTxt2}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            </View> */}

            <View style={styles.divider}></View>

            <View style={styles.checkboxContainer}>
                <TouchableOpacity style={[styles.checkbox, { borderColor: isSelected ? activeColor : '#ABA0A0' }]} onPress={() => setIsSelected(!isSelected)}>
                    {isSelected ?
                        <MaterialIcons name='check' color={activeColor} size={20}></MaterialIcons>
                        : null
                    }
                </TouchableOpacity>
                <Text style={styles.whiteTxt2}>Use as default address</Text>
            </View>

            <Button title='Submit' onPress={() => { handleSubmit() }} />

        </ScrollView>
    )
}

export default AddAddress

const styles = StyleSheet.create({
    whiteTxt: {
        color: '#000',
        fontSize: 18,
        marginVertical: 10,
        fontWeight: 'bold',
        fontFamily: "Poppins-Regular",
    },
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        paddingHorizontal: 2,
        // borderWidth: 1, borderColor: '#fff'
    },
    btnRow: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    socialBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        height: 45,
        borderRadius: 25,
        backgroundColor: '#4267B2',
    },
    solidBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        marginVertical: 15,
        borderRadius: 10,
        backgroundColor: '#f33',
    },
    solidBtnTxt: {
        fontSize: 16,
        color: '#fff',
        fontFamily: "Poppins-Bold",
    },
    sheetButtons: {
        flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center',
        // backgroundColor: '#D4BFF9',
        backgroundColor: '#DAD8DE',
        width: '100%',
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        marginBottom: 30
    },
    sheetBtnTxt: {
        color: 'black',
        fontSize: 14,
        marginHorizontal: 5,
        fontFamily: "Poppins-Bold",
    },
    imgWrapper: {
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#222',
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20
    },
    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    rowWrap: {
        // marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        // paddingLeft: 10,
        marginBottom: 10,
        borderRadius: 5,
        // backgroundColor: 'green',
    },
    category: {
        alignSelf: "center",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
        // width: 100,
        height: 40,
        // paddingHorizontal: 10,
        marginRight: 20,
        paddingVertical: 5,
        borderRadius: 20,
        position: 'relative',
        backgroundColor: '#fff',
    },
    whiteTxt2: {
        color: '#000',
        fontSize: 14,
        marginVertical: 5,
        fontFamily: "Poppins-Regular",
    },
    radio: {
        display: 'flex',
        justifyContent: 'center', alignItems: 'center',
        width: 22, height: 22,
        borderWidth: 1,
        borderRadius: 25,
        marginRight: 10
    },
    label: {
        color: '#000',
        fontSize: 16,
        marginBottom: 10,
        fontFamily: "Poppins-Medium",
    },

    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#E2DDDD',
        marginTop: 5,
        marginBottom: 15
    },

    checkboxContainer: {
        alignSelf: 'flex-start',
        flexDirection: "row", justifyContent: 'center', alignItems: 'center',
        marginLeft: 10,
        marginVertical: 10,
        // borderWidth:1,borderColor:'#fff'
    },
    checkbox: {
        alignSelf: "center",
        display: 'flex',
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#fff',
        width: 25,
        height: 25,
        marginRight: 10,
        borderWidth: 1.5,
        borderRadius: 2,
        borderColor: '#2C467B'
    },

})