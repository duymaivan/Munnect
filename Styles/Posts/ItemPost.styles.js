import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    viewTitle: {
        flexDirection: 'row',
        margin: 15,
        alignItems: 'center'
    },

    txtTitle: {
        marginLeft: 10,
        fontSize: 19
    },

    viewDetailPost: {
        margin: 15,
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

    viewModalMore: {
        width: '40%',
        height: 90,
        justifyContent: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        top: '14%', right: '4%',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5
    },

    viewModalItemMore: {
        height: '50%',
        justifyContent: 'center'
    },

    viewBelowPost: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },

    viewRowCenterBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    buttonInteract: {
        width: 30,
        height: 30,
        margin: 5,
    },

    textInteract: {
        fontSize: 20,
        margin: 3
    },

    viewBoxComment: {
        width: WindowWidth,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },

    viewComment: {
        backgroundColor: '#E6E6E6',
        borderRadius: 5,
        width: '85%'
    },

    txtComment: {
        fontSize: 18,
        borderRadius: 5,
        width: '87%',
        margin: 5,
        padding: 7,
    },

    btnSendComment: {
        backgroundColor: '#00ff80',
        borderRadius: 50,
        marginLeft: 8,
        padding: 10,
        paddingRight: 13,
        paddingLeft: 9
    }

});
