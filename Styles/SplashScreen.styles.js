import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00ff80',
        alignItems: 'center',
        justifyContent: 'center'
    },

    iconLogo: {
        marginBottom: 30
    },
    
    nameApp: {
        fontFamily: 'Aclonica',
        color: '#FDFDFD',
        fontSize: 48,
        marginBottom: 40
    }
});
