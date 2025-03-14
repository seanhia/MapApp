import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '@/hooks/useTheme'
import TutorialScreen from './components/tutorial';

export default function Tutorial2() {
    const { styles } = useTheme()
    const router = useRouter() 
    
    return (
        <TutorialScreen 
            title="View Your EXPLORE Map" 
            description="See your travel history uncloud as you explore new locations."
            nextPage="/screens/tutorial/tutorial_3"
            prevPage='/screens/tutorial'
            image={require('../../../assets/images/location.png')}

        />
    )
}

