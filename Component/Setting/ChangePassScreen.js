import {
    View, Text,
    TextInput, TouchableOpacity,
    ToastAndroid
} from "react-native";
import React, { useState } from "react";
import Feather from 'react-native-vector-icons/Feather';
import styles from '../../Styles/Setting/UpdateItemScreen.style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';

const ChangePassScreen = ({ route, navigation }) => {
    const [infoLogin, setinfoLogin] = useState({});
    const [oldValue, setoldValue] = useState('');
    const [newValue, setnewValue] = useState('');
    const [newValueRP, setnewValueRP] = useState('');
    Moment.locale('en');

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
            }
        } catch (error) {
            // console.error(error);
        }
    }

    const GetNewValue = () => {
        let formData = {
            tenTaiKhoan: infoLogin.tenTaiKhoan,
            email: infoLogin.email,
            sdt: infoLogin.sdt,
            gioiThieu: infoLogin.gioiThieu,
            sinhNhat: infoLogin.sinhNhat,
            queQuan: infoLogin.queQuan,
            matKhau: infoLogin.matKhau,
            anhDaiDien: infoLogin.anhDaiDien,
            anhBia: infoLogin.anhBia,
            arr_BaiViet: infoLogin.arr_BaiViet,
            arr_AnBaiViet: infoLogin.arr_AnBaiViet,
            arr_TheoDoi: infoLogin.arr_TheoDoi,
            arr_NguoiTheoDoi: infoLogin.arr_NguoiTheoDoi,
            arr_HoiNhom: infoLogin.arr_HoiNhom
        };

        return formData;
    }

    const UpdateAccount = () => {
        // console.log(infoLogin._id);
        let url_api = 'https://backend-munnect-104-716a330c6634.herokuapp.com/NguoiDung/ThayDoiMatKhau/' + infoLogin._id + '?matKhauCu=' + oldValue;
        let formData = GetNewValue();

        if (oldValue == '' && oldValue != infoLogin.matKhau) {
            ToastAndroid.show('Mật khẩu cũ sai!', ToastAndroid.SHORT);
            return;
        }

        if (newValue != '' && newValue == newValueRP) {
            formData.matKhau = newValue;
        } else {
            ToastAndroid.show('Mật khẩu nhập lại không trùng!', ToastAndroid.SHORT);
            return;
        }

        fetch(url_api, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(async (res) => {
                // console.log(res);
                if (res.status == 200) {
                    const json = await res.json();
                    if (json.success == true) {
                        ToastAndroid.show('Thay đổi mật khẩu thành công!', ToastAndroid.SHORT);
                        navigation.goBack();
                    } 
                } 
            })
            .catch((e) => {
                // console.log(e);
            });
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            GetInfoLogin();
        });

        return unsubscribe;
    }, [navigation]);


    return (
        <View style={styles.container}>
            <View style={styles.viewItemUpdate}>
                <Text style={styles.txtTitle}>Mật khẩu cũ:</Text>
                <View style={styles.viewValue}>
                    <Feather name="chevron-right" size={22} />
                    <TextInput style={styles.txtValue} placeholder='Mật khẩu cũ' onChangeText={(txt) => { setoldValue(txt) }} value={oldValue} secureTextEntry={true}/>
                </View>

                <Text style={styles.txtTitle}>Mật khẩu mới:</Text>
                <View style={styles.viewValue}>
                    <Feather name="chevron-right" size={22} />
                    <TextInput style={styles.txtValue} placeholder='Mật khẩu mới' onChangeText={(txt) => { setnewValue(txt) }} value={newValue}  secureTextEntry={true}/>
                </View>

                <Text style={styles.txtTitle}>Nhập lại mật khẩu mới:</Text>
                <View style={styles.viewValue}>
                    <Feather name="chevron-right" size={22} />
                    <TextInput style={styles.txtValue} placeholder='Mật khẩu mới' onChangeText={(txt) => { setnewValueRP(txt) }} value={newValueRP}  secureTextEntry={true}/>
                </View>
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => { navigation.goBack(); }}>
                    <Text style={styles.btnBack}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{ marginLeft: 15 }} onPress={UpdateAccount}>
                    <Text style={styles.btnUpdate}>Thay đổi</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default ChangePassScreen;
