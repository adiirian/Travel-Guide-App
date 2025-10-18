# TODO List for Travel Guide App Fixes

## 1. Add Missing Tourist Spots to Guides

- [x] Update `src/services/guidesService.js` to include all 8 tourist spots from MapScreen (add ids 6, 7, 8: Trinidad Kawasan Falls, Blood Compact Shrine, Bohol Bee Farm)

## 2. Fix Weather API Key Issue

- [x] Guide user to obtain a valid OpenWeatherMap API key
- [x] Update `src/services/weatherService.js` with the new API key (user provided valid key)
- [x] Test weather loading to ensure no more 401 errors (API test successful - returns 200 OK)
- [x] Fix weather location to default to Trinidad, Bohol instead of user location

## 3. Testing and Verification

- [x] Run the app and verify that Guides tab displays all 8 tourist spots
- [x] Test weather functionality in the app after API key update
- [x] Fix weather location to show Tagbilaran, Bohol instead of Estaca
