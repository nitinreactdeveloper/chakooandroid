import { View, Text } from 'react-native'
import React, { useState, useEffect, createContext, useReducer, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'react-native-axios';
import messaging from '@react-native-firebase/messaging';

import { NavigationContainerRefContext } from '@react-navigation/native';
// import { getAppData } from '../screens/appScreens/AppData';

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const BaseUrl = "https://www.shopninja.in/chaku/api"

    const [userToken, setUserToken] = useState(null)
    const [userDetails, setUserDetails] = useState({})
    const [username, setUserName] = useState(null)

    const [userData, setUserData] = useState()
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)
    const [deviceId, setDeviceId] = useState(null)

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)

    const initialFetch = {
        loading: false,
        success: false,
        error: false,
        response: false
    }
    const fetchReducer = (state, action) => {
        switch (action.type) {
            case 'setLoading': return { ...state, loading: action.value }
            case 'setSuccess': return { ...state, success: action.value }
            case 'setError': return { ...state, error: action.value }
            case 'setResponse': return { ...state, response: action.value }
            case 'reset': return initialFetch
            default: return state
        }
    }
    const [fetching, setFetching] = useReducer(fetchReducer, initialFetch)

    const initialAppData = {
        patients: "",
    }
    const dataReducer = (state, action) => {
        switch (action.type) {
            case 'setPatients': return { ...state, patients: action.value }
            default: return state
        }
    }
    const [appData, setAppData] = useReducer(dataReducer, initialAppData)

    const getToken = async () => {
        await AsyncStorage.getItem('userToken').then(value => {
            if (value !== null) {
                setUserToken(value)
                // getApiData(value)
            }
        })
    }
    const getFcmToken = async () => {
        try {
            const token = await messaging().getToken();
            console.log('FCM token registered:', token);
            setDeviceId(token)
            console.log('FCM token length:', token.length);
        } catch (error) {
            console.error('Error getting FCM token:', error);
        }
    }
    const getIntialLaunch = () => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true);
            }
        })
    }

    const getApiData = (id) => getAppData(id, setFetching, setAppData)

    useEffect(() => {
        getToken()
        // getFcmToken()
        getIntialLaunch()
        // console.log(userDetails, 'hello', userToken)

    }, [])


    const sendOtp = async (email, navigation) => {
        setLoading(true)
        var form = new FormData()
        form.append('email', email);

        await axios.post(BaseUrl + "/resend-otp", form, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                setLoading(false)
                if (response.data.status == 200) {

                }

                else {
                    setMessage(response.data.msg)
                    // setFetching({ type: 'setError', value: { heading: " Error !", data: response.data.msg } })

                }
            })
            .catch((error) => {
                setLoading(false)
                console.log(error, 'error with api dn_send_otp')
            })
    }


    return (
        <AuthContext.Provider value={{
            userToken, fetching, setFetching, isFirstLaunch, setIsFirstLaunch, appData, setAppData, BaseUrl,
            login: async (email, password, navigation) => {
                console.log(email, password, 'username,password entered are')
                setLoading(true)
                var form = new FormData()
                form.append('email', email)
                form.append('password', password)

                await axios.post(BaseUrl + "/login", form, {
                    headers: { "Content-type": "multipart/form-data" }
                })
                    .then((response) => {
                        console.log(response.data, 'customer_login Api successful')

                        setLoading(false)
                        if (response.data.status === 200) {
                            setUserDetails(response.data)

                            setUserToken(response.data.accessToken)

                            AsyncStorage.setItem('userToken', response.data.accessToken)

                        }
                        else if (response.data.status === 400) {
                            sendOtp(email)
                            navigation.navigate('Otp', { email: email })


                        }
                        else {
                            setMessage(response.data.message)
                            setFetching({ type: 'setError', value: { heading: " Error !", data: response.data.message } })


                        }
                    })
                    .catch((error) => {
                        setMessage('Network issue.')
                        setFetching({ type: 'setError', value: { heading: " Error !", data: `${error}` } })

                        console.log(error, 'error while fetching Api')
                        setLoading(false)
                    })

            },





            register: async (email, name, mobile, password, navigation) => {
                console.log(email, password, 'username,password entered are')
                setLoading(true)
                var form = new FormData()
                form.append('email', email);
                form.append('name', name);
                form.append('mobile', mobile);
                form.append('password', password);
                // form.append('c_password', c_password);
                console.log(email, name, password, mobile)

                // form.append('platform', 1);
                await axios.post(BaseUrl + "/signup", form, {
                    headers: { "Content-type": "multipart/form-data" }
                })
                    .then((response) => {
                        console.log(response.data, 'customer_signup Api successful')
                        setLoading(false)
                        if (response.data.status === 200) {
                            setFetching({ type: 'setsuccess', value: { heading: " Success !", data: response.data.message } })
                            setUserDetails(response.data)

                            navigation.navigate('Otp', { email: email })
                        }

                        else if (response.data.status == 400) {
                            console.log(response.data.status, '400')
                            setFetching({ type: 'setError', value: { heading: " Error !", data: response.data.message } })

                        }

                        else {
                            // setFetching({ type: 'setError', value: { heading: " Error !", data: response.data.message } })
                            console.log(response.data.status, 'else')

                            setMessage(response.data.msg)
                        }
                    })
                    .catch((error) => {
                        setMessage('Network issue.')
                        setFetching({ type: 'setError', value: { heading: " Error !", data: 'Network Issue' } })

                        console.log(error, 'error while fetching Api')
                        setLoading(false)
                    })
            },
            changePwd: async (old_psw, new_psw,) => {
                console.log(old_psw, new_psw)
                setLoading(true)
                var form = new FormData()
                form.append('old_psw', old_psw)
                form.append('new_psw', new_psw)
                await axios.post(BaseUrl + "/change-password", form, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((response) => {
                        console.log(response.data, 'customer change Password Api successful')
                        setLoading(false)
                        if (response.data.status === 200) {
                            // setUserDetails(response.data.msg)

                            console.log(new_psw, 'Sucess')
                            setFetching({ type: 'setSuccess', value: { heading: " Success !", data: response.data.message } })



                        }
                        else {
                            // setFetching({ type: 'setError', value: { heading: " Error !", data: response.data.msg } })

                            // setMessage(response.data.msg)
                        }
                    })
                    .catch((error) => {
                        setMessage('Network issue.')
                        setFetching({ type: 'setError', value: { heading: " Error !", data: `${error}` } })

                        console.log(error, 'error while fetching Api')
                        // setLoading(false)
                    })

            },
            verifyOtp: async (email, otp,) => {
                console.log(email, otp, 'email,mobile entered are')
                setLoading(true)

                var form = new FormData()
                form.append('email', email);
                form.append('otp', otp);
                await axios.post(BaseUrl + "/verify-otp", form, {
                    headers: { "Content-type": "multipart/form-data" }
                })
                    .then((response) => {
                        console.log(response.data, 'verify-otp Api successful')
                        setLoading(false)
                        if (response.data.status === 200) {
                            // setUserToken(userDetails.cust_id)
                            AsyncStorage.setItem('userToken', response.data.accessToken)

                        }
                        else {
                            setMessage(response.data.message)
                            
                            setFetching({ type: 'setError', value: { heading: " Error !", data: response.data.error } })


                        }
                    })
                    .catch((error) => {
                        setMessage('Network issue.')
                        console.log(error, 'error while fetching tr_verify_otp Api')
                        setLoading(false)
                    })
            },

               

            logout: async () => {
                try {
                    setFetching({ type: 'setLoading', value: true })
                    await AsyncStorage.getItem('userToken').then((value) => console.log(value, 'is being logged out'))
                    await AsyncStorage.removeItem('userToken')
                    setUserToken(null)
                    setFetching({ type: 'setLoading', value: false })
                }
                catch (e) {
                    console.log(e)
                    setFetching({ type: 'setLoading', value: false })
                }
            },



        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }

// generate new debug.keystore ---
    // keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
    // see sha1 key --
    // keytool -exportcert -keystore ./android/app/debug.keystore -list -v