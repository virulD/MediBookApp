# Building APK with GitHub Actions

This project uses GitHub Actions to automatically build Android APKs without using EAS (Expo Application Services).

## Workflows

### 1. Build APK Workflow (`build-android.yml`)

This workflow automatically builds an APK on:
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch
- Manual trigger via GitHub Actions UI

**What it does:**
- Sets up Java 17 and Node.js 18
- Installs npm dependencies
- Sets up Android SDK
- Builds the APK using Gradle
- Uploads the APK as a GitHub artifact

**To access the built APK:**
1. Go to your GitHub repository
2. Click on "Actions" tab
3. Click on the latest workflow run
4. Scroll down to "Artifacts" section
5. Download "MediBookApp-APK"

### 2. Release Workflow (`release.yml`)

This workflow creates a GitHub release with APK when you push a tag.

**To create a release:**
1. Create and push a tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
2. The workflow will automatically:
   - Build the APK
   - Create a GitHub release
   - Upload the APK to the release

## Manual Build

If you want to build locally:

```bash
# Install dependencies
npm install

# Build Android APK
cd android
./gradlew assembleRelease
```

The APK will be located at: `android/app/build/outputs/apk/release/app-release.apk`

## Requirements

- Node.js 18+
- Java 17+
- Android SDK (automatically set up in GitHub Actions)

## Notes

- The APK is signed with the debug keystore for development purposes
- For production releases, you should configure a proper signing key
- The build uses the latest Android SDK and build tools
- Gradle caching is enabled to speed up builds

## Troubleshooting

If the build fails:
1. Check the GitHub Actions logs for specific error messages
2. Ensure all dependencies are properly installed
3. Verify that the Android SDK setup is correct
4. Check that the Gradle wrapper is executable

## Security Note

The current configuration uses debug signing. For production releases, you should:
1. Generate a proper keystore
2. Store the keystore and passwords as GitHub secrets
3. Update the `android/app/build.gradle` to use the production signing config 