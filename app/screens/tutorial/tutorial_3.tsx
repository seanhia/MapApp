import { useTheme } from '@/hooks/useTheme'
import TutorialScreen from './components/tutorial';

const Tutorial_3 = () => {

    
    return (
        <TutorialScreen 
            title='Compete for a Place on the Leaderboard'
            description='Aquire travel points and compete with friends to determine who is the most adventurous.'
            nextPage="/screens/tutorial/tutorial_4"
            prevPage='/screens/tutorial/tutorial_2'
            image={require('../../../assets/images/ranking.png')}
        />
    )
}

export default Tutorial_3