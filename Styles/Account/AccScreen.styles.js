import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;
let avatarWidth = WindowWidth * 28 / 100;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    containerVA: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: StatusBar.currentHeight
    },

    floatButtonUp: {
        position: 'absolute',
        right: 20, bottom: 20,
        backgroundColor: '#00FF80',
        borderRadius: 50,
        padding: 7,
    },

    viewRowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    viewAvatar: {
        paddingLeft: 10,
        paddingBottom: 5,
        position: 'absolute',
        height: '100%',
        justifyContent: 'flex-end'
    },

    imageWallpapar: {
        width: WindowWidth,
        height: WindowWidth / 2
    },

    imageAvatar: {
        width: avatarWidth,
        height: avatarWidth,
        borderRadius: avatarWidth / 2,
        borderColor: '#00FF80',
        borderWidth: 1.5
    },

    buttonPickImage: {
        padding: 3,
        backgroundColor: '#00FF80',
        borderRadius: 30,
        position: 'absolute',
    },

    textName: {
        paddingTop: 10,
        paddingLeft: 17,
        paddingRight: 20,
        fontSize: 22,
        fontWeight: 'bold',
    },

    textNameVA: {
        paddingTop: 10,
        paddingLeft: 17,
        paddingRight: 20,
        fontSize: 22,
        fontWeight: 'bold',
        width: '75%',
    },

    buttonFollow: {
        backgroundColor: '#00FF80',
        position: 'absolute',
        right: 11, top: 12,
        padding: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1
    },

    buttonFollowing: {
        backgroundColor: '#fff',
        position: 'absolute',
        right: 11, top: 12,
        padding: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1
    },

    viewInfo: {
        paddingTop: 15,
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    viewInfoItem: {
        flexDirection: 'row',
        marginBottom: 5
    },

    imageInfoItem: {
        width: 19, height: 19,
        tintColor: 'rgba(0, 0, 0, 0.6)'
    },

    infoText: {
        marginLeft: 7,
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.7)'
    },

    viewIntro: {
        marginTop: 10,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.35)'
    },

    textTitle: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        fontSize: 19,
        fontWeight: '500',
    },

    textIntro: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        fontSize: 16,
    },

    viewNewPost: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },

    imageAvatarNP: {
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

});
