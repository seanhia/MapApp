import React from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import sharedStyles from "@/constants/sharedStyles";
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
    return (
        <FlatList
            data={pending}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={sharedStyles.buttonContainer}>
                    <Image source={require('@/assets/images/cloud.png')}
                    style={sharedStyles.profilePicture} />
                    <Text style={sharedStyles.boldText}>@{item.friendUsername}</Text>
                        <TouchableOpacity
                            style={sharedStyles.sideButton}
                            onPress={() => onAccept(item)}
                            >
                                <Text style={sharedStyles.text}>Accept</Text>
                            </TouchableOpacity>
                        <TouchableOpacity
                            style={sharedStyles.sideButton}
                            onPress={() => onDeny(item)}
                            >
                                <Text style={sharedStyles.text}>Deny</Text>
                            </TouchableOpacity>
                </View>
            )}
        />
    );
};


export default PendingList;