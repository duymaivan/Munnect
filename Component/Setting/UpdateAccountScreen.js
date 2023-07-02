import {
    View, Text,
    Image, TouchableOpacity
} from 'react-native';
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Styles/Setting/UpdateAccountScreen.style'
import Moment from 'moment';

const UpdateAccountScreen = ({ route, navigation }) => {
    const [infoLogin, setinfoLogin] = useState({});
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
            console.error(error);
        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            GetInfoLogin();
        });

        return unsubscribe;
    }, [navigation]);


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.viewItem} onPress={() => { navigation.navigate('UpdateItemScreen', { title: 'tên tài khoản', title1: 'Tên' }) }}>
                <View style={styles.viewItemName}>
                    <Image style={{ tintColor: '#52524f' }} source={require('../../assets/images/updateName.png')} />
                    <View style={styles.viewTxt}>
                        <Text style={styles.txtTitle}>Tên tài khoản</Text>
                        <Text style={styles.txtValue} numberOfLines={1}>{infoLogin.tenTaiKhoan}</Text>
                    </View>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={40} />
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableOpacity style={styles.viewItem} onPress={() => { navigation.navigate('UpdateItemScreen', { title: 'email', title1: 'Email' }) }}>
                <View style={styles.viewItemName}>
                    <Image source={require('../../assets/images/updateEmail.png')} />
                    <View style={styles.viewTxt}>
                        <Text style={styles.txtTitle}>Email</Text>
                        <Text style={styles.txtValue} numberOfLines={1}>{infoLogin.email}</Text>
                    </View>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={40} />
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableOpacity style={styles.viewItem} onPress={() => { navigation.navigate('UpdateItemScreen', { title: 'số điện thoại', title1: 'Số điện thoại' }) }}>
                <View style={styles.viewItemName}>
                    <Image source={require('../../assets/images/updatePhone.png')} />
                    <View style={styles.viewTxt}>
                        <Text style={styles.txtTitle}>Số điện thoại</Text>
                        <Text style={styles.txtValue} numberOfLines={1}>{infoLogin.sdt}</Text>
                    </View>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={40} />
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableOpacity style={styles.viewItem} onPress={() => { navigation.navigate('UpdateItemScreen', { title: 'giới thiệu', title1: 'Giới thiệu' }) }}>
                <View style={styles.viewItemName}>
                    <Image source={require('../../assets/images/updateDesc.png')} />
                    <View style={styles.viewTxt}>
                        <Text style={styles.txtTitle}>Giới thiệu</Text>
                        <Text style={styles.txtValue} numberOfLines={2}>{infoLogin.gioiThieu}</Text>
                    </View>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={40} />
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableOpacity style={styles.viewItem} onPress={() => { navigation.navigate('UpdateItemScreen', { title: 'sinh nhật', title1: 'Sinh nhật' }) }}>
                <View style={styles.viewItemName}>
                    <Image source={require('../../assets/images/updateDate.png')} />
                    <View style={styles.viewTxt}>
                        <Text style={styles.txtTitle}>Sinh nhật</Text>
                        <Text style={styles.txtValue} numberOfLines={1}>{Moment(infoLogin.sinhNhat).format('MMM DD/YYYY')}</Text>
                    </View>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={40} />
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableOpacity style={styles.viewItem} onPress={() => { navigation.navigate('UpdateItemScreen', { title: 'quê quán', title1: 'Quê quán' }) }}>
                <View style={styles.viewItemName}>
                    <Image style={{ tintColor: '#52524f' }} source={require('../../assets/images/updateLocation.png')} />
                    <View style={styles.viewTxt}>
                        <Text style={styles.txtTitle}>Quê quán</Text>
                        <Text style={styles.txtValue} numberOfLines={1}>{infoLogin.queQuan}</Text>
                    </View>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={40} />
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

        </View>
    )
}
export default UpdateAccountScreen;