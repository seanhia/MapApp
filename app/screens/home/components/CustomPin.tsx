import { Image }  from 'react-native'; 
import { useTheme } from '@/hooks/useTheme'
import fav from '@/assets/images/favLocation.png'

{/** Favorite Location Custom Pin .png */}

export const CustomPin = () => {
    const { styles } = useTheme(); 
    return (

        <Image 
            style={{position: 'absolute'}}
            source={require('@/assets/images/favLocation.png')}
        />
    )
}
