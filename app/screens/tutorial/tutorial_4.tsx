import { useTheme } from '@/hooks/useTheme'
import TutorialScreen from './components/tutorial';

const Tutorial_4 = () => {

    
    return (
        <TutorialScreen 
            title='Connect with Friends'
            description='Connect and share reviews and your personal with friends around the world!'
            nextPage="/screens/tutorial/tutorial_final"
            prevPage='/screens/tutorial/tutorial_3'
            image={require('../../../assets/images/friend_clouds.png')}
        />
    )
}

export default Tutorial_4