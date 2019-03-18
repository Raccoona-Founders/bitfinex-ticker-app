import { StyleSheet } from 'react-native';
import { Fonts, Color, DefaultStyles } from 'styles/variables';

export default StyleSheet.create({
    field: {
        marginBottom: 20,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Color.Gray3,
    },
    label: {
        position: 'absolute',
        left: 0,
        top: 8,
        paddingLeft: 10,
        paddingRight: 10,
        color: Color.GrayBlues,
        fontSize: 14,
    },
    input: {
        ...DefaultStyles.mediumFont,
        flex: 1,
        fontSize: 16,
        color: Color.Text,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 10,
    },
});
