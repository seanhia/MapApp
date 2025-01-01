import React from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import sharedStyles from "@/constants/sharedStyles";

interface Pending {
    id: string; 
    friendId: string; 
    friendUsername: string; 
}

interface PendingListProps {
    pending: Pending[];
}

// pending list component of users who have sent friend requests
const PendingList: React.FC<PendingListProps> = ({ pending }) => {
    return (
        <FlatList
            data={pending}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.pendingItem}>
                    <Text style={sharedStyles.text}>Pending: {item.friendUsername}</Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    pendingItem: {
        padding: 10,
        backgroundColor: '#ffe6cc',
        borderRadius: 8,
        marginBottom: 10,
    },
});

export default PendingList;