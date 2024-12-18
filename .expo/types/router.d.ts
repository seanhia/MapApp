/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/MapComponent` | `/_sitemap` | `/screens/forgot_password` | `/screens/friends` | `/screens/home` | `/screens/leaderboard` | `/screens/settings` | `/screens/settings/SettingsHeader` | `/screens/sign_up` | `/screens/tutorial` | `/screens/tutorial/TutorialSlides` | `/screens/user_profile` | `/screens/user_profile/components/ProfileDetails` | `/screens/user_profile/components/ProfileHeader` | `/screens/user_profile/components/ProfilePost` | `/screens/user_profile/components/ProfileStatistics`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
