import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    viewNewPost: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },

    imageAvatar: {
        height: 50, width: 50,
        borderRadius: 50 / 2,
        borderWidth: 1,
        borderColor: '#00FF80',
        marginRight: 15,
    },

    textHint: {
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.6)'
    },

    viewOther: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25
    },

    //View Item Post
    viewRowCenterBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    textName: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 1
    },

    buttonMore: {
        position: 'absolute',
        right: 0
    },

    viewBelowPost: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },

    buttonInteract: {
        width: 30,
        height: 30,
        margin: 5,
    },

    textInteract: {
        fontSize: 20,
        margin: 3
    }
});
