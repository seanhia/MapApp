/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/MapComponent` | `/User Settings` | `/_sitemap` | `/dataQuery` | `/forgotPassword` | `/friends` | `/home` | `/leaderboard` | `/profile` | `/signUp` | `/tutorial` | `/userProfile`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
