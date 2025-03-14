import { useTheme } from '@/hooks/useTheme'
import TutorialScreen from './components/tutorial';

const Tutorial_3 = () => {

    
    return (
        <TutorialScreen 
            title='Log Your Journeys'
            description='Easily add and categorize your trips.'
            nextPage="/screens/tutorial/tutorial_final"
            prevPage='/screens/tutorial/tutorial_2'
            image={require('../../../assets/images/cloud.png')}
        />
    )
}

export default Tutorial_3