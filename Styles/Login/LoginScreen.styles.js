import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
        height: WindowHeight
    },

    container2: {
        backgroundColor: '#00ff80',
        height: WindowHeight,
        width: WindowWidth,
        borderTopLeftRadius: WindowWidth,
        position: 'absolute',
        top: WindowWidth / 2,
    },

    nameLogo: {
        fontSize: 40,
        fontFamily: 'Aclonica',
        margin: 20
    },

    txtIntro: {
        fontSize: 27,
        width: '75%'
    },

    viewInput: {
        width: '90%',
        marginTop: '25%'
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
        width: '90%',
        paddingRight: 40
    },

    viewRemember: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
    },

    viewRow: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },

    viewCheckBox: {
        width: 22,
        height: 22,
        borderWidth: 1,
        borderColor: '#D5C5C5',
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        backgroundColor: 'white'
    },

    textRemem: {
        color: '#403E3E',
        fontSize: 17,
        fontWeight: '400',
        fontStyle: 'normal',
        marginLeft: 10,
    },

    textForget: {
        color: '#403E3E',
        fontSize: 17,
        fontWeight: '400',
        fontStyle: 'normal',
        textDecorationLine: 'underline'
    },

    btnLogin: {
        backgroundColor: '#FFDC00',
        width: '80%',
        borderRadius: 5,
        marginTop: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    txtLogin: {
        padding: 10,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#262625'
    },

    btnRegist: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 5,
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    txtRegist: {
        padding: 10,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0C7F45'
    },
});
