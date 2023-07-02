import {
    Text, TextInput, View, Button,
    TouchableHighlight, Alert
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Login/FPassScreen.styles';

const ForgetPassScreen = (props) => {
    const [taiKhoan, settaiKhoan] = useState('');
    const [email, setemail] = useState('')
    const [isSelected, setSelection] = useState(false);

    const GetPass = () => {
        if (taiKhoan.length == 0) {
            Alert.alert('Lỗi rồi', 'Bạn chưa nhập tài khoản');
            return;
        }
        if (email.length == 0) {
            Alert.alert('Lỗi rồi', 'Bạn chưa nhập email xác minh');
            return;
        }

        let url_api_user = 'https://backend-munnect-104-716a330c6634.herokuapp.com/api';
        fetch(url_api_user)
            .then((res) => {
                return res.json();
            })
            .then((arr_user) => {
                arr_user.data.forEach((row) => {

                    if (taiKhoan == row.taiKhoan) {
                        if (email == row.email) {
                            Alert.alert('Chúc mừng bạn!', 'Mật khẩu của tài khoản ' + row.taiKhoan + ' là: ' + row.matKhau);
                        }
                        else {
                            Alert.alert('Lỗi rồi', 'Sai email');
                            return;
                        }
                    }
                    else {
                        Alert.alert('Lỗi rồi', 'Không tồn tại tài khoản này');
                        return;
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <View style={styles.container}>

            <View style={styles.container2}>
                <Text></Text>
            </View>

            <Text style={styles.nameLogo}>Lấy lại mật khẩu</Text>
            <Text style={styles.note}>Vui lòng nhập chính xác</Text>
            <Text style={styles.note}>tên tài khoản và email của bạn để tiếp tục</Text>


            <View style={styles.viewInput}>
                <TextInput style={styles.txtInput} placeholder="Tên tài khoản của bạn" onChangeText={(txt) => { settaiKhoan(txt) }} />
                <TextInput style={styles.txtInput} placeholder="Email của bạn" onChangeText={(txt) => { setemail(txt) }} />


            </View>


            <TouchableHighlight style={styles.btnGetPass} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={GetPass}>
                <Text style={styles.txtGetPass}>Tiếp tục</Text>
            </TouchableHighlight>

            <View style={{ flexDirection: "row", margin: 20 }}>
                <Text style={{ fontSize: 19 }}>Bạn nhớ ra mật khẩu?</Text>
                <TouchableHighlight underlayColor={'#e3cac8'} activeOpacity={0.5} onPress={() => { props.navigation.navigate('LoginScreen') }}>
                    <Text style={styles.txtLogin}>Đăng nhập</Text>
                </TouchableHighlight>

            </View>


        </View>

    )
}

export default ForgetPassScreen;