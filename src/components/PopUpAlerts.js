import { StyleSheet, Text, View, TouchableOpacity, Pressable,Modal } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../navigation/AuthProvider'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import * as Animatable from 'react-native-animatable'


const Popup = ({ popUp, setPopUp, heading, type, data, onPress }) => {

    const PopupType = {
        'success': <MaterialIcons name="check-circle" color='#2a2' size={80} style={{ marginBottom: 8 }} />,
        'info': <MaterialIcons name="info" color='#22a' size={80} style={{ marginBottom: 8 }} />,
        'warning': <MaterialIcons name="warning" color='#ebcb15' size={80} style={{ marginBottom: 8 }} />,
        'error': <MaterialIcons name="error" color='#f00' size={80} style={{ marginBottom: 8 }} />
    }

    const PopupColor = {
        'success': '#2a2',
        'info': '#22a',
        'warning': '#ebcb15',
        'error': '#f00'
    }

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={popUp ? true : false}
        onRequestClose={() => {
            onPress()
        }}
    >
        <View style={styles.container}>
            <Pressable style={[styles.backdrop]} onPress={() => onPress()} />

            <View style={styles.popUpBox}>
                <Animatable.View animation="bounceIn" iterationCount={1} duration={200} delay={10}>
                    {PopupType[type]}
                </Animatable.View>
                <Text style={styles.headingStyle}>{heading}</Text>
                <Text style={styles.txt}>{data}</Text>
            </View>
        </View>
    </Modal>
    )
}

export default Popup

const styles = StyleSheet.create({
    container: {
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, bottom: 0,
        flex: 1,
        backgroundColor: '#0009',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // iOSBackdrop: {
    //     backgroundColor: "#000000",
    //     opacity: 0.3
    // },
    // androidBackdrop: {
    //     backgroundColor: "#232f34",
    //     opacity: 0.32
    // },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    popUpBox: {
        backgroundColor: '#fff',
        position: 'absolute',
        top: 150,
        minWidth: '80%',
        // minHeight: 200,
        paddingVertical: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginHorizontal: 15,
        // paddingTop: 30,
        borderRadius: 8
    },
    headingStyle: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
        color: '#000',
        fontFamily: "Poppins-SemiBold",
    },
    txt: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 5,
        color: '#555',
        fontFamily: "Poppins-Regular",
    },
    solidBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        marginVertical: 15,
        borderRadius: 8,
        backgroundColor: '#f33',
    },
    solidBtnTxt: {
        fontSize: 16,
        color: '#fff',
        fontFamily: "Poppins-SemiBold",
    },
})