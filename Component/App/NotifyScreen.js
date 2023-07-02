import {
    Text, View,
    Dimensions,
    ScrollView,
    Image,
    TouchableHighlight,
    ToastAndroid
} from "react-native"
import React, { useState, useEffect } from "react";
import styles from '../../Styles/NotifyScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import AutoHeightImage from "react-native-auto-height-image";
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const NotifyScreen = (route) => {
    const [arr_notifi, setarr_notifi] = useState({});
    const [isSelected, setisSelected] = useState(true);
    const [infoLogin, setinfoLogin] = useState(route.infoLogin);
    const [isRefresh, setisRefresh] = useState(true);
    Moment.locale('en');

    const GetListNoti = async () => {
        try {
            const loginId = await AsyncStorage.getItem("idLogin");
            const response = await fetch(
                'https://backend-munnect-104-716a330c6634.herokuapp.com/ThongBao/DanhSach?idNguoiDung=' + loginId,
            );
            const json = await response.json();
            setarr_notifi(json.data.listThongBao);
            setisSelected(false);
        } catch (error) {
            console.error(error);
        }
    }

    const ItemNotifi = (row) => {
        var notifi = row.notifi;
        var chuBaiViet = notifi.idChuBaiViet;

        async function OpenDetail() {
            try {
                const response = await fetch(
                    // 'https://backend-munnect.herokuapp.com/NguoiDung/DanhSach?inputID='+loginId,
                    'https://backend-munnect-104-716a330c6634.herokuapp.com/BaiViet/DanhSach/' + notifi.idBaiViet,
                );
                const json = await response.json();
                if (json.data.baiViet != null) {
                    row.nav.navigate('DetailPost',
                    { title: chuBaiViet.tenTaiKhoan, post: json.data.baiViet, info: infoLogin });
                } else {
                    ToastAndroid.show('Bài viết không tồn tại!', ToastAndroid.SHORT);
                }
            } catch (error) {
                console.log("Get");
                console.error(error);
            }
        }

        return (
            <View>
                {
                    (chuBaiViet != {})
                        ?
                        <View style={styles.viewRowCenter}>
                            <Image source={{ uri: String(chuBaiViet.anhDaiDien) }} style={styles.avatar} />
                            <TouchableHighlight underlayColor={'#e1e6e4'} activeOpacity={0.6}
                                onPress={OpenDetail}>
                                <View style={styles.viewContent}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.textName}>
                                            {chuBaiViet.tenTaiKhoan}
                                        </Text>
                                        <Text style={{ fontSize: 18 }}>{notifi.tieuDeTB}</Text>
                                    </View>
                                    <Text style={styles.contentText} numberOfLines={2}>{String(notifi.noiDungTB)} </Text>
                                    <View style={styles.viewInfoItem}>
                                        <EvilIcons name='clock' size={23} color={'rgba(0, 0, 0, 0.50)'} />
                                        <Text style={styles.timeText}>{Moment(notifi.thoiGianTB).format('MMM DD/YYYY')}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                        : ""
                }
            </View>
        )
    }

    React.useEffect(() => {
        if (route.refreshing == false) {
            if (route.selected == true) {
                console.log("select");
                setinfoLogin(route.infoLogin);
                GetListNoti();
                route.settabNum([2, false]);
            }
            setisRefresh(false);
        } else {
            console.log("refresh");
            setinfoLogin(route.infoLogin);
            GetListNoti();
            setisRefresh(true);
        }
    }, [route.refreshing]);

    return (
        <View style={styles.container}>
            {
                (isSelected == true)
                    ?
                    <View style={styles.viewOther}>
                        <AutoHeightImage source={require('../../assets/images/blogs.png')}
                            width={(Dimensions.get("window").width * 75) / 100} />
                        <Text style={styles.textHint}>Đang tải thông báo..</Text>
                    </View>
                    :
                    <ScrollView>
                        <View style={{ flex: 1, width: '100%' }}>
                            {
                                (arr_notifi.length > 0)
                                    ?
                                    arr_notifi.map((notifi, index, arr) => {
                                        return <ItemNotifi notifi={notifi} key={index} nav={route.nav} isRefresh={isRefresh} />
                                    })
                                    :
                                    <View style={styles.viewOther}>
                                        <AutoHeightImage source={require('../../assets/images/no_post.png')}
                                            width={(Dimensions.get("window").width * 75) / 100} />
                                        <Text style={styles.textHint}>Không có thông báo nào..</Text>
                                    </View>
                            }
                        </View>
                    </ScrollView>
            }
        </View>
    )
}

export default NotifyScreen;