import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ImageBackground } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import BaseScreen from '../../components/BaseScreen'
import Button from '../../components/Button'
import Input from '../../components/Input'
import axios from 'react-native-axios'
import { AuthContext } from '../../navigation/AuthProvider'
// import Popup from '../components/Popup'

const themeColor =
    '#f33'

const ChangePassword = ({ navigation }) => {

    return (
        <BaseScreen title={'Change Password'} navigation={navigation} renderChild={Content({ navigation })} />
    )
}

const Content = ({ navigation }) => {

    // const { BaseUrl, loading, setLoading, user, userToken, } = useContext(AuthContext)
    const { logout, user, userDetails, userToken, measures, setLoading, getUser, BaseUrl, changePwd } = useContext(AuthContext)

    const [securePwd, setsecurePwd] = useState(true)
    const [new_psw, setNewPassword] = useState()
    const [old_psw, setOldPassword] = useState()
    const [popUpAlert, setpopUpAlert] = useState(false)
    const [err, setErr] = useState(false)

    const [errors, setErrors] = useState({})

    const validate = () => {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        let errors = {}
        if (!old_psw) {
            errors.newPassword = "new password is required"
            setErrors(errors)
            return false
        }
        else if (!new_psw) {
            errors.confirmPassword = "confirmPassword is required"
            setErrors(errors)
            return false
        }
        else if (old_psw === new_psw) {
            errors.confirmPassword = "new password and confirm password are matchings"
            setErrors(errors)
            return false
        }
        else if (!strongRegex.test(new_psw)) {
            errors.confirmPassword = 'Password must have at least 8 digits, 1 Capital letter, 1 small letter, 1 number and 1 special character.';
            setErrors(errors)
            return false
        }
        else {
            setErrors({})
            return true
        }
    }
    const handleSubmit = () => {
        let isValid = validate()
        if (isValid === true) {
            changePwd(old_psw, new_psw)
            




        }
    }




    return (
        <>
            {popUpAlert ?
                <Popup heading={popUpAlert} type={'success'} data={'Your password has been updated successfully.'}
                    onPress={() => {
                        setpopUpAlert(false)
                        // navigation.navigate('Settings')
                    }}
                />
                : null
            }

            {err ?
                <Popup heading={err} type={'error'} data={'Error occured while updating the password.'}
                    onPress={() => {
                        setErr(false)
                    }}
                />
                : null
            }
            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>

                <Text style={styles.regText}>Change password</Text>




                <Input
                    name="Old Password" value={old_psw} placeholder='Old Password' keyboardType='default'
                    icon={securePwd ? 'visibility-off' : 'visibility'}
                    secureTextEntry={securePwd}
                    onIconPressed={() => setsecurePwd(!securePwd)}
                    iconType={1}
                    onChangeText={setOldPassword}>
                </Input>
                {errors.newPassword ?
                    <Text style={{ color: themeColor, marginBottom: 10, marginTop: -15 }}>{errors.newPassword}</Text>
                    : null
                }

                {/* <Text style={styles.regText}>Confirm Password</Text> */}
                <Input
                    name="New Password" value={new_psw} placeholder='New Password' keyboardType='default'
                    icon={securePwd ? 'visibility-off' : 'visibility'}
                    secureTextEntry={securePwd}
                    onIconPressed={() => setsecurePwd(!securePwd)}
                    iconType={1}
                    onChangeText={setNewPassword}>
                </Input>
                {errors.confirmPassword ?
                    <Text style={{ color: themeColor, marginBottom: 10, marginTop: -15 }}>{errors.confirmPassword}</Text>
                    : null
                }

                <Button title='Update' onPress={() => {
                    handleSubmit()
                }} />

            </ScrollView>
        </>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'relative'
        // borderWidth: 1, borderColor: '#fff'
    },
    regText: {
        color: '#000',
        fontSize: 16,
        marginBottom: 15,
        fontFamily: "Poppins-Medium",
    },
})