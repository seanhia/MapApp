import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme'

interface TutorialProps {
    title: string;
    description: string;
    nextPage?: string;  // Optional prop for navigation
    prevPage?: string;
    complete?: boolean
    image?: string;

}

const TutorialScreen = ({ title, description, nextPage, prevPage, complete, image }: TutorialProps) => {
    const router = useRouter();
    const { styles } = useTheme()

    return (
        <View style={styles.tutorialContainer}>
            <Image
                style={styles.image}
                source={image}
                />
    
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
            <Text style={{ textAlign: 'center', marginVertical: 10 }}>{description}</Text>
            <View style={styles.leftContainer}>
                {prevPage && (
                    <TouchableOpacity
                        style={styles.tutorialButton}
                        onPress={() => router.push(prevPage)}
                    >
                        <Text style={styles.text}>Back</Text>
                    </TouchableOpacity>
                )}
                <Text style={{padding: 6}}></Text>
                {nextPage && (
                    <TouchableOpacity 
                        style={styles.tutorialButton}
                        onPress={() => router.push(nextPage)}>
                        <Text style={styles.text}>Next</Text>
                    </TouchableOpacity>
                )}
                {complete && (
                    <TouchableOpacity 
                        style={styles.tutorialButton}
                        onPress={() => router.push('/screens/home')}>
                        <Text style={styles.text}>Complete</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default TutorialScreen;
