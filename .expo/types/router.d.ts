/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/..\components\RealTimeTracker` | `/_sitemap` | `/hooks/useRealTimeTracking` | `/screens/forgot_password` | `/screens/friends` | `/screens/friends/components/FriendList` | `/screens/friends/components/PendingList` | `/screens/friends/components/SearchBar` | `/screens/friends/components/UserList` | `/screens/home` | `/screens/leaderboard` | `/screens/settings` | `/screens/settings/SettingsHeader` | `/screens/sign_up` | `/screens/tutorial` | `/screens/tutorial/TutorialSlides` | `/screens/user_profile` | `/screens/user_profile/components/ProfileDetails` | `/screens/user_profile/components/ProfileHeader` | `/screens/user_profile/components/ProfilePost` | `/screens/user_profile/components/ProfileStatistics` | `/utils/geolocation`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
