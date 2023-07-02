import {
    Text, View,
    Dimensions,
    Image, ScrollView,
    TouchableOpacity,
    ToastAndroid
} from "react-native"
import React, { useState, useLayoutEffect } from "react";
import styles from '../../Styles/Account/AccScreen.styles';
import Moment from 'moment';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AutoHeightImage from "react-native-auto-height-image";

const PreviewAccount = ({ route, navigation }) => {
    const [infoLogin, setinfoLogin] = useState(route.params.infoLogin);
    const [pickedAvatar, setpickedAvatar] = useState("");
    const [pickedWallpaper, setpickedWallpaper] = useState("");
    const [uriAvatar, seturiAvatar] = useState({});
    const [uriWallpaper, seturiWallpaper] = useState({});
    Moment.locale('en');

    const GetInfoLogin = async () => {
        try {
            const response = await fetch(
                'https://backend-munnect.herokuapp.com/NguoiDung/DanhSach',
            );
            const json = await response.json();
            setinfoLogin(json.data.listNguoiDung[0]);
        } catch (error) {
            console.error(error);
        }
    }

    const PickingImage = async (type) => {
        let result;
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
                    if (type == 'imageWallpaper') {
                        setpickedWallpaper(uriBase64);
                        seturiWallpaper({ uri: fileUri, name: fileName, type: 'multipart/form-data' });
                    }
                    if (type == 'imageAvatar') {
                        setpickedAvatar(uriBase64);
                        seturiAvatar({ uri: fileUri, name: fileName, type: 'multipart/form-data' });
                    }
                }
            );
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={saveImage}>
                    <Text style={{ fontSize: 21, color: '#148A4F' }}>Lưu</Text>
                </TouchableOpacity>
            ),
        });
    });

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            // GetInfoLogin();
            if (route.params.typePicked == 'avatar') {
                setpickedAvatar(route.params.pickedBase64);
                seturiAvatar(route.params.pickedImage);
                setpickedWallpaper(infoLogin.anhBia);
            } else {
                setpickedWallpaper(route.params.pickedBase64);
                seturiWallpaper(route.params.pickedImage);
                setpickedAvatar(infoLogin.anhDaiDien);
            }
        });

        return unsub;
    }, [navigation]);

    function saveImage() {
        // let url_api = 'https://backend-munnect.herokuapp.com/NguoiDung/CapNhatAnh/' + infoLogin._id;
        let url_api = 'https://backend-munnect-104-716a330c6634.herokuapp.com/NguoiDung/CapNhatAnh/' + infoLogin._id;
        let formData = new FormData();
        formData.append('tenTaiKhoan', infoLogin.tenTaiKhoan);
        formData.append('email', infoLogin.email);
        formData.append('matKhau', infoLogin.matKhau);
        formData.append('sdt', infoLogin.sdt);
        formData.append('gioiThieu', infoLogin.gioiThieu);
        formData.append('queQuan', infoLogin.queQuan);
        formData.append('sinhNhat', infoLogin.sinhNhat);
        formData.append('anhDaiDien', infoLogin.anhDaiDien);
        formData.append('anhBia', infoLogin.anhBia);
        formData.append('arr_BaiViet', infoLogin.arr_BaiViet);
        formData.append('arr_AnBaiViet', infoLogin.arr_AnBaiViet);
        formData.append('arr_TheoDoi', infoLogin.arr_TheoDoi);
        formData.append('arr_NguoiTheoDoi', infoLogin.arr_NguoiTheoDoi);
        formData.append('arr_HoiNhom', infoLogin.arr_HoiNhom);

        var arr_Image = [];
        var soloAva = 0;
        var soloWall = 0;
        if (infoLogin.anhDaiDien != pickedAvatar && pickedAvatar != "" ) {
            console.log("newAvatar");
            arr_Image[0] = uriAvatar;
        } else {
            console.log("oldAvatar");
            formData.append('solo', 'wallpaper');
            soloAva = 1;
        }

        if (infoLogin.anhBia != pickedWallpaper && pickedWallpaper != "") {
            console.log("newWallpaper");
            arr_Image[1] = uriWallpaper;
        } else {
            console.log("oldWallpaper");
            formData.append('solo', 'avatar');
            soloWall = 1;
        }

        if (soloAva == 1 && soloWall == 1) {
            formData.append('solo', 'double');
        }

        for (let i = 0; i < arr_Image.length; i++) {
            formData.append('anhTaiLen', arr_Image[i]);
        }

        fetch(url_api, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
                'content-type': 'multipart/form-data',
            },
            body: formData
        })
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    ToastAndroid.show('Cập nhật tài khoản thành công!', ToastAndroid.SHORT);
                    navigation.goBack();
                } else {
                    ToastAndroid.show('Cập nhật tài khoản thất bại!', ToastAndroid.SHORT);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 20 }}>
                    <View>
                        {
                            (pickedWallpaper == "")
                                ?
                                <Image source={require('../../assets/images/upload-image-ui.png')}
                                    style={styles.imageWallpapar} />
                                :
                                <Image source={{ uri: String(pickedWallpaper) }}
                                    style={styles.imageWallpapar} />
                        }
                        <TouchableOpacity onPress={() => PickingImage('imageWallpaper')} activeOpacity={0.5}
                            style={[styles.buttonPickImage, { right: 5, top: 5 }]}>
                            <MaterialIcons name="camera-alt" size={20} />
                        </TouchableOpacity>
                        <View style={styles.viewAvatar}>
                            <View>
                                {
                                    (pickedAvatar == "")
                                        ?
                                        <Image source={require('../../assets/images/upload-image-ui.png')}
                                            style={styles.imageAvatar} />
                                        :
                                        <Image source={{ uri: String(pickedAvatar) }}
                                            style={styles.imageAvatar} />
                                }
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
                                <View style={styles.viewInfoItem}>
                                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{infoLogin.arr_TheoDoi.length}</Text>
                                    <Text style={styles.infoText}>Đang theo dõi</Text>
                                </View>
                                <View style={styles.viewInfoItem}>
                                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{infoLogin.arr_NguoiTheoDoi.length}</Text>
                                    <Text style={styles.infoText}>Người theo dõi</Text>
                                </View>
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
                                {
                                    (pickedAvatar == "")
                                        ?
                                        <Image source={require('../../assets/images/upload-image-ui.png')}
                                            style={styles.imageAvatarNP} />
                                        :
                                        <Image source={{ uri: String(pickedAvatar) }}
                                            style={styles.imageAvatarNP} />
                                }
                                <Text style={styles.textHint}>Bạn muốn nói gì?</Text>
                            </View>
                            <Image source={require('../../assets/images/addImage.png')}
                                style={{ width: 35, height: 35 }} />
                        </View>

                        <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />
                        <View style={styles.viewOther}>
                            <AutoHeightImage source={require('../../assets/images/blogs.png')}
                                width={(Dimensions.get("window").width * 75) / 100} />
                            <Text style={styles.textHint}>Đang tải bài viết..</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default PreviewAccount;