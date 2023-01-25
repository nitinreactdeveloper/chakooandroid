import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, AppState } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons'
import Term from '../screens/appScreens/Term';

import { AuthContext } from './AuthProvider';
import Location from '../screens/appScreens/Location';
import HomeScreen from '../screens/appScreens/HomeScreen';
import Profile from '../screens/appScreens/Profile'
import BookingDetails from '../screens/appScreens/BookingDetails';
import Popular from '../screens/appScreens/Popular';
import DrawerContent from '../components/DrawerContent';
import Notifications from '../screens/appScreens/Notifications';
import Contact from '../screens/appScreens/Contact';
import Recommended from '../screens/appScreens/Recommended';
// import EditLocker from '../screens/appScreens/EditLocker';
import PopularItem from '../screens/appScreens/PopularItem';
import Mybooking from '../screens/appScreens/MyBooking';
// import EditDateLocker from '../screens/appScreens/EditDateLocker';
import Category from '../screens/appScreens/category';
const { width, height } = Dimensions.get('window')
import BookingCancel from '../screens/appScreens/BookingCancel';
import Payment from '../screens/appScreens/Payments';
import Details from '../screens/appScreens/ProductDetails';
import ChangePassword from '../screens/authScreens/ChangePassword';
import Detail from '../screens/appScreens/Details';
import Address from '../screens/appScreens/Address';
import AddressList from '../screens/appScreens/AddressList';
import Search from '../screens/appScreens/Search';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const activeTabColor =
    '#F5CF04'
const nonActiveTabColor =
    '#C4C4C4'
const backgroundTabColor =
    '#fff'

const AppStack = () => {

    const { userToken, userDetails } = useContext(AuthContext)

    return (
        <Stack.Navigator initialRouteName={"BottomTab"}>
            <Stack.Screen
                name="BottomTab"
                component={BottomTabNav}
                options={{
                    headerShown: false,
                }}>
            </Stack.Screen>
            <Stack.Screen name="Category" component={Category} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="Recommended" component={Recommended} options={{ headerShown: false }} />
            <Stack.Screen name="Popular" component={Popular} options={{ headerShown: false }} />
            <Stack.Screen name="PopularItem" component={PopularItem} options={({ route }) => ({ title: route.params.header, headerShown: false })} />
            <Stack.Screen name="BookingDetails" component={BookingDetails} options={{ headerShown: false }} />
            <Stack.Screen name="BookingCancel" component={BookingCancel} options={{ headerShown: false }} />
            <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
            <Stack.Screen name="Term" component={Term} options={{ headerShown: false }} />
            <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
            <Stack.Screen name="Details" component={Details} options={({ route }) => ({
                title: route.params.header,
                headerTitleAlign: 'center'
            })} />
            <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
            <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
            <Stack.Screen name="AddressList" component={AddressList} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />





        </Stack.Navigator>
    )
}

export default AppStack

const DrawerNavigator = ({ navigation }) => (
    <Drawer.Navigator initialRouteName="Home"
        drawerContent={props => <DrawerContent{...props} />}
    >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
)

const BottomTabNav = ({ navigation }) => (
    <Tab.Navigator initialRouteName="Drawer"
        screenOptions={{
            keyboardHidesTabBar: true,
            showLabel: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                // position: 'absolute',
                // elevation: 5,
                backgroundColor: backgroundTabColor,
                borderTopWidth: 1,
                borderTopColor: "#f9f9f9",
                height: 60,
            }
        }}>
        <Tab.Screen name="Drawer" component={DrawerNavigator}
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons name="home" size={25}
                                color={focused ? activeTabColor : nonActiveTabColor}
                            ></MaterialIcons>
                            {focused ?
                                <Text style={{
                                    color: focused ? activeTabColor : nonActiveTabColor,
                                    fontSize: 12
                                }}>Home</Text>
                                : null}
                        </View>
                    )
                },
            }} />
        {/* <Tab.Screen name="Location" component={Location}
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <EvilIcons name="location" size={25}
                                color={focused ? activeTabColor : nonActiveTabColor}
                            ></EvilIcons>
                            {focused ?
                                <Text style={{
                                    color: focused ? activeTabColor : nonActiveTabColor,
                                    fontSize: 12
                                }}>Location</Text>
                                : null}
                        </View>
                    )
                },
            }} /> */}
        <Tab.Screen name="Bookings" component={Mybooking}
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <EvilIcons name="calendar" size={25}
                                color={focused ? activeTabColor : nonActiveTabColor}
                            ></EvilIcons>
                            {focused ?
                                <Text style={{
                                    color: focused ? activeTabColor : nonActiveTabColor,
                                    fontSize: 12
                                }}>Booking</Text>
                                : null}
                        </View>
                    )
                },
            }} />
        <Tab.Screen name="Notifications" component={Notifications}
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons name="message" size={25}
                                color={focused ? activeTabColor : nonActiveTabColor}
                            ></MaterialIcons>
                            {focused ?
                                <Text style={{
                                    color: focused ? activeTabColor : nonActiveTabColor,
                                    fontSize: 12
                                }}>Notifications</Text>
                                : null}
                        </View>
                    )
                },
            }} />
        <Tab.Screen name="Profile" component={Profile}
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons name="person" size={25}
                                color={focused ? activeTabColor : nonActiveTabColor}
                            ></MaterialIcons>
                            {focused ?
                                <Text style={{
                                    color: focused ? activeTabColor : nonActiveTabColor,
                                    fontSize: 12
                                }}>Profile</Text>
                                : null}
                        </View>
                    )
                },
            }} />
    </Tab.Navigator>
)


const styles = StyleSheet.create({})