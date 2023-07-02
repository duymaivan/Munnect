import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    viewHeader: {
        backgroundColor: 'white',
    },

    topHome: {
        margin: 20,
        marginBottom: 10,
        paddingTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 55
    },

    txtLogo: {
        color: '#00ff80',
        fontSize: 35,
        fontFamily: 'Aclonica',
        width: 200,
    },

    viewNavi: {
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
    },

    viewTab: {
        flex: 1,
    }
});
