# T4 App - Readme

## Description

T4 App is a simple app for calculate medication compilance. It's a simple app for a simple problem. The app is developed in Framework7, Capacitor and NextJS.

## Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Run the app

```bash
npm run dev
```

## Build to APK

1. Build the app

```bash
npm run static
```

2. Open Android Studio and open the project and sync

```bash
npx cap open android
npx cap copy
npx cap sync
```

3.  Build the APK according to the docs of Android Studio

## Env file explanation

```bash
NEXT_PUBLIC_HOST=https://localhost:3000
```

- NEXT_PUBLIC_HOST: The host of the app
