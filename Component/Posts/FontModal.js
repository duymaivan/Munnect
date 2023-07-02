import {
    Modal, Text,
    View, TouchableOpacity,
    ScrollView
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from "../../Styles/Posts/NewPost.styles";
import Entypo from "react-native-vector-icons/Entypo";

var arrFont = ['Arialn', 'Carola', 'Garii', 'Valky', 'BohemeFloral', 'EDDrayton', 'GoatskinBrush', 'IndulgeScript', 'LazyFox', 'MBFSpaceHabitat', 'Menata', 'MightyWings', 'OPPOSans', 'Seraphytes', 'Sinistre', 'TikTokSans', 'WorkSans'];

const FontModal = (route) => {

    const ItemFont = (route) => {
        const PickFont = () => {
            if (route.inputFont == "") {
                route.callBack("Default");
            } else {
                route.callBack(route.inputFont);
            }
        }

        return (
            <TouchableOpacity style={styles.viewItemFont}
                onPress={PickFont}>
                <Text style={[styles.textItemFont, { fontFamily: String(route.inputFont) }]}>
                    {route.nameFont}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <Modal
                visible={route.isShow}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    route.callBack(route.font);
                }}>
                <View style={styles.backgroundModal}>
                    <View style={styles.viewDialog}>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                style={styles.buttonBackDialog}
                                onPress={() => {
                                    route.callBack(route.font);
                                }}>
                                <Entypo name="back" size={27} color={"#000"} />
                            </TouchableOpacity>
                            <Text style={styles.titleDialog}>Chọn phông chữ</Text>
                        </View>
                        <ScrollView style={styles.scrollViewDialog}>
                            <View>
                                <ItemFont inputFont={""} nameFont={"Mặc định"} callBack={route.callBack}/>
                                {
                                    arrFont.map((font, index, arr) => {
                                        return <ItemFont inputFont={font} nameFont={font} callBack={route.callBack} key={index}/>
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


export default FontModal;