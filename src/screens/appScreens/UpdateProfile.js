import React, { useState, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, Platform, PixelRatio, View, TextInput, ScrollView, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { AuthContext } from '../../navigation/AuthProvider'
import BaseScreen from '../../components/BaseScreen'
import axios from 'react-native-axios';


const errorColor =
    '#fe0000'

const darkBlue = '#2C467B'

const EditProfile = ({ navigation }) => {

    return (
        <BaseScreen title={'Edit Your Profile'} navigation={navigation} renderChild={Content({ navigation })} leftButton={true} />
    )
}

const Content = ({ navigation }) => {
    const { login, fetching, setFetching, userToken,  BaseUrl, logout } = useContext(AuthContext)
    // console.log(userToken)
    const [email, setemail] = useState()
    const [mobile, setMobile] = useState()
    const [errors, setErrors] = useState({})

    const [name, setName] = useState()

    const validate = () => {
        let errors = {}
        if (!name) {
            errors.name = "Name is required"
            setErrors(errors)
            return false
        }
        else if (!email) {
            errors.email = "email is required"
            setErrors(errors)
            return false
        }

        else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Invalid email, use the format - abc@xyz.com'
            setErrors(errors)
            return false
        }
        else if (!mobile) {
            errors.mobile = "Mobile is required"
            setErrors(errors)
            return false
        }
        else if (!/^[0]?[789]\d{9}$/.test(mobile)) {
            errors.mobile = 'Invalid mobile no';
            setErrors(errors)
            return false
        }



        else {
            setErrors({})
            return true
        }
    }

     const updateprofile= async (name, email, mobile,) => {
        // console.log(email, password, 'username,password entered are')
        
        var form = new FormData()
        form.append('id', userToken);
        console.log(userToken, 'userToken')
        form.append('name', name);
        console.log(name)
        form.append('email', email);
        console.log(email)
        form.append('mobile', mobile)
        console.log(mobile)


        await axios.post(BaseUrl + "/update_profile", form, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                console.log(response.data, 'successful')
                
                if (response.data.status === 200) {
                    console.log(response.data.msg)
                    setFetching({ type: 'setSuccess', value: { heading: response.data.msg } })

                }
                else {

                    setMessage(response.data.msg)
                }
            })
            .catch((error) => {
                setMessage('Network issue.')
                console.log(error, 'error while fetching Api')
                
            })
    }


    const handleSubmit = () => {
        let isValid = validate()
        if (isValid === true) {
            updateprofile(name, email, mobile)
            // logout()

        }
    }


    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>

            <Text style={[styles.heading, { marginBottom: 50, textAlign: 'center' }]}>Change Your Profile</Text>

            {/* <Text style={[styles.subHeading, { marginBottom: 5 }]}></Text> */}

            <Input
                name="name" value={name} placeholder='Enter  name'
                error={errors.name ? true : false}
                keyboardType='default'
                iconType={1}
                onChangeText={setName}>
            </Input>
            {errors.name ?
                <Text style={{ color: themeColor, marginBottom: 10, marginTop: -15 }}>{errors.name}</Text>
                : null
            }
            <Input
                name="mobile" value={mobile} placeholder='Enter 10 digit Mobile No' keyboardType='phone-pad'
                error={errors.mobile ? true : false}
                onChangeText={setMobile}>
            </Input>
            {errors.mobile ?
                <Text style={{ color: themeColor, marginBottom: 10, marginTop: -15 }}>{errors.mobile}</Text>
                : null
            }
            <Input
                name="email" value={email} placeholder='Enter your email'
                error={errors.email ? true : false}
                keyboardType='email-address'
                onChangeText={(text) => {
                    setemail(text)
                }}>
            </Input>
            {errors.email ?
                <Text style={{ color: errorColor, marginBottom: 10, marginTop: -15 }}>{errors.email}</Text>
                : null
            }







            <Button title='Update'
                onPress={() => handleSubmit()
                } />




        </ScrollView>
    )
}


export default EditProfile

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
    },
    heading: {
        fontSize: 18,
        color: '#000',
        fontFamily: "Roboto-Bold",
        marginBottom: 5,
    },
    subHeadingBold: {
        fontSize: 16,
        color: '#000',
        fontFamily: "Roboto-SemiBold",
    },
    subHeading: {
        fontSize: 16,
        color: '#000',
        fontFamily: "Roboto-Medium",
    },
    smTxt: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Roboto-Regular'
    },
    regTxt: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'Roboto-Regular'
    },
    fontMedium: {
        fontFamily: 'Roboto-Medium'
    },
    rowAlign: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },


    checkboxContainer: {
        flexDirection: "row", justifyContent: 'center', alignItems: 'center',
        marginLeft: 10,
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
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#F5CF04'
    },

    forgotBtnWrapper: {
        // alignSelf: 'flex-end',
    },
    forgotBtn: {
        fontSize: 14,
        // color: '#fc9918'
        color: '#000',
        fontFamily: "Roboto-Medium",
    },

    orWrapper: {
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginVertical: 40,
    },
    orline: {
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        borderTopColor: '#aaa',
        borderTopWidth: 1,
        width: '30%',
    },
    orTxt: {
        // marginTop: -16.5,
        fontSize: 20, fontWeight: '600',
        backgroundColor: 'transparent',
        color: '#aaa',
        width: 50,
        textAlign: 'center'
    },

    whiteBtn: {
        backgroundColor: 'transparent',
        marginTop: 15,
        fontWeight: 500,
        color: "#fe0000",
        marginVertical: 25,
        width: '100%',
        alignItems: 'center'
    },
    fbButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 45,
        borderRadius: 6,
        backgroundColor: '#3228C5',
        marginBottom: 15,
    },
    socialButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', height: 55,
        // marginTop:45,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 4,
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },
    googleIcon: {
        width: 22, height: 22,
        marginRight: 20
    },
    socialBtnTxt: {
        fontSize: 16, fontWeight: '700',
        color: '#000'
    },
})
