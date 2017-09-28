const React = require('react-native')
const { StyleSheet } = React
const constants = {
    actionColor: '#24CE84'
};
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffbf00',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 80,
        backgroundColor: '#000000',
    },
    counterText: {
        fontSize: 90,
        alignSelf: 'stretch',
        textAlign: 'center',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        color: '#ffbf00'
    },
    panel: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative'
    },
    panelHeader: {
        height: 120,
        backgroundColor: '#ffbf00',
        alignItems: 'center',
        justifyContent: 'center'
    },
    favoriteIcon: {
        position: 'absolute',
        top: -24,
        right: 24,
        backgroundColor: '#2b8a3e',
        width: 48,
        height: 48,
        padding: 8,
        borderRadius: 24,
        zIndex: 1
    },
    listview: {
        flex: 1,
    },
    li: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    liContainer: {
        flex: 2,
    },
    liText: {
        color: '#333',
        fontSize: 16,
    },
    navbar: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        justifyContent: 'center',
        height: 44,
        flexDirection: 'row'
    },
    navbarTitle: {
        color: '#444',
        fontSize: 16,
        fontWeight: "500"
    },
    statusbar: {
        backgroundColor: '#fff',
        height: 22,
    },
    center: {
        textAlign: 'center',
    },
    actionText: {
        color: '#000',
        fontSize: 17,
        textAlign: 'left',
        alignSelf: 'center',
        marginLeft: 20
    },
    totalText: {
        color: '#000',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 20,
    },
    titleText: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 20,
    },
    action: {
        backgroundColor: constants.actionColor,
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    cardContainer: {
        flex: 1,
        flexWrap: 'wrap'
    },
    textButton: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    panelContainer: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffbf00',
    },
    item: {
        flexDirection: 'row',
        margin: 3,
        alignItems: 'flex-start',
        height: deviceWidth / 5
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    row: {
        justifyContent: 'center',
        padding: 5,
        margin: 10,
        width: 100,
        height: 100,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC'
    },
    imageContainer: {
        height: 40,
        width: 40,
        borderRadius: 64,
        borderColor: 'black',
        borderWidth: 3,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    image: {
        height: 128,
        width: 128,
        borderRadius: 64
    },
    modal: {
        padding: 10,
        margin: 10,
        backgroundColor: '#ffbf00',
        elevation: 5
    },
    buttonsSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        elevation: 3
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalDescription: {
        margin: 7
    },
    modalImage: {
        height: 40,
        width: 40,
        borderRadius: 64,
        borderColor: 'black',
        borderWidth: 3
    },
    modalTitleIcon: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 10,
    },
    modalIcon: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    renderItem: {
        flexDirection: 'row',
        flex: 1
    },
    iconInformation: {
        justifyContent: 'center',
        flex: 1
    }
})

module.exports = styles
module.exports.constants = constants;