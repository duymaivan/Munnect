import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusHeight
    },

    viewTopSearch: {
        flexDirection: 'row',
        paddingRight: 15,
    },

    buttonPickImage: {
        padding: 3,
        left: 5, top: 5
    },

    viewInput: {
        flexDirection: 'row',
        marginLeft: 10,
        padding: 7,
        paddingLeft: 9,
        backgroundColor: '#E7FDD5',
        width: '90%',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#999898',
    },

    textInput: {
        marginLeft: 5,
        fontSize: 17,
        height: '100%',
    },

    textHint: {
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.6)'
    },

    viewOther: {
        flex: 1,
        alignItems: 'center',
        marginTop: 35
    },

    //Tab view

    containerTab: {
        flex: 1,
        backgroundColor: '#fff',
    },

    indicatorTab: {
        backgroundColor: '#24B96F',
        width: WindowWidth * 30 / 100,
        left: ((WindowWidth / 2) - (WindowWidth * 30 / 100)) / 2
    }
});
