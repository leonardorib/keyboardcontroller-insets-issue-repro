# Keyboard Controller System Insets Issue Repro

## Issue Description

When the `KeyboardProvider` from `react-native-keyboard-controller` is rendered and `statusBarTranslucent` is `true`, which is always the case for edge-to-edge, the top system inset is overriden, which can impact Android native views relying on it.

## What the reproducer is doing

I created a minimal scenario with an Android native component that is relying on the system insets to position something at the top of the screen. Which in this case is a dummy "close button".

## Context and real affected use case

I came across this issue when integrating with [RevenueCat paywalls](https://www.revenuecat.com/docs/tools/paywalls/displaying-paywalls). The idea is: you create a Paywall in their dashboard, calls `presentPaywall`or renders the `PurchasesUI.Paywall` component and the paywall you built will be rendered in the app.

I noticed that the paywall close button was colliding with the statusbar on Android. It was not being able to account for the statusbar size. At first I thought it was an issue with their SDK, but after I removed the `KeyboardProvider` from `react-native-keyboard-controller` the issue was solved.

After some investigation I noticed that `react-native-keyboard-controller` replaces the system window insets on Android:

https://github.com/kirillzyusko/react-native-keyboard-controller/blob/f5d6ea2a05ea09715b29d61d64946fadb045a7c6/android/src/main/java/com/reactnativekeyboardcontroller/views/EdgeToEdgeReactViewGroup.kt#L115-L120

When I replaced `if (this.isStatusBarTranslucent) 0 else defaultInsets.systemWindowInsetTop` with simply `defaultInsets.systemWindowInsetTop`, therefore keeping it all as default, I didn't get the issue anymore.

## How Revenuecat Paywall relies on it

I noticed they are relying on it for example here:

https://github.com/RevenueCat/purchases-android/blob/daa30fdb874145878e40ffea154351da4dcbc4ea/ui/revenuecatui/src/main/kotlin/com/revenuecat/purchases/ui/revenuecatui/composables/CloseButton.kt#L23-L29

https://github.com/RevenueCat/purchases-android/blob/daa30fdb874145878e40ffea154351da4dcbc4ea/ui/revenuecatui/src/main/kotlin/com/revenuecat/purchases/ui/revenuecatui/composables/InsetSpacers.kt#L13-L19

## Video demo

[keyboard-controller-insets-issue-demo.webm](https://github.com/user-attachments/assets/29c15990-fbbb-4f8f-966e-c51a38555fee)
