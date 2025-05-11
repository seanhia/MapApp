import React from 'react';
import { View, Text } from 'react-native';
import { legendItems } from '@/data/types';
import { useTheme } from '@/hooks/useTheme';

const NodeColorLegend = () => {
    const { styles } = useTheme();
    return (
        <View style={{ flexDirection: 'row', marginVertical: 10, flexWrap: 'wrap' }}>
            {legendItems.map((item, index) => (
                <View
                    key={index}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 15,
                        marginBottom: 5,
                    }}
                >
                    <View
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 7,
                            backgroundColor: item.color,
                            marginRight: 5,
                        }}
                    />
                    <Text style={styles.text}>{item.label}</Text>
                </View>
            ))}
        </View>
    );
};

export default NodeColorLegend;
