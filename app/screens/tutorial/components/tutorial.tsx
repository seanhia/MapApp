import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme'
import { Colors } from '@/constants/Colors';
import { ExternalLink } from '@/components/ExternalLink';

interface TutorialProps {
    title: string;
    description: string;
    nextPage?: string; 
    prevPage?: string;
    complete?: boolean; 
    skip?: boolean; 
    image?: string;
    url?: string; 

}

const TutorialScreen = ({ title, description, nextPage, prevPage, complete, skip, image, url }: TutorialProps) => {
    const router = useRouter();
    const { styles } = useTheme()

    return (
        <View style={styles.fullContainer}>
            <View style={styles.tutorialContainer}>
                <Image 
                    style={[styles.tutorialImage, {borderRadius: 24}]}
                    source={image}
                    />
        
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
                <Text style={{ textAlign: 'center', marginVertical: 10, lineHeight: 50 }}>{description}</Text>

                {url &&
                <ExternalLink href={url}/>
                }   

            </View>
            
            <View style={styles.leftContainer}>
                {skip && (
                    <TouchableOpacity 
                        style={styles.tutorialButton}
                        onPress={() => router.push('/screens/home')}>
                        <Text style={styles.text}>Skip</Text>
                    </TouchableOpacity>
                )}
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
