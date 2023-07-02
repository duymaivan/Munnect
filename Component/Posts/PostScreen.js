import {
    Image, ScrollView,
    Text, TouchableOpacity,
    TouchableHighlight, View,
    Dimensions, SafeAreaView
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Posts/PostScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AutoHeightImage from 'react-native-auto-height-image';
import ItemPost from './ItemPost';


const PostScreen = (route) => {
    const [arr_post, setarr_post] = useState({});
    const [isSelected, setisSelected] = useState(true);
    const [infoLogin, setinfoLogin] = useState(route.infoLogin);
    const [isRefresh, setisRefresh] = useState(true);
    const [srcAvatar, setsrcAvatar] = useState({ uri: String(route.infoLogin.anhDaiDien) });

    function OpenNewPost() {
        if (infoLogin != {}) {
            route.nav.navigate('NewPost', { infoLogin: infoLogin, pickedBase64: "", pickedImage: {} });
        }
    }

    function OpenAccount() {
        route.settabNum([1, true]);
    }

    const GetInfoLogin = async () => {
        try {
            const loginId = await AsyncStorage.getItem("idLogin");
            if (loginId !== null) {
                const response = await fetch(
                    // 'https://backend-munnect.herokuapp.com/NguoiDung/DanhSach?inputID='+loginId,
                    'https://backend-munnect-104-716a330c6634.herokuapp.com/NguoiDung/DanhSach?inputID=' + loginId,
                );
                const json = await response.json();
                setinfoLogin(json.data.listNguoiDung[0]);
                setsrcAvatar({ uri: String(json.data.listNguoiDung[0].anhDaiDien) });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const GetListPost = async () => {
        setarr_post([]);
        try {
            const response = await fetch(
                // 'https://backend-munnect.herokuapp.com/BaiViet/DanhSach',
                'https://backend-munnect-104-716a330c6634.herokuapp.com/BaiViet/DanhSach',
            );
            const json = await response.json();
            setarr_post(json.data.listBaiViet);
            setisSelected(false);
            console.log(arr_post);
        } catch (error) {
            console.error(error);
        }
    }

    const PickingImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            let fileUri = result.assets[0].uri;
            let fileName = fileUri.split('/').pop();
            let imageType = fileUri.substring(fileUri.lastIndexOf(".") + 1);

            let match = /\.(\w+)$/.exec(fileName);
            let fileType = match ? `image/${match[1]}` : `image`;

            FileSystem.readAsStringAsync(fileUri, { encoding: "base64" }).then(
                (res) => {
                    let uriBase64 = "data:image/" + imageType + ";base64," + res;
                    var dataImage = { uri: fileUri, name: fileName, type: "multipart/form-data" };
                    route.nav.navigate('NewPost', { infoLogin: infoLogin, pickedBase64: uriBase64, pickedImage: dataImage });
                }
            );
        }
    };

    React.useEffect(() => {
        if (route.refreshing == false) {
            if (route.selected == true) {
                console.log("select");
                GetInfoLogin();
                GetListPost();
                route.settabNum([0, false]);
            }
            setisRefresh(false);
        } else {
            console.log("refresh");
            setisSelected(true);
            GetListPost();
            setinfoLogin(route.infoLogin);
            setisRefresh(true);
            route.settabNum([0, false]);
        }
    }, [route.refreshing]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewNewPost}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity underlayColor={'#b0ebc1'} onPress={OpenAccount} activeOpacity={0.5}>
                        <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error_image.jpg'))}
                            style={styles.imageAvatar} />
                    </TouchableOpacity>
                    <TouchableHighlight underlayColor={'#b0ebc1'} onPress={OpenNewPost} activeOpacity={0.5}>
                        <Text style={styles.textHint}>Bạn muốn nói gì?</Text>
                    </TouchableHighlight>
                </View>

                <TouchableHighlight underlayColor={'#b0ebc1'} onPress={PickingImage} activeOpacity={0.5}>
                    <Image source={require('../../assets/images/addImage.png')}
                        style={{ width: 35, height: 35 }} />
                </TouchableHighlight>
            </View>
            <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />
            {
                (isSelected == true)
                    ?
                    <View style={styles.viewOther}>
                        <AutoHeightImage source={require('../../assets/images/blogs.png')}
                            width={(Dimensions.get("window").width * 75) / 100} />
                        <Text style={styles.textHint}>Đang tải bài viết..</Text>
                    </View>
                    :
                    <ScrollView>
                        {
                            (arr_post.length > 0)
                                ?
                                arr_post.map((post, index, arr) => {
                                    return <ItemPost post={post} key={index} nav={route.nav}
                                        info={infoLogin} openAcc={OpenAccount} isRefresh={isRefresh} />
                                })
                                :
                                <View style={styles.viewOther}>
                                    <AutoHeightImage source={require('../../assets/images/no_post.png')}
                                        width={(Dimensions.get("window").width * 75) / 100} />
                                    <Text style={styles.textHint}>Không có bài viết nào..</Text>
                                </View>
                        }
                    </ScrollView>
            }

        </SafeAreaView>
    )
}

export default PostScreen;