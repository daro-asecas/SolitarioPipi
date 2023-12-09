import type React from "react";
import type * as TrackPlayer from "react-native-track-player";
import type * as ReactNative from "react-native";
import type * as Svg from "react-native-svg";
import type * as LinearGradient from "react-native-linear-gradient";
import type * as AsyncStorage from "@react-native-async-storage/async-storage";
import type * as Localize from "react-native-localize";  
import type * as Ads from "react-native-google-mobile-ads";
import type * as BootSplash from "react-native-bootsplash";
import type * as WebView from "react-native-webview";

export const mods = (globalThis as any).__MODULES__ as {
  "react": typeof React,
  "react-native": typeof ReactNative,
  "react-native-track-player": typeof TrackPlayer,
  "react-native-svg": typeof Svg,
  "react-native-linear-gradient": typeof LinearGradient,
  "@react-native-async-storage/async-storage": typeof AsyncStorage,
  "react-native-localize": typeof Localize,
  "react-native-google-mobile-ads": typeof Ads,
  "react-native-bootsplash": typeof BootSplash,
  "react-native-webview": typeof WebView,
}