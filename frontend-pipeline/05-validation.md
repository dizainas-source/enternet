# 05 – Chrome DevTools patikra

Po kiekvieno finalaus pakeitimo atidaryk lokalų Vite URL per Chrome DevTools MCP.

## Layout ir assetai

- Patikrink desktop 1920 px ir mobile 390×844.
- Palygink su Figma screenshot: `getBoundingClientRect()`, `getComputedStyle()`, tarpus, šriftą, spalvas, z tvarką ir overflow.
- Patikrink kiekvieno matomo asseto `currentSrc`, `naturalWidth`, `naturalHeight` ir rendered dydį.

## Interakcija

- Per Chrome DevTools tikrai paspausk kiekvieną pakeistą valdiklį.
- Patikrink pasirinktą DOM wrapperį, `transform`, z-index ir realų screenshot po veiksmo.
- Scroll interakcijai patikrink pradinę, tarpinę ir galinę scroll būseną.
- Patikrink konsolę. Kiekviena nauja klaida blokuoja užbaigimą.

Kartok `implement → test → fix`, kol visi kriterijai praeina. Build vienas pats nėra įrodymas.
