/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/hooks/useRealTimeTracking` | `/screens/change_password` | `/screens/email_verifying` | `/screens/forgot_password` | `/screens/friends` | `/screens/friends/components/FriendList` | `/screens/friends/components/PendingList` | `/screens/friends/components/SearchBar` | `/screens/friends/components/UserList` | `/screens/home` | `/screens/home/components/weather` | `/screens/leaderboard` | `/screens/profile_view` | `/screens/settings` | `/screens/settings/SettingsHeader` | `/screens/sign_up` | `/screens/tutorial` | `/screens/tutorial/TutorialSlides` | `/screens/user_profile` | `/screens/user_profile/components/PhotoModal` | `/screens/user_profile/components/ProfileDetails` | `/screens/user_profile/components/ProfileHeader` | `/screens/user_profile/components/ProfilePost` | `/screens/user_profile/components/ProfileStatistics` | `/screens/user_profile/components/UploadPhoto` | `/utils/geolocation`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
