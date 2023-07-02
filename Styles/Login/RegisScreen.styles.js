import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00ff80',
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',

    },

    container2: {
        backgroundColor: '#ffffff',
        height: WindowHeight * 70 / 100,
        width: WindowWidth,
        borderBottomRightRadius: WindowWidth,
        position: 'absolute',
        top: 0,
    },

    nameRegist: {
        fontWeight: '500',
        margin: 20,
        fontSize: 29,
        width: '75%'
    },

    txtIntro: {
        fontSize: 17,
        width: '73%'
    },

    viewInput: {
        width: '85%',
        marginTop: '10%'
    },

    txtInput: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        backgroundColor: '#FFFFFF',
        fontSize: 18,
        margin: 15,
        borderRadius: 4,
        padding: 13,
    },

    txtDate: {
        fontSize: 18,
    },

    btnRegist: {
        backgroundColor: '#FFDC00',
        width: '80%',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#e4e86f',
        marginTop: 50
    },

    txtRegist: {
        padding: 10,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#262625'
    },

    btnRegist: {
        backgroundColor: '#FFDC00',
        width: '80%',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        marginTop: 40
    },

    txtLogin: {
        color: '#403E3E',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 19,
        marginLeft: 15
    }
});
