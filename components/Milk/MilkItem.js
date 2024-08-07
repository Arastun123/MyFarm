import { StyleSheet, View, Text } from "react-native";
import { getFormatedDate } from "../../util/date";

function MilkItem({ date, amount, count}) {
    return (
        <View style={styles.row}>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{count}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{date.slice(0, 10)}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{amount}</Text>
            </View>
        </View>
    )
};


export default MilkItem;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#ddd',
        justifyContent: 'space-between',
    },
    cell: {
        flex: 1,
        padding: 10,
        borderRightWidth: 1,
        borderColor: '#ddd',
        borderWidth: 0.3,
    },
    cellText: {
        textAlign: 'center',
        fontSize: 16,
    },
});