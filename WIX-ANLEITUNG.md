# WärmeTechnik Deutschland – waermetechnikdeutschland.com · Wix Einbindung

## Neu in v2

- Marke: **WärmeTechnik Deutschland** · Domain: **waermetechnikdeutschland.com**
- **Hell-Theme Standard**, Dunkel per Top-Bar
- **30+ Sprachen** (Browser-Auto + Dropdown)
- **6-Schritt Formular** mit Energie-Flow & leuchtender Ampel am Ende
- **Über uns** mit Timeline (2010 → 2026)
- **sennder SVGs:** `assets/globe-new.svg`, `assets/map-animation.svg`

## Dateien

| Datei | Zweck |
|--------|--------|
| `wix-embed.html` | Eine Datei für iframe (nach `node build-embed.js`) |
| `index.html` | Lokale Vorschau |
| `assets/globe-new.svg` | Orange Sektion (von sennder.com) |
| `assets/map-animation.svg` | Grüne Sektion |

**Wichtig für iframe:** SVGs müssen mit gehostet werden – entweder kompletten Ordner hochladen oder in `wix-embed` Bilder als absolute URLs (eigene Domain) setzen.

## Wix iframe

1. Gesamten Ordner auf Netlify/GitHub Pages hochladen (nicht nur HTML – wegen SVG/Assets).
2. Wix: HTML iframe → `https://ihre-domain.de/index.html` oder `wix-embed.html`
3. Höhe: **min. 5500px** oder Scroll im Frame.

## CMS Collection: `WärmeTechnikLeads`

Felder wie zuvor `EurEnergyLeads`, plus `lang`, `propertyType`, `monthlyBill`, `usageUnknown`.

Velo `postMessage`:

```javascript
import wixData from 'wix-data';

$w.onReady(() => {
  // HTML iframe muss gleiche Origin oder postMessage nutzen
});
```

Payload-Typ: `EUGREEN_FORM_SUBMIT`

## Lokal testen

```powershell
cd "C:\Users\Kubilay Elmas\eurenergy-site"
npx --yes serve .
# http://localhost:3000
```

Embed neu bauen: `node build-embed.js`
