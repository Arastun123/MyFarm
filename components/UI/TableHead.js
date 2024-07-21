import { View, Text, StyleSheet } from "react-native";

function TableHead({ headers}) {

    return (
        <View style={styles.row}>
            {headers.map((header, rowIndex) => (
                <View style={styles.cell} key={`row_${rowIndex}`}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        textBreakStrategy="simple"
                        style={styles.cellText}
                    >{header}</Text>
                </View>
            ))}
        </View>
    )
}

export default TableHead;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        width: '100%'
    },
    cell: {
        flex: 1,
        padding: 5,
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    cellText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});