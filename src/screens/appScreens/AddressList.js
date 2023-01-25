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


const AddressList = ({ navigation, route }) => {

    return (
        <BaseScreen
            title={'Address List'}
            renderChild={Content({ navigation, route })} navigation={navigation} leftButton={true} paddingTop={true}
            paddingHorizontal={true}
        />
    )
}


const Content = ({ navigation, route }) => {

    const { BaseUrl, appData, userDetails, userToken } = useContext(AuthContext)

    const activeColor = "#F5CF04"
    const [address, setaddress] = useState()

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
    }, [])



    return (
        <View style={styles.contentScroll}
        // justifyContent='center'
        >

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <Text style={[styles.input, { fontSize: 16, fontWeight: '400' }]}>Add Address</Text> */}
                {address ? address.map((item, index) =>
                    <TouchableOpacity key={index}

                        style={styles.addressWrapper} >

                        <View  >

                            <Text style={{ color: '#000', fontSize: 16, fontWeight: '500', fontFamily: 'Roboto', textAlign: "left", left: 4 }}

                            >H.No {item.house_no}, Street No. {item.street}, {item.landmark}, {item.town}, {item.state}, {item.pin_code}</Text>
                        </View>



                    </TouchableOpacity>

                ) : null}



            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', alignSelf: 'center', width: '100%' }}>
                <Button
                    title={'Add Address'}
                    onPress={() => { navigation.navigate('Address') }}
                />
            </View>
        </View>


    )
}

export default AddressList

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        flex: 1,
        position: 'relative',

    },

    addressWrapper: {
        alignSelf: 'center',
        display: 'flex', flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 5,
        marginBottom: 15,
        // height: 45,
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