import {
    Text, View,
    Dimensions,
    Image, ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    Button
} from "react-native"
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Account/AccScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AutoHeightImage from "react-native-auto-height-image";
import ItemPost from "../Posts/ItemPost";

const MyAccount = (route) => {
    const [arr_post, setarr_post] = useState({});
    const [isSelected, setisSelected] = useState(true);
    const [infoLogin, setinfoLogin] = useState(route.infoLogin);
    const [isRefresh, setisRefresh] = useState(true);
    const [srcAvatar, setsrcAvatar] = useState({ uri: String(infoLogin.anhDaiDien) });
    const [srcWallpaper, setsrcWallpaper] = useState({ uri: String(infoLogin.anhBia) });
    Moment.locale('en');

    function OpenNewPost() {
        if (infoLogin != {}) {
            route.nav.navigate('NewPost', { infoLogin: infoLogin, pickedBase64: "", pickedImage: {} });
        }
    }

    function OpenListAcc(type) {
        if (type == 'following') {
            route.nav.navigate('ListAccount', { title: 'Đang theo dõi', infoAcc: infoLogin });
        } else {
            route.nav.navigate('ListAccount', { title: 'Người theo dõi', infoAcc: infoLogin });
        }
    }

    const GetListPost = async () => {
        try {
            const loginId = await AsyncStorage.getItem("idLogin");
            const response = await fetch(
                'https://backend-munnect.herokuapp.com/BaiViet/DanhSach?idNguoiDung=' + loginId,
            );
            const json = await response.json();
            setarr_post(json.data.listBaiViet);
            setisSelected(false);
        } catch (error) {
            console.error(error);
        }
    }

    const PickingImage = async (type) => {
        let result;
        console.log(type);
        if (type == 'imagePost') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
            });
        }
        if (type == 'imageWallpaper') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [2, 1],
                quality: 1,
            });
        }
        if (type == 'imageAvatar') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [1, 1],
                allowsEditing: true,
                quality: 1,
            });
        }

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
                    if (type == 'imagePost') {
                        route.nav.navigate('NewPost', { infoLogin: infoLogin, pickedBase64: uriBase64, pickedImage: dataImage });
                    }
                    if (type == 'imageWallpaper') {
                        route.nav.navigate('PreviewAccount', { title: 'Xem trước ảnh', infoLogin: infoLogin, pickedBase64: uriBase64, pickedImage: dataImage, typePicked: 'wallpaper' });
                    }
                    if (type == 'imageAvatar') {
                        route.nav.navigate('PreviewAccount', { title: 'Xem trước ảnh', infoLogin: infoLogin, pickedBase64: uriBase64, pickedImage: dataImage, typePicked: 'avatar' });
                    }
                }
            );
        }
    };

    React.useEffect(() => {
        if (route.refreshing == false) {
            if (route.selected == true) {
                console.log("select");
                setinfoLogin(route.infoLogin);
                GetListPost();
                // GetInfoLogin();
                route.settabNum([1, false]);
            }
            setisRefresh(false);
        } else {
            console.log("refresh");
            setinfoLogin(route.infoLogin);
            setisRefresh(true);
            GetListPost();
        }
    }, [route.refreshing]);

    return (
        <View style={styles.container}>
            <View>
                <Image source={srcWallpaper} onError={() => setsrcWallpaper(require('../../assets/images/error_image.jpg'))}
                    style={styles.imageWallpapar} />
                <TouchableOpacity onPress={() => PickingImage('imageWallpaper')} activeOpacity={0.5}
                    style={[styles.buttonPickImage, { right: 5, top: 5 }]}>
                    <MaterialIcons name="camera-alt" size={20} />
                </TouchableOpacity>
                <View style={styles.viewAvatar}>
                    <View>
                        <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error_image.jpg'))}
                            style={styles.imageAvatar} />
                        <TouchableOpacity onPress={() => PickingImage('imageAvatar')} activeOpacity={0.5}
                            style={[styles.buttonPickImage, { right: 2, bottom: 2 }]}>
                            <MaterialIcons name="camera-alt" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* View thông tin */}
            <View>
                <Text style={styles.textName} numberOfLines={2}>
                    {String(infoLogin.tenTaiKhoan)}
                </Text>
                <View style={styles.viewInfo}>
                    <View>
                        <View style={styles.viewInfoItem}>
                            <Entypo name="location" size={17} color={'background: rgba(0, 0, 0, 0.6);'} />
                            <Text style={styles.infoText}>{String(infoLogin.queQuan)}</Text>
                        </View>
                        <View style={styles.viewInfoItem}>
                            <Image source={require('../../assets/images/birthday-cake.png')} style={styles.imageInfoItem} />
                            <Text style={styles.infoText}>{Moment(infoLogin.sinhNhat).format('MMM DD/YYYY')}</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.viewInfoItem} onPress={() => OpenListAcc('following')}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>
                                {
                                    (infoLogin.arr_TheoDoi != undefined)
                                        ? infoLogin.arr_TheoDoi.length
                                        : 0
                                }
                            </Text>
                            <Text style={styles.infoText}>Đang theo dõi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.viewInfoItem} onPress={() => OpenListAcc('follower')}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>
                                {
                                    (infoLogin.arr_NguoiTheoDoi != undefined)
                                        ? infoLogin.arr_NguoiTheoDoi.length
                                        : 0
                                }
                            </Text>
                            <Text style={styles.infoText}>Người theo dõi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.viewIntro}>
                    <Text style={styles.textTitle}>
                        Giới thiệu
                    </Text>
                    <Text style={styles.textIntro}>
                        {String(infoLogin.gioiThieu)}
                    </Text>
                </View>
            </View>

            {/* View bài viết */}
            <View style={styles.container}>
                <Text style={styles.textTitle}>
                    Bài viết
                </Text>
                <View style={styles.viewNewPost}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error_image.jpg'))}
                            style={styles.imageAvatarNP} />
                        <TouchableHighlight underlayColor={'#b0ebc1'} onPress={OpenNewPost} activeOpacity={0.5}>
                            <Text style={styles.textHint}>Bạn muốn nói gì?</Text>
                        </TouchableHighlight>
                    </View>

                    <TouchableHighlight underlayColor={'#b0ebc1'} onPress={() => PickingImage('imagePost')} activeOpacity={0.5}>
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
                                        return <ItemPost post={post} key={index} nav={route.nav} isRefresh={isRefresh} />
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
            </View>
        </View>
    )
}

export default MyAccount;