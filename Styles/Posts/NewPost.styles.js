import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    viewRowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    viewRowCenterBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    imageAvatar: {
        height: 70, width: 70,
        borderRadius: 70 / 2,
        borderWidth: 1,
        borderColor: '#00FF80',
        marginRight: 7
    },

    textName: {
        marginLeft: 10,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5
    },

    buttonUpload: {
        marginTop: 10,
        padding: 9,
        borderWidth: 1,
        borderColor: '#04DF72',
        borderRadius: 10,
    },

    textButtonUpload: {
        fontSize: 20,
        marginRight: 5
    },

    viewContent: {
        width: '100%',
        backgroundColor: '#fff',
        minHeight: WindowHeight
    },

    textContent: {
        width: '100%',
        marginBottom: 10,
        fontSize: 20,
        lineHeight: 22,
        padding: 10
    },

    imageContent: {
        // flex: 1,
        // aspectRatio: 1.35,
        // resizeMode: 'contain',
        //  Cho Image bình thường, ImageBG thì để resize ra ngoài
    },

    viewButtonIC: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10
    },

    buttonImageContent: {
        backgroundColor: '#fff',
        width: 27, height: 27,
        borderRadius: 30 / 2,
        borderColor: '#000',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },

    iconImageContent: {
        width: 19,
        height: 19
    },

    navBelow: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        marginTop: 5,
        width: WindowWidth,
        borderTopWidth: 1,
        borderColor: '#999898',
        padding: 13,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    imageInNavBelow: {
        height: 35, width: 35,
        marginRight: 15
    },

    fontInNavBelow: {
        height: 30, width: 30,
        marginRight: 15
    },

    textInNavBelow: {
        fontSize: 20,
    },

    backgroundModal: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    viewDialog: {
        width: '80%',
        height: '80%',
        backgroundColor: '#fff',
        borderRadius: 5
    },

    buttonBackDialog: {
        position: 'absolute',
        top: 13, left: 10
    },

    titleDialog: {
        fontSize: 23,
        fontWeight: '500',
        marginTop: 10
    },

    scrollViewDialog: {
        flex: 1, 
        width: '100%',
        marginTop: 15,
    },

    viewItemFont: {
        borderColor: '#000',
        borderBottomWidth: 1,
        paddingTop: 10, paddingBottom: 10,
        paddingLeft: 20, paddingRight: 20
    },

    textItemFont: {
        fontSize: 27
    },
});
