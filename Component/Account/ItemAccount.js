import {
    ScrollView,
    Text, Image,
    View, TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import React, { useState, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../Styles/Account/ListAcc.styles';
import Moment from 'moment';

const ItemAccount = (row) => {
    var nguoiDung = row.nguoiDung;
    const [isFollowing, setisFollowing] = useState(false);
    const [displayFollow, setdisplayFollow] = useState('none');
    Moment.locale('en');

    async function OpenViewAccount() {
        const loginId = await AsyncStorage.getItem("idLogin");
        if (loginId != undefined) {
            if (nguoiDung._id != loginId) {
                row.nav.navigate('ViewAccount', { infoAcc: nguoiDung, });
            }
        }
    }

    React.useEffect( () => {
        if (row.isFocus == true) {
            GetFollow();
            SetDisplayFollow();
            row.setisFocus();
        }
    }, [row.isFocus]);

    const SetDisplayFollow = async () => {
        const loginId = await AsyncStorage.getItem("idLogin");
        if (nguoiDung._id != loginId) {
            setdisplayFollow('flex');
        }
    }

    const GetFollow = async () => {
        try {
            const loginId = await AsyncStorage.getItem("idLogin");
            const response = await fetch(
                // 'https://backend-munnect.herokuapp.com/NguoiDung/DanhSach?inputID='+loginId,
                'https://backend-munnect-104-716a330c6634.herokuapp.com/NguoiDung/TheoDoi/DanhSach?idAccount=' + nguoiDung._id + '&&idSelf=' + loginId,
            );
            const json = await response.json();
            if (json.data.trangThai == 'true') {
                setisFollowing(true);
            } else {
                setisFollowing(false);
            }
        } catch (error) {
            console.log("Get");
            console.error(error);
        }
    }

    const SetFollow = async (is) => {
        try {
            const loginId = await AsyncStorage.getItem("idLogin");
            const response = await fetch(
                // 'https://backend-munnect.herokuapp.com/NguoiDung/DanhSach?inputID='+loginId,
                'https://backend-munnect-104-716a330c6634.herokuapp.com/NguoiDung/TheoDoi/TheoDoiMoi?idSelf=' + loginId + '&&idAccount=' + nguoiDung._id + '&&isFollow=' + is,
            );
            const json = await response.json();
            console.log(json);
            if (json != undefined) {
                if (json.data.trangThai == 'true') {
                    setisFollowing(true);
                } else {
                    setisFollowing(false);
                }
            }
        } catch (error) {
            console.log("Set");
            console.error(error);
        }
    }

    return (
        <View style={styles.viewRowCenter}>
            <TouchableOpacity onPress={OpenViewAccount}>
                <Image source={{ uri: String(nguoiDung.anhDaiDien) }} style={styles.avatar} />
            </TouchableOpacity>
            <View>
                <TouchableHighlight underlayColor={'#e1e6e4'} activeOpacity={0.6}
                    onPress={OpenViewAccount}>
                    <Text style={styles.textName} numberOfLines={2}>
                        {nguoiDung.tenTaiKhoan}
                    </Text>
                </TouchableHighlight>
                <View style={styles.viewInfoItem}>
                    <Image source={require('../../assets/images/location.png')} style={styles.imageInfoItem} />
                    <Text style={styles.infoText}>{String(nguoiDung.queQuan)}</Text>
                </View>
                <View style={styles.viewInfoItem}>
                    <Image source={require('../../assets/images/birthday-cake.png')} style={styles.imageInfoItem} />
                    <Text style={styles.infoText}>{Moment(nguoiDung.sinhNhat).format('MMM DD/YYYY')}</Text>
                </View>
            </View>
            {
                (isFollowing == false)
                    ?
                    <TouchableOpacity style={[styles.buttonFollowing, { display: String(displayFollow) }]}
                        onPress={() => SetFollow('true')}>
                        <Text style={{ fontSize: 16, color: '#0C7F45', fontWeight: '500' }}>Theo dõi</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.buttonFollowing, { display: String(displayFollow) }]}
                        onPress={() => SetFollow('false')}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Đã theo dõi</Text>
                    </TouchableOpacity>
            }
        </View>
    )
}

export default ItemAccount;