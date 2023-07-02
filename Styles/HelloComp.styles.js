import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    backGround: {
        backgroundColor: '#00FF80',
        height: '100%', width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    logoImage: {
        width: WindowWidth * 35 / 100,
        height: WindowWidth * 35 / 100
    },

    nameApp: {
        fontFamily: 'Aclonica',
        fontSize: 45,
        marginTop: 35
    }
});
