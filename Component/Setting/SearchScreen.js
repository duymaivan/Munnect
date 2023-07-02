import {
    Text, View,
    TouchableOpacity,
    TextInput,
    Image, Dimensions
} from "react-native"
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Setting/SearchScreen.styles';
import AutoHeightImage from "react-native-auto-height-image";
import SearchResult from "./SearchResult";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SearchScreen = ({ navigation }) => {
    const [inputSearch, setinputSearch] = useState("");
    const [isFocus, setisFocus] = useState(false);

    function onInputText(input) {
        if (inputSearch.length > 0 && input == "") {
            setisFocus(true);
        }
        if (inputSearch.length == "" && input.length > 0) {
            setisFocus(true);
        }
        if (input == "-.-. .-.. . .- .-.") {
            setisFocus(false);
            setinputSearch("");
        } else {
            setinputSearch(input);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewTopSearch}>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5}
                    style={styles.buttonPickImage}>
                    <MaterialIcons name="arrow-back" size={22} />
                </TouchableOpacity>
                {
                    (inputSearch == "")
                        ?
                        <View style={styles.viewInput}>
                            <MaterialIcons name="search" size={25} color={'rgba(0, 0, 0, 0.5)'} />
                            <TextInput placeholder="Tìm kiếm" value={inputSearch} onChangeText={(input) => onInputText(input)}
                                style={[styles.textInput, { width: '100%' }]} autoFocus={isFocus} />
                        </View>
                        :
                        <View style={[styles.viewInput, { justifyContent: 'space-around' }]}>
                            <TextInput placeholder="Tìm kiếm" value={inputSearch} onChangeText={(input) => onInputText(input)}
                                style={[styles.textInput, { width: '90%' }]} autoFocus={isFocus} />
                            <MaterialIcons name="clear" size={25} onPress={() => onInputText("-.-. .-.. . .- .-.")} />
                        </View>
                }
            </View>
            {
                (inputSearch == "")
                    ?
                    <View style={styles.viewOther}>
                        <AutoHeightImage source={require('../../assets/images/web-exploring.png')} width={(Dimensions.get('window').width * 75) / 100} />
                        <Text style={styles.textHint}>Hãy tìm kiếm gì đó..</Text>
                    </View>
                    :
                    <SearchResult nav={navigation} inputSearch={inputSearch} />
            }
        </View>
    )
}

export default SearchScreen;