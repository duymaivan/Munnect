import {
    Text, TextInput,
    TouchableOpacity, Image, View,
    ToastAndroid,
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Login/LoginScreen.styles';
import Entypo from 'react-native-vector-icons/Entypo';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [inputEmail, setinputEmail] = useState('');
    const [inputPassword, setinputPassword] = useState('');
    const [isHide, setisHide] = useState(true);
    const [isSelected, setSelection] = useState(false);
    const onPress = () => {
        setSelection(!isSelected);
    };

    function checkValidate(inputObj) {
        var regEmail = /^(\w+@[a-zA-Z]+\.[a-zA-Z]{2,})$/;
        if (!inputObj.email.match(regEmail)) {
            ToastAndroid.show('Email chưa đúng định dạng!', ToastAndroid.SHORT);
            return false;
        }

        if (inputObj.matKhau == "") {
            ToastAndroid.show('Mật khẩu không được trống!', ToastAndroid.SHORT);
            return false;
        }

        return true;
    }

    const Login = () => {
        // let url_api = 'https://backend-munnect.herokuapp.com/NguoiDung/DangNhap?inputEmail=' + inputEmail;
        let url_api = 'https://backend-munnect-104-716a330c6634.herokuapp.com/NguoiDung/DangNhap?inputEmail=' + inputEmail;
        var inputObj = {
            email: inputEmail,
            matKhau: inputPassword
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
                if (res.status == 200) {
                    const json = await res.json();
                    if (json.success == true) {
                        ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.SHORT);
                        await AsyncStorage.setItem('idLogin', json.objData._id);
                        if (isSelected) {
                            await AsyncStorage.setItem('isLogin', 'true');
                        }
                        navigation.navigate('HomeScreen');
                        setinputEmail('');
                        setinputPassword('');
                    } else {
                        console.log(json.message);
                        ToastAndroid.show('Đăng nhập thất bại!', ToastAndroid.SHORT);
                        ToastAndroid.show(json.message, ToastAndroid.SHORT);
                    }
                } else {
                    ToastAndroid.show('Đăng nhập thất bại!', ToastAndroid.SHORT);
                }
            })
            .catch((e) => {
                console.log(e);
            });

    }

    return (
        <View style={styles.container} >

            <View style={styles.container2}>
                <Text></Text>
            </View>

            <Text style={styles.nameLogo}>MUNNECT</Text>
            <Text style={styles.txtIntro}>Vui lòng đăng nhập {'\n'}để tiếp tục</Text>
            <View style={styles.viewInput}>
                <TextInput style={styles.txtInput} placeholder="Email.." onChangeText={(txt) => { setinputEmail(txt) }} value={inputEmail} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput style={styles.txtInput} placeholder="Mật khẩu.." secureTextEntry={isHide} onChangeText={(txt) => { setinputPassword(txt) }} value={inputPassword} />
                    <TouchableOpacity activeOpacity={0.5} underlayColor={'#c2f0ce'} style={{ position: 'absolute', right: 30, top: '33%' }}
                        onPress={() => {
                            setisHide(!isHide);
                        }} >
                        {isHide
                            ?
                            <Entypo name="eye" size={28} />
                            :
                            <Entypo name="eye-with-line" size={28} />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.viewRemember}>
                    <View style={styles.viewRow}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TouchableOpacity onPress={onPress}>
                                <View style={styles.viewCheckBox}>
                                    {isSelected
                                        ? <Image source={require('../../assets/images/checkBox.png')} />
                                        : <View />}
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.textRemem}>Giữ đăng nhập</Text>
                        </View>
                    </View>
                    <TouchableOpacity underlayColor={'#daeff5'} activeOpacity={0.5} onPress={() => { navigation.navigate('ForgetPassScreen') }}>
                        <Text style={styles.textForget}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <TouchableOpacity style={styles.btnLogin} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={Login}>
                <Text style={styles.txtLogin}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRegist} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={() => { navigation.navigate('RegistScreen') }}>
                <Text style={styles.txtRegist}>Tạo tài khoản mới</Text>
            </TouchableOpacity>

        </View>

    )
}

export default LoginScreen;
