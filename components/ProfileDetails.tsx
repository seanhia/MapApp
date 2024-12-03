import React from 'react';
import { View, Text, Image} from 'react-native';

const ProfileDetails = () => {
    return (
        <View style={{ paddingHorizontal: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Image style={{ height: 80, width: 80, borderRadius: 4 }} source={require('../assets/images/profile-pic.jpg')} />
                <View style={{ width: 75, alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, fontWeight: '400', color: 'black' }}>Friends</Text>
                    <Text style={{ fontSize: 24, fontWeight: '400', color: 'black' }}>25</Text>
                </View>
                <View style={{ width: 75, alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, fontWeight: '400', color: 'black' }}>Points</Text>
                    <Text style={{ fontSize: 24, fontWeight: '400', color: 'black' }}>1679</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                <View style={{ width: 75, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: 'black' }}>DisplayName</Text>
                
                </View>
                <View>
                    <Text style={{ fontSize: 24, fontWeight: '400', color: 'black' }}>Bio</Text>
                    <Text style={{ fontSize: 24, fontWeight: '400', color: 'black' }}>~~~~~~~~~~~~~~~~~~~~~</Text>
                </View>
            </View>
            <View>
                <Text style={{ fontSize: 16, color: 'black' }}>@Username</Text> 
            </View>
            <View>
                <Text style={{fontWeight: '100'}}>Account Created</Text>
            </View>
            <View>
                <Text style={{fontWeight: '100'}}>11/30/24</Text>
            </View>

        </View>
        
    );
};

export default ProfileDetails;
