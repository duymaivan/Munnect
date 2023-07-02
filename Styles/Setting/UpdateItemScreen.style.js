import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20
    },

    viewItemUpdate: {
        width: '90%',
    },

    txtTitle: {
        fontSize: 23,
        fontWeight: '500',
        marginTop: 15
    },

    viewValue: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },

    txtValue: {
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 3,
        width: '100%',
        borderWidth: 1,
        borderColor: 'white',
        borderBottomColor: 'gray',
        borderRadius: 10
    },

    viewButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 35
    },

    btnBack: {
        backgroundColor: '#9b9e9b',
        color: 'white',
        borderRadius: 20,
        textAlign: 'center',
        padding: 5,
        paddingLeft: 17,
        paddingRight: 17,
        fontSize: 18,
        fontWeight: '500',
        borderColor: 'black',
        borderWidth: 1
    },

    btnUpdate: {
        backgroundColor: '#00ff80',
        color: 'black',
        borderRadius: 20,
        textAlign: 'center',
        padding: 5,
        paddingLeft: 17,
        paddingRight: 17,
        fontSize: 18,
        fontWeight: '500',
        borderColor: 'black',
        borderWidth: 1

    }

});
