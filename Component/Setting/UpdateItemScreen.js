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
import DateTimePicker from '@react-native-community/datetimepicker';

const UpdateItemScreen = ({ route, navigation }) => {
    const [infoLogin, setinfoLogin] = useState({});
    const [oldValue, setoldValue] = useState('');
    const [newValue, setnewValue] = useState('');
    const [dateValue, setdateValue] = useState(new Date());
    const [isShowDatePicker, setisShowDatePicker] = useState(false);
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
                GetOldValue(json.data.listNguoiDung[0]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const GetOldValue = async (info) => {
        try {
            switch (route.params.title1) {
                case "Tên":
                    setoldValue(info.tenTaiKhoan);
                    break;

                case 'Email':
                    setoldValue(info.email);
                    break;

                case 'Số điện thoại':
                    setoldValue(info.sdt);
                    break;

                case 'Giới thiệu':
                    setoldValue(info.gioiThieu);
                    break;

                case 'Sinh nhật':
                    setoldValue(Moment(info.sinhNhat).format('MMM DD/YYYY'));
                    setnewValue('Chọn ngày..');
                    break;

                case 'Quê quán':
                    setoldValue(info.queQuan);
                    break;

                default:
                    setoldValue('Giá trị cũ');
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onChange = (e, selectedDate) => {
        const currentDate = selectedDate;
        setisShowDatePicker(false);
        console.log(currentDate.toLocaleString());
        setnewValue(Moment(currentDate).format('MMM DD/YYYY'));
        setdateValue(currentDate);
    };

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

        try {
            switch (route.params.title1) {
                case "Tên":
                    formData.tenTaiKhoan = newValue;
                    break;

                case 'Email':
                    formData.email = newValue;
                    break;

                case 'Số điện thoại':
                    formData.sdt = newValue;
                    break;

                case 'Giới thiệu':
                    formData.gioiThieu = newValue;
                    break;

                case 'Sinh nhật':
                    formData.sinhNhat = dateValue.toLocaleString();
                    break;

                case 'Quê quán':
                    formData.queQuan = newValue;
                    break;

                default:
                    break;
            }
            return formData;
        } catch (error) {
            console.error(error);
        }
    }

    const UpdateAccount = () => {
        let url_api = 'https://backend-munnect-104-716a330c6634.herokuapp.com/NguoiDung/CapNhatThongTin/' + infoLogin._id;
        let formData = GetNewValue();

        fetch(url_api, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(formData)
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

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            GetInfoLogin();
        });

        return unsubscribe;
    }, [navigation]);


    return (
        <View style={styles.container}>
            <View style={styles.viewItemUpdate}>
                <Text style={styles.txtTitle}>{route.params.title1} cũ:</Text>
                <View style={styles.viewValue}>
                    <Feather name="chevron-right" size={22} />
                    <Text style={[styles.txtValue, { color: 'rgba(0, 0, 0, 0.65)' }]} numberOfLines={2}>{oldValue}</Text>
                </View>

                <Text style={styles.txtTitle}>{route.params.title1} mới:</Text>
                <View style={styles.viewValue}>
                    <Feather name="chevron-right" size={22} />
                    {
                        (route.params.title1 == 'Sinh nhật')
                            ?
                            <TouchableOpacity style={styles.txtValue} onPress={() => { setisShowDatePicker(true); }}>
                                <Text style={{ fontSize: 20 }}>{newValue}</Text>
                            </TouchableOpacity>
                            : <TextInput style={styles.txtValue} placeholder='Giá trị mới' onChangeText={(txt) => { setnewValue(txt) }} value={newValue} />
                    }
                </View>
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => { navigation.goBack(); }}>
                    <Text style={styles.btnBack}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{ marginLeft: 15 }} onPress={UpdateAccount}>
                    <Text style={styles.btnUpdate}>Cập nhật</Text>
                </TouchableOpacity>
            </View>

            {isShowDatePicker && (
                <DateTimePicker
                    value={dateValue}
                    mode={'date'}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </View>
    )
}
export default UpdateItemScreen;
