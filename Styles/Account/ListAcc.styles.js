import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    viewRowCenter: { 
        width: '100%',
        flexDirection: 'row',
        paddingLeft: 15, paddingRight: 15,
        paddingTop: 12, paddingBottom: 12,
    },

    avatar: {
        height: 65, width: 65,
        borderRadius: 50,
        marginRight: 10
    },

    textName: {
        fontSize: 20,
        fontWeight: '600',
    },

    viewInfoItem: {
        flexDirection: 'row',
        marginBottom: 3
    },

    imageInfoItem: {
        width: 17, height: 17,
        tintColor: 'rgba(0, 0, 0, 0.6)'
    },

    infoText: {
        marginLeft: 7,
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.7)'
    },

    buttonFollow: {
        backgroundColor: '#00FF80',
        position: 'absolute',
        right: 10, bottom: 15,
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
        right: 10, bottom: 15,
        padding: 7,
        paddingLeft: 10, 
        paddingRight: 10,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1
    },

});
