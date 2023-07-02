import {
    Dimensions, ToastAndroid,
    Image, ScrollView,
    Text, TouchableHighlight,
    TouchableOpacity, View
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../Styles/Account/AccScreen.styles'
import AutoHeightImage from "react-native-auto-height-image";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';

const ListMyPost = ({ route, navigation }) => {
    const [arr_post, setarr_post] = useState({});
    const [isSelected, setisSelected] = useState(true);
    const [infoLogin, setinfoLogin] = useState(route.infoLogin);
    const [isRefresh, setisRefresh] = useState(true);

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

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            GetListPost();
        });

        return unsubscribe;
    }, [navigation]);

    const ItemMyPost = (row) => {
        var baiViet = row.post;
        var nguoiDung = baiViet.idNguoiDung;

        async function UpdatePost() {
            const loginId = await AsyncStorage.getItem("idLogin");
            if (loginId == nguoiDung._id) {
                if (typeof (baiViet.anhBaiViet) != 'undefined') {
                    row.nav.navigate('UpdatePost', { infoLogin: nguoiDung, pickedBase64: baiViet.anhBaiViet, pickedImage: {}, post: baiViet });
                } else {
                    row.nav.navigate('UpdatePost', { infoLogin: nguoiDung, pickedBase64: "", pickedImage: {}, post: baiViet });
                }
            }
        }

        async function DeletePost() {
            const loginId = await AsyncStorage.getItem("idLogin");
            let url_api = 'https://backend-munnect-104-716a330c6634.herokuapp.com/BaiViet/XoaBaiViet/' + baiViet._id;

            fetch(url_api, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.status == 203) {
                        ToastAndroid.show('Xóa bài viết thành công!', ToastAndroid.SHORT);
                        GetListPost();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        return (
            <View>
                <Text style={{ color: 'rgba(0, 0, 0, 0.75)', fontSize: 20, margin: 7 }}> - {Moment(baiViet.thoiGian).format('MMM DD/YYYY')}</Text>
                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width * 85 / 100, marginLeft: 15, alignItems: 'center' }}>
                    <Image source={{ uri: nguoiDung.anhDaiDien }}
                        style={{ width: 50, height: 50, borderRadius: 50 }} />
                    <View style={{ marginLeft: 7 }}>
                        <Text style={styles.textName} numberOfLines={2}>
                            {nguoiDung.tenTaiKhoan}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                            {/* <EvilIcons name='clock' size={20} color={'rgba(0, 0, 0, 0.50)'} /> */}
                            <FontAwesome5 name="map-pin" size={20} color={'rgba(0, 0, 0, 0.7)'}/>
                            <Text style={{ color: 'rgba(0, 0, 0, 0.75)', fontSize: 17, marginLeft: 5 }}>
                                {
                                    (baiViet.viTriBaiViet == 'personal')
                                    ? 'Cá nhân'
                                    : 'Hội nhóm'
                                }
                            </Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={{
                        margin: 15, fontSize: 20,
                        fontFamily: (String(baiViet.phongChu) == 'Default') ? "" : String(baiViet.phongChu)
                    }} numberOfLines={2}>
                        {baiViet.noiDung}</Text>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
                        <AutoHeightImage source={{ uri: baiViet.anhBaiViet }}
                            width={Dimensions.get('window').width} />
                    </TouchableOpacity>

                </View>
                <View style={{ height: 1, backgroundColor: '#D9D9D9' }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 15 }}>
                    <TouchableOpacity onPress={UpdatePost}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name="lead-pencil" size={27}/>
                            <Text style={{ fontSize: 20, marginLeft: 5 }}>Sửa bài viết</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={DeletePost}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name="eraser" size={28}/>
                            <Text style={{ fontSize: 20, marginLeft: 5 }}>Xóa bài viết</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{ height: 7, backgroundColor: '#D9D9D9' }} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                {
                    (isSelected == true)
                        ?
                        <View style={styles.viewOther}>
                            <AutoHeightImage source={require('../../assets/images/blogs.png')}
                                width={(Dimensions.get("window").width * 95) / 100} />
                            <Text style={styles.textHint}>Đang tải bài viết..</Text>
                        </View>
                        :
                        <View>
                            {
                                (arr_post.length > 0)
                                    ?
                                    arr_post.map((post, index, arr) => {
                                        return <ItemMyPost post={post} key={index} nav={navigation} isRefresh={isRefresh} />
                                    })
                                    :
                                    <View style={styles.viewOther}>
                                        <AutoHeightImage source={require('../../assets/images/no_post.png')}
                                            width={(Dimensions.get("window").width * 75) / 100} />
                                        <Text style={styles.textHint}>Không có bài viết nào..</Text>
                                    </View>
                            }
                        </View>
                }
            </ScrollView>
        </View>
    )
}
export default ListMyPost;