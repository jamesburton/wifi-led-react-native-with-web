# wifi-led-react-native-with-web
A react-native (+web) application build to control my WiFi LED project via MQTT

# Build notes
- Use "npm install" to restore missing files
- Run the project with "npm run web" to view in browser (or use "npm run android" or "npm run ios" for mobile testing)
- The current version of react-native-for-web has not yet been updated to support react 15.4, which split features from "react" into "react-dom".  If you see any errors about missing references that include "react/lib/..." then simply tweak those references to "react-dom/lib/..." e.g. "react/lib/EventConstants" -> "react-dom/lib/EventConstants"
