import TutorialScreen from './components/tutorial';
import { TouchableOpacity } from 'react-native';

export default function FinalTutorialPage() {
    return (
        <TutorialScreen 
            title="You're Done!" 
            description="You've completed the tutorial. Get started now!"
            // nextPage='/screens/settings'
            prevPage='/screens/tutorial/tutorial_3'
            complete={true}
            image={require('../../../assets/images/globe.jpg')}
        />
    );
}