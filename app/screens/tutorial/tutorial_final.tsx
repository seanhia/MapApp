import TutorialScreen from './components/tutorial';
import { TouchableOpacity } from 'react-native';

const NotionURL = 'https://fluff-buckaroo-b5b.notion.site/EXPLORE-1bdfe60b19c880dcbe60e5d794c416ae?pvs=4';

export default function FinalTutorialPage() {
    return (
        <TutorialScreen 
            title="You're Done!" 
            description="You've completed the tutorial. Get started now!"
            // nextPage='/screens/settings'
            prevPage='/screens/tutorial/tutorial_4'
            complete={true}
            image={require('../../../assets/images/globe.jpg')}
            url={NotionURL}
        />
    );
}