voimport React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, PixelRatio, TextInput, Image, ScrollView, ImageBackground, Dimensions, FlatList } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { AuthContext } from '../../navigation/AuthProvider'
import BaseScreen from '../../components/BaseScreen'
import Input from '../../components/Input'
import Button from '../../components/Button'
import moment from 'moment/moment'
import axios from 'react-native-axios'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'


const themeColor = '#F5CF04'

const HomeScreen = ({ navigation }) => {
    return (
        <BaseScreen
            logo={
                <View style={{ left: 65 }}>

                    <Text style={styles.username}>Hii David</Text>
                    <Text style={styles.user}>Let make your Order attractive.</Text>

                </View>

            }
            renderChild={Content({ navigation })} navigation={navigation} leftButton={'menu'} paddingTop={false} paddingHorizontal={true}
            rightButton={
                <TouchableOpacity onPress={() => { navigation.navigate('Notifications') }}>
                    <Ionicons name="ios-notifications-outline" color={'#555'} size={25} />

                </TouchableOpacity>} />
    )
}


const Content = ({ navigation }) => {

    const { BaseUrl, appData, userDetails, userToken } = useContext(AuthContext)

    console.log(userToken)
    const activeColor = "#F5CF04"
    const [category, setCategory] = useState()
    const [popular, setPopular] = useState()
    const [Recommended, setRecommended] = useState()


    const [search, setSearch] = useState('')


    const getCategory = async () => {

        let form = new FormData()

        await axios.get(BaseUrl + '/categories', form, {
            headers: { "Content-type": "multipart/form-data" }

        })
            .then((response) => {
                console.log(response.data, 'Categories')
                if (response.data.status === 200) {

                    setCategory(response.data.categories)
                }
            })
            .catch((error) => {
                // setMessage('Network issue.')
                console.log(error, 'error while fetching getcart api')
                // setLoading(false)
            })
    }
    const getPopular = async () => {

        let form = new FormData()

        await axios.get(BaseUrl + '/products/popular', form, {
            headers: { "Content-type": "multipart/form-data" }

        })
            .then((response) => {
                console.log(response.data, 'Popular')
                if (response.data.status === 200) {

                    setPopular(response.data.popular_products)
                }
            })
            .catch((error) => {
                // setMessage('Network issue.')
                console.log(error, 'error while fetching getcart api')
                // setLoading(false)
            })
    }
    const getrecommended = async () => {

        let form = new FormData()

        await axios.get(BaseUrl + '/products/recommanded', form, {
            headers: { "Content-type": "multipart/form-data" }

        })
            .then((response) => {
                console.log(response.data, 'Popular')
                if (response.data.status === 200) {

                    setRecommended(response.data.recommanded_products)
                }
            })
            .catch((error) => {
                // setMessage('Network issue.')
                console.log(error, 'error while fetching getcart api')
                // setLoading(false)
            })
    }


    useEffect(() => {
        getCategory()
        getPopular()
        getrecommended()
    }, [])


    const renderitem = ({ item }) => {
        return (



            <TouchableOpacity
                onPress={() => navigation.navigate('PopularItem', { header: item.name, productid: item.id })}

                style={{
                    alignSelf: "center",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 8,
                    // left: 4,
                    // right: 4,
                    width: '90%',
                    paddingHorizontal: 8,
                    marginTop: 10,
                    // height: PixelRatio.getPixelSizeForLayoutSize(60),
                    marginBottom: 15,
                    marginHorizontal: 10,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    borderColor: '#fcfcfc',
                    elevation: 5,

                    shadowColor: '#000',

                    // for ios below 
                    shadowOffset: { width: 5, height: 5 }
                }}
            >
                <Image source={{ uri: item.banner }} style={{
                    height: 139,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    width: 140
                }} />
                <Text style={[styles.subHeading, { marginTop: 6, fontSize: 14 }]}>{item.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', left: 10, }}>
                        <FontAwesome5 name='rupee-sign' color={'#000'} size={12} />
                        <Text style={[styles.subHeading1, { fontSize: 12, color: '#252525', fontWeight: '500', fontFamily: 'Montserrat', }]}>{item.price}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', right: 10 }}>
                        <FontAwesome name='star' color={'#F2E900'} size={16} />
                        <Text style={[styles.subHeading1, { fontSize: 16, color: '#252525', fontWeight: '600', fontFamily: 'Montserrat', left: 2, }]}>4.7</Text>
                    </View>

                </View>


            </TouchableOpacity>





        )
    }


    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}
        // justifyContent='center'
        >
            <TouchableOpacity 
            onPress={()=>{navigation.navigate('Search')}}
            style={{ flexDirection: 'row', alignItems: "center", backgroundColor: '#f4f4f4', alignSelf: 'center', width: '100%', paddingHorizontal: 10, paddingVertical: 12, borderRadius: 10 }} >
                <MaterialIcons name='search' size={20} color={'#000'} />
                <Text placeholder='Search' placeholderTextColor={'#000'} style={{ paddingLeft: 10, width: '90%' }} >
                    Search</Text>
            </TouchableOpacity>

            <View style={{ width: '100%', backgroundColor: "#ffbc2d", borderRadius: 10, marginTop: 20, }}>
                <View style={{}}>
                    <Text style={{ color: '#fff', fontSize: 30, left: 20, marginTop: 20 }}>30% Discount</Text>


                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                    <Text style={{ textAlign: 'left', color: '#fff', left: 10, width: '60%', marginTop: 35 }}>Lorem  ipsum  ipsum dolor sit amet, consectetur adipiscing elit. Interdum sed augue cursus parturient. Ut imperdiet integer cras elit elementum. Ac lobortis ac. </Text>
                    <Image
                        style={{ height: 200, width: 135, }}
                        source={require('../../assets/images/boy.png')}

                    />
                </View>





            </View>

            <Text style={{ paddingTop: 15, color: '#000', fontSize: 16, fontWeight: '600', left: 10 }}>Category</Text>


            <ScrollView horizontal={true} style={{}} showsHorizontalScrollIndicator={false}>
                {category ? category.map((item, index) =>
                    <TouchableOpacity key={index} style={styles.cardWrapper}
                        onPress={() => navigation.navigate('Details', { header: item.name, category_id: item.id })}

                    >
                        <Image source={{ uri: item.icon }} style={styles.cardImg} />
                        <Text style={[styles.subHeading, { marginTop: 15, fontSize: 12 }]}>{item.name}</Text>
                    </TouchableOpacity>
                ) : null}


            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 0 }}>
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', left: 10 }}>Popular</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Popular')}>
                    <Text style={{ color: '#ffbc2d', right: 10 }}>View All</Text>
                </TouchableOpacity>
            </View>


            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={popular}
                renderItem={renderitem}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 0 }}>
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', left: 10 }}>Recommended</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Recommended')}>
                    <Text style={{ color: '#ffbc2d', right: 10 }}>View All</Text>
                </TouchableOpacity>
            </View>



            <ScrollView style={{ marginTop: 10, marginBottom: 0 }}>

                {Recommended ? Recommended.map((item, index) =>

                    <TouchableOpacity key={index}
                        onPress={() => navigation.navigate('PopularItem', { header: item.name, tabbtn: 3 })}

                        style={{
                            // alignSelf: "center",
                            display: 'flex',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            paddingVertical: 8,
                            // left: 4,
                            flexDirection: 'row',
                            // right: 4,
                            width: '95%',
                            paddingHorizontal: 12,
                            marginTop: 5,
                            // height: PixelRatio.getPixelSizeForLayoutSize(60),
                            marginBottom: 15,
                            marginHorizontal: 10,
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            borderColor: '#fcfcfc',
                            elevation: 5,

                            shadowColor: '#000',

                            // for ios below 
                            shadowOffset: { width: 5, height: 5 }
                        }}>


                        <View>
                            <Image source={{ uri: item.banner, }} style={{
                                width: 95,
                                height: 94,
                                borderRadius: 10,


                            }} />
                        </View>
                        <View style={{ marginBottom: 20, left: 10, top: 10 }} >

                            <Text style={[styles.subHeading1, { fontSize: 14, color: '#000', fontWeight: '400', fontFamily: 'Robotp', top: 0 }]}>{item.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', top: 5 }}>
                                <FontAwesome5 name='rupee-sign' color={'#000'} />
                                <Text style={[styles.subHeading1, { fontSize: 14, color: '#252525', fontWeight: '600', fontFamily: 'Montserrat', }]}>{item.price}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', right: 0, top: 5 }}>
                                <FontAwesome name='star' color={'#F2E900'} size={16} />
                                <Text style={[styles.subHeading1, { fontSize: 16, color: '#252525', fontWeight: '600', fontFamily: 'Montserrat', left: 2, }]}>4.7</Text>
                            </View>
                        </View>


                    </TouchableOpacity>


                ) : null}
            </ScrollView>



        </ScrollView>

    )
}

export default HomeScreen

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
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6),
        color: '#000',
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
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 10,
        left: 10,
        // width: '48%',
        // height: PixelRatio.getPixelSizeForLayoutSize(60),
        // marginBottom: 15,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        // borderRadius: 8,
        // borderColor: '#fcfcfc',
        // elevation: 3,
        // shadowColor: '#000',
        // for ios below 
        // shadowOffset: { width: 5, height: 5 }
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
    cardImg: {
        width: 70,
        height: 70,
        alignItems: 'center',
        // left: 20

    },
    username: {
        color: '#000',
        // marginTop: 25,
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'SF Pro Text',
        // left: 15
    },
    user: {
        color: '#000',

        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'SF Pro Text',
        // left: 22
    },


})