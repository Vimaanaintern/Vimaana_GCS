# VimaanaGCS - APK banane ka tarika (Android)

Yeh source QGroundControl se rebrand kiya gaya hai (naam, logo, icons, colors). Isse APK banane ke liye
Qt + Android SDK/NDK chahiye. Versions `.github/build-config.json` mein hain:

- Qt 6.11.1 (Android arm64-v8a, aur modules: qtgraphs qtlocation qtpositioning qtspeech qtmultimedia
  qtserialport qtimageformats qtshadertools qtconnectivity qtquick3d qtsensors qtscxml qtwebsockets qthttpserver)
- Android SDK platform 36, build-tools 36.0.0, NDK 27.2.12479018 (r27c), Java 21
- CMake 3.25+, Ninja, Python 3, aur GStreamer for Android (video ke liye)

## Steps (Linux ya Windows par)

1. Qt install karein: `python tools/setup/install_qt.py --version 6.11.1 --host linux --arch android_arm64_v8a`
   (Windows par `--host windows`). Ya Qt Online Installer se Qt for Android (arm64-v8a) lein.
2. Environment variables set karein: `ANDROID_SDK_ROOT`, `ANDROID_NDK` (ya `ANDROID_NDK_ROOT`), `JAVA_HOME` (Java 21),
   `ANDROID_MIN_SDK=28`, aur `QT_ROOT_DIR` / `CMAKE_PREFIX_PATH` Qt Android folder par.
3. Configure + build:
   `cmake --preset Android`
   `cmake --build --preset Android`
4. APK `build/Android/` ke andar `android-build/` folder mein milega (naam `VimaanaGCS.apk`).
5. Release APK ko apni keystore se sign karein (`QT_ANDROID_SIGN_APK=ON` + keystore variables) tabhi phone par
   install/Play Store ke liye sahi chalega.

Agar GitHub Actions use karna ho, to is repo ko GitHub par push karke upstream ka Android workflow copy karein
(`mavlink/qgroundcontrol` ke `.github/workflows/android.yml`), woh Qt/SDK sab khud install karke APK bana deta hai.

## Kya-kya badla gaya

- App naam: `QGroundControl` -> `VimaanaGCS` (cmake/CustomOptions.cmake, UI text, installer, Android label)
- Company: `Vimaana Technologies`; Android package id: `com.vimaana.gcs`
- Logo: resources/QGCLogoFull.svg, QGCLogoWhite.svg, QGCLogoBlack.svg (vector), resources/icons/*, Android
  mipmap/drawable icons, splash, Windows installer header, macOS icns, Linux icon
- Colors: src/QmlControls/QGCPalette.cc (red/green theme)
- Version fallback: v1.0.0 (git tag na ho to), upstream update-check band
- Heading arrow (map par GCS ka direction wala arrow, QGCLogoArrow.svg) jaan-bujh kar nahi badla (direction dikhane ke liye)

## Dhyan dein

- `qgroundcontrol.com` domain/URLs (Help links, organization domain) abhi wahi hain; apna domain dena ho to
  `QGC_ORG_DOMAIN` (cmake/CustomOptions.cmake) aur `stableDownloadUrl()` (src/API/QGCCorePlugin.h) badlein.
- Deb package maintainer email placeholder hai (`noreply@example.com`), apna email daalein.
- QGroundControl Apache-2.0/GPLv3 license ke tahat hai: LICENSE files aur "based on QGroundControl" credit rakhein.
