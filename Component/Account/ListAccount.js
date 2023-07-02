import {
    ScrollView,
    View,
} from 'react-native';
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Account/ListAcc.styles';
import ItemAccount from './ItemAccount';

const ListAccount = ({ route, navigation }) => {
    const [arr_follow, setarr_follow] = useState([]);
    const [infoAcc, setinfoAcc] = useState(route.params.infoAcc);
    const [isFocus, setisFocus] = useState(false);
    const [type, settype] = useState('');

    const GetListFollow = async () => {
        try {
            if (route.params.title == "Đang theo dõi") {
                const response = await fetch(
                    // 'https://backend-munnect.herokuapp.com/NguoiDung/TheoDoi/DanhSach?idSelf=' + infoAcc._id + "&&getFollowing=true",
                    'https://backend-munnect-104-716a330c6634.herokuapp.com/NguoiDung/TheoDoi/DanhSach?idSelf=' + infoAcc._id + "&&getFollowing=true",
                );
                const json = await response.json();
                setarr_follow(json.data.listTheoDoi);
                settype('following');
            } else {
                const response = await fetch(
                    // 'https://backend-munnect.herokuapp.com/NguoiDung/TheoDoi/DanhSach?idSelf=' + infoAcc._id + "&&getFollower=true",
                    'https://backend-munnect-104-716a330c6634.herokuapp.com/NguoiDung/TheoDoi/DanhSach?idSelf=' + infoAcc._id + "&&getFollower=true",
                );
                const json = await response.json();
                setarr_follow(json.data.listTheoDoi);
                settype('follower');
            }
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            GetListFollow();
            setisFocus(true);
        });

        return unsub;
    }, [navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                {
                    (arr_follow.length > 0)
                        ?
                        arr_follow.map((nguoiDung, index, arr) => {
                            console.log(nguoiDung);
                            if (type == 'follower') {
                                return <ItemAccount nguoiDung={nguoiDung.idNguoiTheoDoi} key={index} nav={navigation}
                                isFocus={isFocus} setisFocus={() => { setisFocus(false); }} />
                            } 
                            if (type == 'following') {
                                return <ItemAccount nguoiDung={nguoiDung.idNguoiDung} key={index} nav={navigation}
                                isFocus={isFocus} setisFocus={() => { setisFocus(false); }} />
                            }
                        })
                        : ""
                }
            </ScrollView>
        </View>
    );
}


export default ListAccount;