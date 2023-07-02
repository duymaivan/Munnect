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
    },

    container2: {
        backgroundColor: '#00ff80',
        height: 1500,
        width: 650,
        borderRadius: 480,
        position: 'absolute',
        top: 250,
    },

    nameLogo: {
        fontSize: 32,
        alignSelf: 'flex-start',
        margin: 45,
    },

    note: {
        width: '80%',
        fontSize: 17
    },

    viewInput: {
        width: '85%',
        marginTop: 150
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

    btnGetPass: {
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
        marginTop: 50
    },

    txtGetPass: {
        padding: 10,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#262625'
    },

    txtLogin: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 19,
        marginLeft: 15
    }
});
