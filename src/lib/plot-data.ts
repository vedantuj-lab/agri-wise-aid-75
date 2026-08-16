// Synthetic demo plot data (clearly labelled as such in the UI).
// Stands in for Google Earth Engine (Sentinel-2 NDVI), SoilGrids and a weather API.

export const plot = {
  id: "AGN-IN-0417",
  farmer: "Lakshmi Bhosale",
  village: "Ozar, Nashik",
  country: "India",
  coords: "20.1005° N, 73.9280° E",
  areaHa: 1.2,
  crop: "Tomato (Rupali F1)",
  sowedOn: "2026-06-08",
  soilType: "Medium black (Vertisol)",
  soilPh: 7.4,
  organicCarbon: 0.52,
  healthScore: 72,
};

export const ndviSeries = [
  { week: "W1", ndvi: 0.28, regional: 0.3 },
  { week: "W2", ndvi: 0.35, regional: 0.36 },
  { week: "W3", ndvi: 0.44, regional: 0.43 },
  { week: "W4", ndvi: 0.56, regional: 0.51 },
  { week: "W5", ndvi: 0.63, regional: 0.58 },
  { week: "W6", ndvi: 0.68, regional: 0.62 },
  { week: "W7", ndvi: 0.64, regional: 0.63 },
  { week: "W8", ndvi: 0.57, regional: 0.62 },
  { week: "W9", ndvi: 0.51, regional: 0.61 },
];

export const soilMoisture = [
  { day: "Mon", moisture: 31, optimal: 35 },
  { day: "Tue", moisture: 29, optimal: 35 },
  { day: "Wed", moisture: 26, optimal: 35 },
  { day: "Thu", moisture: 24, optimal: 35 },
  { day: "Fri", moisture: 22, optimal: 35 },
  { day: "Sat", moisture: 33, optimal: 35 },
  { day: "Sun", moisture: 38, optimal: 35 },
];

export const forecast = [
  { day: "Mon", tempC: 31, rainMm: 0 },
  { day: "Tue", tempC: 32, rainMm: 0 },
  { day: "Wed", tempC: 33, rainMm: 2 },
  { day: "Thu", tempC: 30, rainMm: 6 },
  { day: "Fri", tempC: 28, rainMm: 18 },
  { day: "Sat", tempC: 27, rainMm: 24 },
  { day: "Sun", tempC: 29, rainMm: 9 },
];

export const alerts = [
  {
    level: "urgent" as const,
    title: "Rain expected in 48h — delay pesticide spraying",
    body: "18–24 mm forecast Fri–Sat. Foliar sprays applied before then will wash off. Spray Sunday evening instead.",
  },
  {
    level: "warning" as const,
    title: "NDVI down 19% over 3 weeks",
    body: "Your plot's vegetation index is now below the Nashik regional average — consistent with early blight pressure plus moisture stress.",
  },
  {
    level: "info" as const,
    title: "Soil moisture recovering",
    body: "Skip Sunday irrigation. Resume a 12 mm drip cycle Tuesday if no further rainfall.",
  },
];

export const hotspots = [
  { region: "Nashik, IN", crop: "Tomato", issue: "Early blight", plots: 412, risk: 82 },
  { region: "Guntur, IN", crop: "Chilli", issue: "Thrips", plots: 288, risk: 71 },
  { region: "Mato Grosso, BR", crop: "Soybean", issue: "Asian rust", plots: 634, risk: 77 },
  { region: "Free State, ZA", crop: "Maize", issue: "Fall armyworm", plots: 197, risk: 64 },
  { region: "Krasnodar, RU", crop: "Wheat", issue: "Yellow rust", plots: 233, risk: 48 },
  { region: "Henan, CN", crop: "Wheat", issue: "Aphid pressure", plots: 519, risk: 41 },
];

export const plotContext = `Plot ${plot.id} — ${plot.farmer}, ${plot.village}, ${plot.country} (${plot.coords}), ${plot.areaHa} ha.
Crop: ${plot.crop}, sown ${plot.sowedOn}. Soil: ${plot.soilType}, pH ${plot.soilPh}, organic carbon ${plot.organicCarbon}%.
Satellite NDVI last 3 readings: 0.57, 0.51 (falling; regional average 0.61).
Soil moisture last 7 days (% VWC): 31, 29, 26, 24, 22, 33, 38. Optimal band 33-38%.
7-day forecast: hot and dry Mon-Wed (31-33C), rain Thu-Sun totalling ~57 mm, peak 24 mm Saturday.
Known field issue: suspected early blight on lower leaves, moderate severity.
Farmer prefers organic and low-cost inputs; irrigation is drip.`;
