import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../../Styles/HomeScreen.styles';

const DynamicHeader = (route) => {
    function OpenSearch() {
        route.nav.navigate('SearchScreen');
    }

    return (
        <View style={styles.viewHeader}>
            <View style={styles.topHome} >
                <Text style={styles.txtLogo}>MUNNECT</Text>

                <TouchableOpacity underlayColor={'#b0ebc1'} onPress={OpenSearch} activeOpacity={0.5}>
                    <Image source={require('../../assets/images/iconSearch.png')} style={{width: 26, height: 26}}/>
                </TouchableOpacity>
            </View>

            <View style={styles.viewNavi} >
                <TouchableOpacity onPress={() => { route.settabNum([0, true]); }}
                    style={{
                        borderBottomWidth: (route.tabNum == 0) ? 2 : 0,
                        borderBottomColor: '#00BD5F', 
                        paddingBottom: (route.tabNum == 0) ? 5 : 0
                    }}>
                    <Image style={{
                        width: 30,
                        height: 30,
                        tintColor: (route.tabNum == 0) ? '#00BD5F' : 'rgba(0, 0, 0, 0.7)',
                    }}
                        source={require('../../assets/images/home.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { route.settabNum([1, true]); }}
                    style={{
                        borderBottomWidth: (route.tabNum == 1) ? 2 : 0,
                        borderBottomColor: '#00BD5F', 
                        paddingBottom: (route.tabNum == 1) ? 5 : 0
                    }}>
                    <Image style={{
                        width: 30,
                        height: 30,
                        tintColor: (route.tabNum == 1) ? '#00BD5F' : 'rgba(0, 0, 0, 0.7)',
                    }}
                        source={require('../../assets/images/account.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { route.settabNum([2, true]); }}
                    style={{
                        borderBottomWidth: (route.tabNum == 2) ? 2 : 0,
                        borderBottomColor: '#00BD5F', 
                        paddingBottom: (route.tabNum == 2) ? 5 : 0
                    }}>
                    <Image style={{
                        width: 27,
                        height: 30,
                        tintColor: (route.tabNum == 2) ? '#00BD5F' : 'rgba(0, 0, 0, 0.7)',
                    }}
                        source={require('../../assets/images/notify.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { route.settabNum([3, false]); }}
                    style={{
                        borderBottomWidth: (route.tabNum == 3) ? 2 : 0,
                        borderBottomColor: '#00BD5F', 
                        paddingBottom: (route.tabNum == 3) ? 5 : 0
                    }}>
                    <Image style={{
                        width: 27,
                        height: 27,
                        tintColor: (route.tabNum == 3) ? '#00BD5F' : 'rgba(0, 0, 0, 0.7)',
                    }}
                        source={require('../../assets/images/align.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default DynamicHeader;