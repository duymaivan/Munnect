import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    viewOther: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25
    },

    textHint: {
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.6)'
    },

    viewRowCenter: { 
        width: '100%',
        flexDirection: 'row',
        paddingLeft: 15, paddingRight: 15,
        paddingTop: 12, paddingBottom: 12,
        borderBottomColor: '#A09E9E',
        borderBottomWidth: 1
    },

    avatar: {
        height: 65, width: 65,
        borderRadius: 50,
        marginRight: 10
    },

    viewContent: {
        width: WindowWidth - 100
    },
    
    textName: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    viewInfoItem: {
        flexDirection: 'row'
    },

    imageInfoItem: {
        width: 17, height: 17,
        tintColor: 'rgba(0, 0, 0, 0.6)'
    },

    contentText: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.7)',
        marginTop: 3,
        marginBottom: 4,
        marginLeft: 5
    },

    timeText: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.7)'
    },

});
