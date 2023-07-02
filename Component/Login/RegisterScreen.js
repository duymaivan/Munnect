import {
    Text, TextInput, View,
    ToastAndroid, TouchableOpacity
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Login/RegisScreen.styles';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegistScreen = ({navigation}) => {
    const [inputEmail, setinputEmail] = useState('');
    const [inputUsername, setinputUsername] = useState('');
    const [inputPassword, setinputPassword] = useState('');
    const [inputCPassword, setinputCPassword] = useState('');
    const [inputDate, setinputDate] = useState('Chọn ngày sinh nhật..');
    const [dateValue, setdateValue] = useState(new Date());
    const [isShowDatePicker, setisShowDatePicker] = useState(false);
    Moment.locale('en');

    function checkValidate(inputObj) {
        var regEmail = /^(\w+@[a-zA-Z]+\.[a-zA-Z]{2,})$/;
        var regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).{8,}/;
        if (!inputObj.email.match(regEmail)) {
            ToastAndroid.show('Email chưa đúng định dạng!', ToastAndroid.SHORT);
            return false;
        }

        if (inputObj.tenTaiKhoan == "") {
            ToastAndroid.show('Tên tài khoản không được trống!', ToastAndroid.SHORT);
            return false;
        }

        if (!inputObj.matKhau.match(regPass)) {
            ToastAndroid.show('Mật khẩu chưa đúng định dạng!', ToastAndroid.SHORT);
            ToastAndroid.show('Mật khẩu phải dài ít nhất 8 ký tự và chứa ít nhất một số, chữ cái viết thường, chữ viết hoa và ký tự đặc biệt!', ToastAndroid.LONG);
            return false;
        }

        if (inputObj.matKhau != inputCPassword) {
            ToastAndroid.show('Mật khẩu nhập lại không trùng!', ToastAndroid.SHORT);
            return false;
        }

        if (inputDate == "Chọn ngày sinh nhật..") {
            ToastAndroid.show('Sinh nhật chưa được chọn!', ToastAndroid.SHORT);
            return false;
        }

        if (inputDate != "Chọn ngày sinh nhật..") {
            var y = new Date().getFullYear() - dateValue.getFullYear();
            if (y >= 16) {
                var m = new Date().getMonth() - dateValue.getMonth();
                if (m >= 0) {
                    var d = new Date().getDate() - dateValue.getDate();
                    if (d >= 0) {
                        return true;
                    } else {
                        ToastAndroid.show('Bạn phải hơn 16 tuổi để đăng ký!', ToastAndroid.SHORT);
                        return false;
                    }
                } else {
                    ToastAndroid.show('Bạn phải hơn 16 tuổi để đăng ký!', ToastAndroid.SHORT);
                    return false;
                }
            } else {
                ToastAndroid.show('Bạn phải hơn 16 tuổi để đăng ký!', ToastAndroid.SHORT);
                return false;
            }
        }

        return true;
    }

    function Register() {
        // let url_api = 'https://backend-munnect.herokuapp.com/NguoiDung/DangKy';
        let url_api = 'https://backend-munnect-104-716a330c6634.herokuapp.com/NguoiDung/DangKy';
        var inputObj = {
            tenTaiKhoan: inputUsername,
            email: inputEmail,
            matKhau: inputPassword,
            sinhNhat: dateValue.toString()
        }
        if (checkValidate(inputObj) == false) {
            return;
        }

        fetch(url_api, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(inputObj)
        })
            .then(async (res) => {
                const json = await res.json();
                if (res.status == 201) {
                    if (json.success == true) {
                        ToastAndroid.show('Đăng ký tài khoản thành công!', ToastAndroid.SHORT);
                        navigation.goBack();
                    }
                } else {
                    ToastAndroid.show('Đăng ký thất bại!', ToastAndroid.SHORT);
                    ToastAndroid.show(json.message, ToastAndroid.SHORT);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const onChange = (e, selectedDate) => {
        const currentDate = selectedDate;
        setisShowDatePicker(false);
        console.log(currentDate.toLocaleString());
        setinputDate(Moment(currentDate).format('MMM DD/YYYY'));
        setdateValue(currentDate);
    };

    return (
        <View style={styles.container}>

            <View style={styles.container2}>
                <Text></Text>
            </View>

            <Text style={styles.nameRegist}>Đăng kí tài khoản</Text>
            <Text style={styles.txtIntro}>Vui lòng nhập chính xác thông tin !!!</Text>
            <View style={styles.viewInput}>
                <TextInput style={styles.txtInput} placeholder="Email.." value={inputEmail}
                    onChangeText={(txt) => { setinputEmail(txt) }} />
                <TextInput style={styles.txtInput} placeholder="Tên tài khoản.." value={inputUsername}
                    onChangeText={(txt) => { setinputUsername(txt) }} />
                <TextInput style={styles.txtInput} placeholder="Mật khẩu.." value={inputPassword} secureTextEntry={true}
                    onChangeText={(txt) => { setinputPassword(txt) }} />
                <TextInput style={styles.txtInput} placeholder="Nhập lại mật khẩu.." value={inputCPassword} secureTextEntry={true}
                    onChangeText={(txt) => { setinputCPassword(txt) }} />
                <TouchableOpacity style={styles.txtInput} onPress={() => { setisShowDatePicker(true); }}>
                    <Text style={styles.txtDate}>{inputDate}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnRegist} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={Register}>
                <Text style={styles.txtRegist}>Đăng kí</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", margin: 20 }}>
                <Text style={{ fontSize: 19, color: '#403E3E' }}>Bạn đã có tài khoản?</Text>
                <TouchableOpacity underlayColor={'#e3cac8'} activeOpacity={0.5} onPress={() => { navigation.navigate('LoginScreen') }}>
                    <Text style={styles.txtLogin}>Đăng nhập</Text>
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

export default RegistScreen;
