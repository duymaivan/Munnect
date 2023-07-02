import {
    Image, Text,
    TouchableOpacity,
    TouchableHighlight,
    View, Dimensions,
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Posts/PostScreen.styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from 'moment';

import AutoHeightImage from 'react-native-auto-height-image';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';

const ItemPost = (row) => {
    const [baiViet, setbaiViet] = useState(row.post);
    var nguoiDung = baiViet.idNguoiDung;
    const [srcAvatar, setsrcAvatar] = useState({ uri: String(nguoiDung.anhDaiDien) });
    const [arr_dongTinh, setarr_dongTinh] = useState(baiViet.arr_dongTinh);
    const [arr_phanDoi, setarr_phanDoi] = useState(baiViet.arr_phanDoi);
    const [arr_binhLuan, setarr_binhLuan] = useState(baiViet.arr_binhLuan);
    const [myTuongTac, setmyTuongTac] = useState('none');
    var isGetInteract = true;
    Moment.locale('en');

    const GetPost = async () => {
        try {
            const response = await fetch(
                // 'https://backend-munnect.herokuapp.com/NguoiDung/DanhSach?inputID='+loginId,
                'https://backend-munnect-104-716a330c6634.herokuapp.com/BaiViet/DanhSach/' + baiViet._id,
            );
            const json = await response.json();
            setbaiViet(json.data.baiViet);
            setarr_dongTinh(json.data.baiViet.arr_dongTinh);
            setarr_phanDoi(json.data.baiViet.arr_phanDoi);
            setarr_binhLuan(json.data.baiViet.arr_binhLuan);
        } catch (error) {
            console.error(error);
        }
    }

    const GetInteract = async () => {
        try {
            const loginId = await AsyncStorage.getItem("idLogin");
            const response = await fetch(
                // 'https://backend-munnect.herokuapp.com/NguoiDung/DanhSach?inputID='+loginId,
                'https://backend-munnect-104-716a330c6634.herokuapp.com/BaiViet/TuongTac?idNguoiDung=' + loginId + '&&idBaiViet=' + baiViet._id,
            );
            const json = await response.json();
            setmyTuongTac(json.data.tuongTac);
            GetPost();
        } catch (error) {
            console.error(error);
        }
    }

    const SetInteract = async (type) => {
        try {
            const loginId = await AsyncStorage.getItem("idLogin");
            const response = await fetch(
                // 'https://backend-munnect.herokuapp.com/NguoiDung/DanhSach?inputID='+loginId,
                'https://backend-munnect-104-716a330c6634.herokuapp.com/BaiViet/TuongTac/TuongTacMoi?idNguoiDung=' + loginId + '&&idBaiViet=' + baiViet._id + '&&tuongTac=' + type,
            );
            const json = await response.json();
            setmyTuongTac(json.data.tuongTac);
            GetPost();
        } catch (error) {
            console.error(error);
        }
    }

    function OpenViewAccount() {
        if (row.info != undefined) {
            if (nguoiDung._id != row.info._id) {
                row.nav.navigate('ViewAccount', { infoAcc: nguoiDung });
            } else {
                row.openAcc();
            }
        }
    }

    function OpenDetail() {
        row.nav.navigate('DetailPost',
            { title: nguoiDung.tenTaiKhoan, post: baiViet, info: row.info });
    }

    React.useEffect(() => {
        if (row.isRefresh == true) {
            GetInteract();
            GetPost();
        } else {
            if (isGetInteract == true) {
                GetInteract();
                GetPost();
            }
        }
    }, [row.isRefresh]);

    return (
        <View>
            <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width * 85 / 100 }}>
                    <TouchableOpacity onPress={OpenViewAccount}>
                        <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error_image.jpg'))}
                            style={{ width: 50, height: 50, borderRadius: 50 }} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 7 }}>
                        <TouchableHighlight underlayColor={'#e1e6e4'} activeOpacity={0.6}
                            onPress={OpenViewAccount}>
                            <Text style={styles.textName} numberOfLines={2}>
                                {nguoiDung.tenTaiKhoan}
                            </Text>
                        </TouchableHighlight>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <EvilIcons name='clock' size={20} color={'rgba(0, 0, 0, 0.50)'} />
                            <Text style={{ color: 'rgba(0, 0, 0, 0.75)' }}>{Moment(baiViet.thoiGian).format('MMM DD/YYYY')}</Text>
                        </View>
                    </View>
                </View>
                {/* <TouchableOpacity activeOpacity={0.5} style={styles.buttonMore}
                    onPress={OpenDetail}>
                    <Feather name='more-horizontal' size={30} />
                </TouchableOpacity> */}
            </View>
            <TouchableOpacity activeOpacity={0.8}
                onPress={OpenDetail}>
                <View>
                    <Text style={{
                        margin: 10, fontSize: 20,
                        fontFamily: (String(baiViet.phongChu) == 'Default') ? "" : String(baiViet.phongChu)
                    }} numberOfLines={2}>
                        {baiViet.noiDung}</Text>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
                        <AutoHeightImage source={{ uri: baiViet.anhBaiViet }}
                            width={Dimensions.get('window').width} />
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>


            <View style={styles.viewBelowPost}>
                <View style={styles.viewRowCenterBetween}>
                    {
                        (myTuongTac == "Liked")
                            ?
                            <TouchableOpacity activeOpacity={0.6} onPress={() => SetInteract('none')}>
                                <Image source={require('../../assets/images/positive_color.png')}
                                    style={styles.buttonInteract} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity activeOpacity={0.6} onPress={() => SetInteract('Liked')}>
                                <Image source={require('../../assets/images/positive.png')}
                                    style={styles.buttonInteract} />
                            </TouchableOpacity>
                    }
                    <Text style={styles.textInteract}>{arr_dongTinh.length}</Text>
                    {
                        (myTuongTac == "Disliked")
                            ?
                            <TouchableOpacity activeOpacity={0.6} onPress={() => SetInteract('none')}>
                                <Image source={require('../../assets/images/negative_color.png')}
                                    style={styles.buttonInteract} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity activeOpacity={0.6} onPress={() => SetInteract('Disliked')}>
                                <Image source={require('../../assets/images/negative.png')}
                                    style={styles.buttonInteract} />
                            </TouchableOpacity>
                    }
                    <Text style={styles.textInteract}>{arr_phanDoi.length}</Text>
                </View>

                <View style={styles.viewRowCenterBetween}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => {
                        row.nav.navigate('DetailPost',
                            { title: nguoiDung.tenTaiKhoan, post: baiViet, info: row.info });
                    }}>
                        <Image source={require('../../assets/images/comment.png')}
                            style={styles.buttonInteract} />
                    </TouchableOpacity>
                    <Text style={styles.textInteract}>{arr_binhLuan.length}</Text>
                    <TouchableOpacity activeOpacity={0.6}>
                        <Image source={require('../../assets/images/share.png')}
                            style={styles.buttonInteract} />
                    </TouchableOpacity>
                    <Text style={styles.textInteract}>{baiViet.soLuongChiaSe}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />
        </View>
    )
}

export default ItemPost;