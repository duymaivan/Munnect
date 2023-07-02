import {
    Image, Text, View,
    TouchableHighlight, TouchableOpacity
} from "react-native"
import React, { useState } from "react";
import styles from '../../Styles/Setting/SettingScreen.styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
const SettingScreen = (route) => {
    const [infoLogin, setinfoLogin] = useState(route.infoLogin);
    const [srcAvatar, setsrcAvatar] = useState({ uri: String(infoLogin.anhDaiDien) });

    // const GetInfoLogin = async () => {
    //     try {
    //         const dataLoginInfo = await AsyncStorage.getItem("infoLogin");
    //         if (dataLoginInfo !== null) {
    //             setinfoLogin(JSON.parse(dataLoginInfo));
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    // React.useEffect(() => {
    //     GetInfoLogin();

    // }, []);

    function OpenListAcc(type) {
        if (type == 'following') {
            route.nav.navigate('ListAccount', { title: 'Đang theo dõi', infoAcc: infoLogin });
        } else {
            route.nav.navigate('ListAccount', { title: 'Người theo dõi', infoAcc: infoLogin });
        }
    }

    const Logout = async () => {
        AsyncStorage.clear();
        route.nav.navigate('LoginScreen');
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => { route.settabNum([1, true]) }}>
                    <View style={styles.viewAccount}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error_image.jpg'))}
                                style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{String(infoLogin.tenTaiKhoan)}</Text>
                                <Text style={{ fontSize: 18, color: 'gray' }}>Xem hồ sơ chi tiết</Text>
                            </View>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={40} />
                    </View>
                </TouchableOpacity>

                <View style={{ height: 2, backgroundColor: '#D9D9D9' }} />

                <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} style={styles.bottomLine}
                    onPress={() => { OpenListAcc('following') }}>
                    <View style={styles.viewItemSetting}>
                        <Image source={require('../../assets/images/following.png')} />
                        <Text style={styles.txtItemSetting}>Người tôi theo dõi</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} style={styles.bottomLine}
                    onPress={() => { OpenListAcc('follower') }}>
                    <View style={styles.viewItemSetting}>
                        <Image source={require('../../assets/images/follower.png')} />
                        <Text style={styles.txtItemSetting}>Người theo dõi tôi</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} style={styles.bottomLine}
                    onPress={() => { route.nav.navigate('ListMyPost') }}>
                    <View style={styles.viewItemSetting}>
                        <Image source={require('../../assets/images/myPost.png')} />
                        <Text style={styles.txtItemSetting}>Bài viết của tôi</Text>
                    </View>
                </TouchableHighlight>

                {/* <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} style={styles.bottomLine}
                    onPress={() => { }}>
                    <View style={styles.viewItemSetting}>
                        <Image source={require('../../assets/images/group.png')} />
                        <Text style={styles.txtItemSetting}>Hội nhóm</Text>
                    </View>
                </TouchableHighlight> */}

                <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} style={styles.bottomLine}
                    onPress={() => { route.nav.navigate('SearchScreen') }}>
                    <View style={styles.viewItemSetting}>
                        <Image source={require('../../assets/images/search.png')} />
                        <Text style={styles.txtItemSetting}>Tìm kiếm</Text>
                    </View>
                </TouchableHighlight>
            </View>

            <View>
                <View style={styles.viewBottom}>
                    <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} style={styles.topLine}
                        onPress={() => { route.nav.navigate('UpdateAccountScreen') }}>
                        <View style={styles.viewItemSetting}>
                            <Image source={require('../../assets/images/manageAccount.png')} />
                            <Text style={styles.txtItemSetting}>Quản lý tài khoản</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} style={styles.topLine}
                        onPress={() => { route.nav.navigate('ChangePassScreen') }}>
                        <View style={styles.viewItemSetting}>
                            <Image source={require('../../assets/images/changePass.png')} />
                            <Text style={styles.txtItemSetting}>Thay đổi mật khẩu</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} style={styles.topLine}
                        onPress={Logout}>
                        <View style={styles.viewItemSetting}>
                            <Image source={require('../../assets/images/logout.png')} />
                            <Text style={styles.txtItemSetting}>Đăng xuất</Text>
                        </View>
                    </TouchableHighlight>

                </View>
            </View>
        </View>
    )
}
export default SettingScreen;