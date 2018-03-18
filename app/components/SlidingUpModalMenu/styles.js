const React = require('react-native')
const { StyleSheet } = React
const constants = {
    actionColor: '#24CE84'
};


var styles = StyleSheet.create({
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
    textButton: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    panelContainer: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffbf00',
    },
    button: {
        elevation: 1,
        margin: 5,
        padding: 5,
        height: 25,
        alignSelf: 'center'
    }
})

module.exports = styles
module.exports.constants = constants;