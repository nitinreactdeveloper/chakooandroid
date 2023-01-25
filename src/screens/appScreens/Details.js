import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import axios from 'react-native-axios';
import { AuthContext } from "../../navigation/AuthProvider";

const Detail = ({ navigation }) => {
    const { BaseUrl } = useContext(AuthContext)
    const [category, setCategory] = useState()
    const getproduct = async () => {
        var data = new FormData()

        await axios.get(BaseUrl + `/single-product?id=5`, data, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                console.log(response.data)
                if (response.data.status === 200) {

                    setCategory(response.data.product)
                }
                else {
                    console.log(response.data.status)
                }

            })
            .catch((error) => {
                // console.log(error)
            })

    }

    useEffect(() => {
        getproduct()
        // console.log(category, 'category')
    })


    return (
        <View>
            <Text>Hello</Text>
            
        </View>
    )
}

export default Detail;