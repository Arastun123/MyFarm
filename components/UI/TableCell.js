import { View, Text, StyleSheet } from "react-native";

function TableCell({ data }) { 
    return (
        <View style={styles.row}>
            
            {data.map((item, index) => (
                <View key={index} style={styles.cell}>
                    <Text style={styles.cellText}>{item.value}</Text>
                </View>
            ))}
        </View>
    )
}

export default TableCell;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'space-between',
    },
    cell: {
        flex: 1,
        padding: 10,
        borderRightWidth: 1,
        borderColor: '#ddd',
        borderWidth: 0.5,
    },
    cellText: {
        textAlign: 'center',
        fontSize: 16,
    },
});