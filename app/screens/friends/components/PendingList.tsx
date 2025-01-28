import React from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme'
import { Friend } from "@/data/types"
// import AcceptFriendship from "@/assets/data/AcceptFriendship";




interface PendingListProps {
    pending: Friend[];
    onAccept: (id: Friend) => void;
    onDeny: (id: Friend) => void;
}

/* 
    Component for the Pending List of friend requests used in the Friends screen 
*/const PendingList: React.FC<PendingListProps> = ({ pending, onAccept, onDeny}) => {
    const { colorScheme, styles } = useTheme();
    
    return (
        <FlatList
            data={pending}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.buttonContainer}>
                    <Image source={require('@/assets/images/cloud.png')}
                    style={styles.profilePicture} />
                    <Text style={styles.boldText}>@{item.friend_username}</Text>
                        <TouchableOpacity
                            style={styles.sideButton}
                            onPress={() => onAccept(item)}
                            >
                                <Text style={styles.tinyText}>Accept</Text>
                            </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.sideButton}
                            onPress={() => onDeny(item)}
                            >
                                <Text style={styles.tinyText}>Deny</Text>
                            </TouchableOpacity>
                </View>
            )}
        />
    );
};


export default PendingList;