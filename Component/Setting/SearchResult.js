import {
    Text, View,
    Dimensions,
    ScrollView
} from "react-native"
import React, { useState, useEffect } from "react";
import styles from '../../Styles/Setting/SearchScreen.styles';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import AutoHeightImage from "react-native-auto-height-image";

import ItemAccount from "../Account/ItemAccount";
import ItemPost from '../Posts/ItemPost';

const SearchResult = (route) => {
    const [inputSearch, setinputSearch] = useState("");
    const [arr_post, setarr_post] = useState([]);
    const [arr_acc, setarr_acc] = useState([]);
    const [isSearching, setisSearching] = useState(true);
    const [index, setIndex] = React.useState(0);
    const [routes, setroutes] = useState([
        { key: 'post', title: 'Bài viết' },
        { key: 'acc', title: 'Cá nhân' },
    ]);

    const GetListAccount = async (input) => {
        try {
            const response = await fetch(
                // 'https://backend-munnect.herokuapp.com/NguoiDung/DanhSach?inputSearch=' + inputSearch,
                'https://backend-munnect-104-716a330c6634.herokuapp.com/NguoiDung/DanhSach?inputSearch=' + input,
            );
            //API tìm kiếm người dùng theo regex
            const json = await response.json();
            setarr_acc(json.data.listNguoiDung);
            setisSearching(false);
            console.log(arr_acc);
        } catch (error) {
            console.error(error);
        }
    }

    const GetListPost = async (input) => {
        try {
            const response = await fetch(
                // 'https://backend-munnect.herokuapp.com/BaiViet/DanhSach?inputSearch=' + inputSearch,
                'https://backend-munnect-104-716a330c6634.herokuapp.com/BaiViet/DanhSach?inputSearch=' + input,
            );
            //API tìm kiếm bài viết theo regex
            const json = await response.json();
            setarr_post(json.data.listBaiViet);
            setisSearching(false);
            console.log(json.data.listBaiViet.length);
        } catch (error) {
            console.error(error);
        }
    }

    const PostTab = () => {
        return (
            <View style={styles.containerTab} >
                {
                    (isSearching == true)
                        ?
                        <View style={styles.viewOther}>
                            <AutoHeightImage source={require('../../assets/images/robot-finding-data.png')}
                                width={(Dimensions.get("window").width * 75) / 100} />
                            <Text style={styles.textHint}>Đang tìm kiếm..</Text>
                        </View>
                        :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ marginTop: 10 }}>
                                {
                                    (arr_post.length > 0)
                                        ?
                                        arr_post.map((post, index, arr) => {
                                            return <ItemPost post={post} key={index} nav={route.nav} />
                                        })
                                        :
                                        <View style={styles.viewOther}>
                                            <AutoHeightImage source={require('../../assets/images/no_post.png')}
                                                width={(Dimensions.get("window").width * 75) / 100} />
                                            <Text style={styles.textHint}>Không có kết quả nào..</Text>
                                        </View>
                                }
                            </View>
                        </ScrollView>
                }
            </View>
        )
    }

    const AccountTab = () => {
        return (
            <View style={styles.containerTab} >
                {
                    (isSearching == true)
                        ?
                        <View style={styles.viewOther}>
                            <AutoHeightImage source={require('../../assets/images/robot-finding-data.png')}
                                width={(Dimensions.get("window").width * 75) / 100} />
                            <Text style={styles.textHint}>Đang tìm kiếm..</Text>
                        </View>
                        :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ marginTop: 10 }}>
                                {
                                    (arr_acc.length > 0)
                                        ?
                                        arr_acc.map((nguoiDung, index, arr) => {
                                            return <ItemAccount nguoiDung={nguoiDung} key={index} nav={route.nav} />
                                        })
                                        :
                                        <View style={styles.viewOther}>
                                            <AutoHeightImage source={require('../../assets/images/no_post.png')}
                                                width={(Dimensions.get("window").width * 75) / 100} />
                                            <Text style={styles.textHint}>Không có kết quả nào..</Text>
                                        </View>
                                }
                            </View>
                        </ScrollView>
                }
            </View>
        )
    }

    React.useEffect(() => {
        if (route.inputSearch == "") {
            setarr_acc([]);
            setarr_post([]);
        }
        if (inputSearch != route.inputSearch) {
            setisSearching(true);
            setinputSearch(route.inputSearch);
            GetListAccount(route.inputSearch);
            GetListPost(route.inputSearch);
        }
    },[route.inputSearch])

    const renderScene = SceneMap({
        post: PostTab,
        acc: AccountTab,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'#000'} inactiveColor={'rgba(0, 0, 0, 0.5)'}
            labelStyle={{ fontSize: 17, fontWeight: '500' }}
            indicatorStyle={styles.indicatorTab}
            style={{ backgroundColor: 'white' }}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        </View>
    )
}

export default SearchResult;