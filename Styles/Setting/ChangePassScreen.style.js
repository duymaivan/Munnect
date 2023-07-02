import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: '7%'
    },

    txtTitle: {
        fontSize: 25,
        marginLeft: 15
    },

    txtInput: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        backgroundColor: '#FFFFFF',
        fontSize: 20,
        margin: 15,
        borderRadius: 4,
        padding: 13,
        width: '90%',
        paddingRight: 40
    },

    viewButton:{
        justifyContent:'center'
    },

    btnChangePass: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        fontSize: 18,
        margin: 15,
        padding:5,
        borderRadius: 4,
        backgroundColor:'#00ff80',
        width: '90%',
        paddingRight: 40
       
    },
    txtChangePass:{
        padding: 3,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#262625',
       
    }, 

    btnBack: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        fontSize: 18,
        margin: 15,
        padding:5,
        borderRadius: 4,
        backgroundColor:'#9b9e9b',
        width: '90%',
        paddingRight: 40
       
    },
    txtBack:{
        padding: 3,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ffffff',
       
    }
});
