import React, { useContext, useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import Feather from 'react-native-vector-icons/dist/Feather'



import { AuthContext } from '../navigation/AuthProvider'
import { useDebugValue } from 'react'
import axios from 'react-native-axios'

// import AsyncStorage from '@react-native-async-storage/async-storage';


const iconColor = '#F5CF04'
const fontSize = 24

const DrawerContent = (props) => {

    const { navigation } = props
    const [name, setName] = useState()
    const [mobile, setMobile] = useState()

    const { user, userToken, userDetails, userType, setUserToken, mainBalance, BaseUrl, logout, stores, setStores } = useContext(AuthContext)

    // const getDetails = async () => {

    //     let form = new FormData()

    //     form.append("cust_id", userToken)

    //     await axios.post(BaseUrl + "/get_customer_details", form, {
    //         headers: { "Content-type": "multipart/form-data" }
    //     })
    //         .then((response) => {
    //             console.log(response.data, 'subject api')
    //             if (response.data.status === 200) {
    //                 // setProfile(response.data.msg)

    //                 setName(response.data.msg.cust_name)
    //                 setMobile(response.data.msg.cust_mobile)


    //             }
    //         })
    //         .catch((error) => {

    //             console.log(error, 'error while fetching getcart api')

    //         })
    // }


    // useEffect(() => {
    //     getDetails();
    // }, [])

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.userContent}>
                    <View style={styles.profileDetailsRow}>
                        <View style={styles.imgWrapper}>
                            {/* {
                                userDetails.avatar ?
                                    <Image source={{ uri: userDetails.avatar }} style={styles.profileImg}></Image>
                                    : null
                            } */}
                            <MaterialIcons name='person-outline' size={44} color={'#B0ACAC'} style={{ position: 'absolute', zIndex: 1 }}></MaterialIcons>
                        </View>
                        <View style={styles.detailWrapper}>
                            <Text style={styles.userName}>User Name</Text>

                            <TouchableOpacity style={[styles.settingsBtn, { width: 150, height: 20, paddingLeft: 0, marginBottom: 0 }]}
                                onPress={() => {
                                    navigation.navigate("EditProfile")
                                }}>
                                <Text style={[styles.solidBtnTxt, { color: '#F5CF04', marginLeft: 0, fontWeight: '500' }]}>nitin@techninza.in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: '#fff' }}>
                    <DrawerItem
                        style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                        labelStyle={{ fontFamily: "Roboto-Medium", }}
                        icon={({ color, size, focused }) => (
                            <MaterialIcons name="person" color={'#555'} size={fontSize} />
                        )}
                        label="My Profile"
                        onPress={() => { navigation.navigate('Profile') }}>
                    </DrawerItem>
                    <DrawerItem
                        style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                        labelStyle={{ fontFamily: "Roboto-Medium", }}
                        icon={({ color, size, focused }) => (
                            <EvilIcons name="calendar" color={'#555'} size={fontSize} />
                        )}
                        label="My Order"
                        onPress={() => { navigation.navigate('Bookings') }}>
                    </DrawerItem>
                    <DrawerItem
                        style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                        labelStyle={{ fontFamily: "Roboto-Medium", }}
                        icon={({ color, size, focused }) => (
                            <AntDesign name="contacts" color={'#555'} size={fontSize} />
                        )}
                        label="Contact Us"
                        onPress={() => { navigation.navigate('Contact') }}>
                    </DrawerItem>
                    <DrawerItem
                        style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                        labelStyle={{ fontFamily: "Roboto-Medium", }}
                        icon={({ color, size, focused }) => (
                            <Ionicons name="ios-notifications-outline" color={'#555'} size={fontSize} />
                        )}
                        label="Notification"
                        onPress={() => { navigation.navigate('Notifications') }}>
                    </DrawerItem>
                    <DrawerItem
                        style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                        labelStyle={{ fontFamily: "Roboto-Medium", }}
                        icon={({ color, size, focused }) => (
                            <Feather name="help-circle" color={'#555'} size={fontSize} />
                        )}
                        label="Help & Support"
                        onPress={() => { navigation.navigate('Contact') }}>
                    </DrawerItem>

                    <DrawerItem
                        style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                        labelStyle={{ fontFamily: "Roboto-Medium", }}
                        icon={({ color, size, focused }) => (
                            <MaterialIcons name="privacy-tip" color={'#555'} size={fontSize} />
                        )}
                        label="Term"
                        onPress={() => { navigation.navigate('Term') }}>
                    </DrawerItem>
                </View>

            </DrawerContentScrollView>

            <DrawerItem
                // style={{ borderBottomWidth: 0, borderBottomColor: '#fff' }}
                labelStyle={{ fontFamily: "Roboto-Medium", }}
                icon={({ color, size }) => (
                    <MaterialCommunityIcons name="exit-to-app"
                        color={color}
                        size={fontSize} />
                )}
                label="Sign Out"
                onPress={() => logout()}
            >
            </DrawerItem>
            <Text style={styles.version}>Version 1.0</Text>
        </View>

    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    userContent: {
        display: 'flex',
        // justifyContent:'center',
        alignItems: 'center',
        top: 0,
        paddingTop: 0,
        paddingLeft: 15,
        marginBottom: 30,
        // borderWidth:1,
        backgroundColor: '#FFF8EA'
    },
    profileDetailsRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        marginBottom: 15,
        // borderWidth: 1,
    },
    imgWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#aaa',
        width: 70,
        height: 70,
        borderRadius: 35,
        position: 'relative'
    },
    profileImg: {
        // resizeMode: 'contain',
        width: 65,
        height: 65,
        zIndex: 2,
        borderRadius: 35
    },

    detailWrapper: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 20,
        justifyContent: 'center',

        // alignItems: 'center',
        // borderWidth: 1,
    },
    userName: {
        fontSize: 16,
        color: '#000',
        fontFamily: "Roboto-Bold",
    },
    solidBtnTxt: {
        fontSize: 14,
        color: '#000',
        marginLeft: 15,
        fontFamily: "Roboto-Medium",
    },
    version: {
        fontSize: 12,
        color: '#ccc',
        marginLeft: 20,
        fontFamily: "Roboto-Medium",
        // textAlign:'center'
    }
})
