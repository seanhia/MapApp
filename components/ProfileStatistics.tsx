import React from 'react';
import { View, Text, Image } from 'react-native';

const ProfileStatistics = () => {
    return (
        <View style={{ paddingHorizontal: 15 }}>
            <Text>Statistics</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 15 }}>
                <Image style={{ height: 50, width: 50 }} source={require('../assets/images/distance.jpg')} />
                <Image style={{ height: 50, width: 50 }} source={require('../assets/images/city.jpg')} />
                <Image style={{ height: 50, width: 50 }} source={require('../assets/images/globe.jpg')} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 15 }}>
                <Text>Distance Traveled</Text>
                <Text>Cities Visited</Text>
                <Text>Countries Visited</Text>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 15 }}>
                <Text>2462 m</Text>
                <Text>3</Text>
                <Text>1</Text>
            </View>

        </View>

    );
};

export default ProfileStatistics;
