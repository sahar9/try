import React from 'react';
import { Searchbar, DataTable } from 'react-native-paper';

import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Image,
    Pressable,
    StatusBar,
    View,
    Picker,
    ScrollView,
    RefreshControl,
} from 'react-native';
import Data from './data'

const home = ({ }) => {
    const onChangeSearch = query => {
        setSearchQuery(query);
    };
    const [searchQuery, setSearchQuery] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [nomRusse, setnomRusse] = React.useState()
    const [nomAr, setnomAr] = React.useState()
    const [nomFr, setnomFr] = React.useState()
    const [nomAng, setnomAng] = React.useState()
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{nomRusse}</Text>
                        <Text style={styles.modalText}>{nomAr}</Text>
                        <Text style={styles.modalText}>{nomFr}</Text>
                        <Text style={styles.modalText}>{nomAng}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
            // value={searchQuery}
            />
            <ScrollView style={styles.scrollView}>
                <DataTable>
                    <DataTable.Header style={{ backgroundColor: 'pink' }}>
                        <DataTable.Title>Russe</DataTable.Title>
                        <DataTable.Title>Arabe</DataTable.Title>
                        <DataTable.Title>Francais</DataTable.Title>
                        <DataTable.Title>Anglais</DataTable.Title>
                    </DataTable.Header>

                    {Data.filter(val => {
                        if (searchQuery == '') {
                            return val;
                        } else if (
                            val.nom.toLowerCase().includes(
                                searchQuery.toLowerCase()
                            )
                        ) {
                            return val;
                        }
                    }).map(val => {
                        // setLanguages(val)
                        // console.log(Languages);
                        return (
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => { setModalVisible(true), setnomRusse(val.nom), setnomAr(val.arabe), setnomFr(val.fr), setnomAng(val.anglais) }}
                            >

                                <DataTable.Row key={val.id}>
                                    <DataTable.Cell key={val.id}>{val.nom}</DataTable.Cell>
                                    <DataTable.Cell key={val.id}>{val.arabe}</DataTable.Cell>
                                    <DataTable.Cell key={val.id}>{val.fr}</DataTable.Cell>
                                    <DataTable.Cell key={val.id}>{val.anglais}</DataTable.Cell>
                                </DataTable.Row>
                            </Pressable>
                        )
                    })}
                </DataTable>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#FFF",
    },
    buttonClose: {
        // backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
export default home
