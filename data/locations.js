/* WaermeTechknik Deutschland – geo positions on map viewBox 0 0 483 480 (sennder map-animation) */
window.EUR_GEO = function (lon, lat) {
  const x = ((lon + 11) / 43) * 483;
  const y = ((71 - lat) / 36) * 480;
  return { x: +x.toFixed(1), y: +y.toFixed(1) };
};

window.EUR_LOCATIONS = {
  DE: {
    name: "Deutschland", flag: "🇩🇪",
    offices: [
      { city: "Berlin", address: "Friedrichstraße 68, 10117 Berlin", phone: "+49 30 1234 5601", email: "de-berlin@waermetechknik.com", lon: 13.405, lat: 52.52 },
      { city: "München", address: "Leopoldstraße 112, 80802 München", phone: "+49 89 1234 5602", email: "de-muenchen@waermetechknik.com", lon: 11.582, lat: 48.135 },
      { city: "Hamburg", address: "Speersort 1, 20095 Hamburg", phone: "+49 40 1234 5603", email: "de-hamburg@waermetechknik.com", lon: 9.993, lat: 53.551 },
      { city: "Köln", address: "Domstraße 10, 50667 Köln", phone: "+49 221 1234 5604", email: "de-koeln@waermetechknik.com", lon: 6.9603, lat: 50.9375 },
      { city: "Frankfurt", address: "Zeil 106, 60313 Frankfurt", phone: "+49 69 1234 5605", email: "de-frankfurt@waermetechknik.com", lon: 8.6821, lat: 50.1109 }
    ]
  },
  FR: { name: "Frankreich", flag: "🇫🇷", offices: [{ city: "Paris", address: "24 rue Petrelle, 75009 Paris", phone: "+33 1 89 71 09 02", email: "fr@waermetechknik.com", lon: 2.3522, lat: 48.8566 }] },
  NL: { name: "Niederlande", flag: "🇳🇱", offices: [{ city: "Amsterdam", address: "Trompenburgstraat 2c, 1079 TX", phone: "+31 20 808 0243", email: "nl@waermetechknik.com", lon: 4.9041, lat: 52.3676 }] },
  IT: { name: "Italien", flag: "🇮🇹", offices: [{ city: "Milano", address: "Via Arbe 49, 20125 Milano", phone: "+39 02 8295 4676", email: "it@waermetechknik.com", lon: 9.19, lat: 45.4642 }] },
  ES: { name: "Spanien", flag: "🇪🇸", offices: [{ city: "Barcelona", address: "Avinguda Diagonal 123", phone: "+34 639 98 53 09", email: "es@waermetechknik.com", lon: 2.1734, lat: 41.3851 }] },
  PL: { name: "Polen", flag: "🇵🇱", offices: [{ city: "Wrocław", address: "ul. Powstańców Śląskich 17", phone: "+48 71 881 03 40", email: "pl@waermetechknik.com", lon: 17.0385, lat: 51.1079 }] },
  AT: { name: "Österreich", flag: "🇦🇹", offices: [{ city: "Wien", address: "Mariahilfer Straße 88, 1070 Wien", phone: "+43 1 234 5606", email: "at@waermetechknik.com", lon: 16.3738, lat: 48.2082 }] },
  BE: { name: "Belgien", flag: "🇧🇪", offices: [{ city: "Brüssel", address: "Avenue Louise 250", phone: "+32 2 808 0243", email: "be@waermetechknik.com", lon: 4.3517, lat: 50.8503 }] },
  PT: { name: "Portugal", flag: "🇵🇹", offices: [{ city: "Lissabon", address: "Av. da Liberdade 110", phone: "+351 21 123 4567", email: "pt@waermetechknik.com", lon: -9.1393, lat: 38.7223 }] },
  SE: { name: "Schweden", flag: "🇸🇪", offices: [{ city: "Stockholm", address: "Kungsgatan 33", phone: "+46 8 123 4567", email: "se@waermetechknik.com", lon: 18.0686, lat: 59.3293 }] },
  DK: { name: "Dänemark", flag: "🇩🇰", offices: [{ city: "Kopenhagen", address: "Vesterbrogade 6", phone: "+45 33 123 456", email: "dk@waermetechknik.com", lon: 12.5683, lat: 55.6761 }] },
  CZ: { name: "Tschechien", flag: "🇨🇿", offices: [{ city: "Prag", address: "Václavské nám. 28", phone: "+420 222 123 456", email: "cz@waermetechknik.com", lon: 14.4378, lat: 50.0755 }] },
  RO: { name: "Rumänien", flag: "🇷🇴", offices: [{ city: "Bukarest", address: "Str. Progresului 1-3", phone: "+40 371 700 442", email: "ro@waermetechknik.com", lon: 26.1025, lat: 44.4268 }] },
  LV: { name: "Lettland", flag: "🇱🇻", offices: [{ city: "Riga", address: "Krišjāņa Valdemāra iela 62", phone: "+371 63 588 681", email: "lv@waermetechknik.com", lon: 24.1052, lat: 56.9496 }] },
  IE: { name: "Irland", flag: "🇮🇪", offices: [{ city: "Dublin", address: "Grand Canal Dock", phone: "+353 1 234 5678", email: "ie@waermetechknik.com", lon: -6.2603, lat: 53.3498 }] },
  GR: { name: "Griechenland", flag: "🇬🇷", offices: [{ city: "Athen", address: "Leof. Vasilissis Sofias 45", phone: "+30 210 123 4567", email: "gr@waermetechknik.com", lon: 23.7275, lat: 37.9838 }] },
  HU: { name: "Ungarn", flag: "🇭🇺", offices: [{ city: "Budapest", address: "Andrássy út 60", phone: "+36 1 234 5678", email: "hu@waermetechknik.com", lon: 19.0402, lat: 47.4979 }] },
  FI: { name: "Finnland", flag: "🇫🇮", offices: [{ city: "Helsinki", address: "Mannerheimintie 12", phone: "+358 9 123 4567", email: "fi@waermetechknik.com", lon: 24.9384, lat: 60.1699 }] }
};

window.EUR_MAP_COUNTRIES = Object.keys(window.EUR_LOCATIONS).map((id) => {
  const o = window.EUR_LOCATIONS[id].offices[0];
  const p = window.EUR_GEO(o.lon, o.lat);
  return { id, x: p.x, y: p.y };
});

window.EUR_DE_CITIES = window.EUR_LOCATIONS.DE.offices.map((o, i) => {
  const p = window.EUR_GEO(o.lon, o.lat);
  return { id: "DE", index: i, city: o.city, x: p.x, y: p.y };
});
