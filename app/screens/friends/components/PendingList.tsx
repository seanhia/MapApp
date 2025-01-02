import React from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import sharedStyles from "@/constants/sharedStyles";
import AcceptFriendship from "@/assets/data/AcceptFriendship";

interface Pending {
    id: string; 
    friendId: string; 
    friendUsername: string; 
}

interface PendingListProps {
    pending: Pending[];
    onAccept: (id: string) => void;
    onDeny: (id: string) => void;
}

// pending list component of users who have sent friend requests
const PendingList: React.FC<PendingListProps> = ({ pending, onAccept, onDeny}) => {
    return (
        <FlatList
            data={pending}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={sharedStyles.item}>
                    <Text style={sharedStyles.text}>{item.friendUsername}</Text>
                    <View style={sharedStyles.buttonContainter}> 
                        <TouchableOpacity
                            style={sharedStyles.button}
                            onPress={() => onAccept(item.id)}
                            >
                                <Text style={sharedStyles.text}>Accept</Text>
                            </TouchableOpacity>
                        <TouchableOpacity
                            style={sharedStyles.button}
                            onPress={() => onDeny(item.id)}
                            >
                                <Text style={sharedStyles.text}>Deny</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            )}
        />
    );
};


export default PendingList;