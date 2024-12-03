import React from 'react';
import { View, Text, Image } from 'react-native';

const ProfilePost = () => {
    return (
        <View style={{ margin: 10 }}>
            <Text>@Username added a photo! </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                <Image style={{ height: 200.9, width: 200.9 }} source={require('../assets/images/post.jpeg')} />
          
                <View>
                    <Text style={{ fontSize: 24, fontWeight: '400', color: 'black' }}>Rate:</Text>
                    <Image style={{ height:50, width:100 }} source={require('../assets/images/rate.jpg')} />
                </View>
            </View>
            <View style={{ flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                <View>
                    <Image style={{ height: 25, width: 25 }} source={require('../assets/images/heart.jpg')}/>
                    <Text>Likes: 5    Posted 10 minutes ago</Text>
                </View>
        
            </View>

        </View>

    );
};

export default ProfilePost;
