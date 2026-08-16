# AgriN Partner

AgriN — AI-Powered Regenerative Agricultural Intelligence

Hack2Skill BRICS Hackathon — Problem Statement 04 (Theme: Cooperation)

1. Problem Recap

Small and marginal farmers across emerging economies lack access to data-driven agricultural guidance. Reliance on traditional methods instead of satellite data, soil health analytics, and climate forecasting leads to crop failure and threatens food security. There is no shared digital infrastructure that lets BRICS nations collaborate on climate-resilient farming.

2. Solution Overview

AgriN is an interoperable, AI-first digital agriculture platform — designed as a Digital Public Good — that gives any smallholder farmer, in their own language, on any device, three things a large commercial farm already has: a diagnosis for what's wrong with their crop, a forecast for what's coming, and a recommendation for what to do next.

It is built around a simple loop:

Sense → Diagnose → Advise → Learn, fed by satellite, weather, and soil data, and delivered through a Gemini-powered conversational interface that works over voice, text, or a low-bandwidth app — with the underlying data models designed to be shared across BRICS nations rather than siloed per-country.

3. Core Features

3.1 Crop Disease & Pest Diagnostic (flagship demo feature)

Farmer photographs a diseased leaf → Gemini's multimodal vision model identifies the disease/pest, severity, and recommends an organic-first treatment plan. Works offline-first (photo queued, diagnosed on reconnect).

3.2 Personalised Regenerative Agro-Advisory

Combines the farmer's plot location with satellite NDVI (vegetation health), soil moisture/type, and short-term weather forecasts to recommend what to plant, when to irrigate, and regenerative practices (cover cropping, crop rotation, reduced tillage) suited to that soil.

3.3 Conversational Multilingual Assistant

A Gemini-powered chat/voice assistant answers free-form questions ("Why are my tomato leaves curling?") in the farmer's own language, using Speech-to-Text + Translation for voice-first, low-literacy users.

3.4 Soil, Weather & Satellite Health Dashboard

A visual dashboard (for the farmer or an agri-extension officer) showing NDVI trend, soil moisture, rainfall forecast, and a regional heat/pest-risk map — built on Google Earth Engine.

3.5 Cross-Border Data Cooperation Layer (vision / stretch goal)

An anonymised, federated model-sharing layer so a disease-detection model trained on Indian cotton data can improve a similar model in Brazil or South Africa without raw data ever leaving the country — directly answering the "BRICS Theme: Cooperation" brief.

4. System Architecture

(see the diagram above)

Farmer input — photo, voice note, or typed query via a lightweight web/PWA app or WhatsApp-style messaging bot.

Google AI layer — Gemini Vision for image diagnosis, Gemini for reasoning/advisory generation, Speech-to-Text + Translation API for multilingual voice.

Data fusion layer — Google Earth Engine (satellite NDVI/soil), a weather API (rainfall/temperature forecast), and a soil-type dataset, merged by geolocation.

Advisory output — diagnosis, tailored recommendations, and proactive alerts pushed back to the farmer, plus aggregate views for extension officers/policymakers.

5. Tech Stack & Google AI Mapping

Layer Technology Purpose Frontend (farmer app) React / PWA, or WhatsApp Business API bot Low-bandwidth, mobile-first access Image diagnosis Gemini API (multimodal / vision) Crop disease & pest identification from photos Conversational advisory Gemini API (text) Natural-language Q&A, recommendation generation Voice input Google Cloud Speech-to-Text Voice queries for low-literacy users Language Google Cloud Translation API Multilingual support across BRICS languages Satellite/soil data Google Earth Engine NDVI, land cover, soil moisture layers Forecasting Vertex AI (AutoML/Forecasting) Yield risk, pest outbreak, climate-stress prediction Backend Firebase / Cloud Run + Firestore Auth, storage, serverless API Dashboard Chart.js / D3 on a web dashboard Visual insights for officers/policymakers Data sharing (stretch) Federated learning via TensorFlow Federated Cross-border model improvement without raw data transfer

6. Data Sources (all realistically available for a hackathon)

Sentinel-2 / Landsat imagery via Google Earth Engine (NDVI, land use)

PlantVillage / PlantDoc open datasets for disease-classifier fine-tuning or few-shot prompting

OpenWeatherMap / Google Weather API for rainfall & temperature forecasts

Soil data: SoilGrids (ISRIC) or national soil-health card data (India) as a stand-in

Synthetic farmer/plot data you generate for demo purposes (clearly labelled as such)

7. User Flow

Farmer opens the app/bot → selects language.

Registers plot location (pin on map or village name) → system pulls satellite + soil + weather data for that plot.

Farmer either: (a) uploads a crop photo → gets instant diagnosis + treatment, or (b) asks a question by voice/text → gets a Gemini-generated answer grounded in their plot's real data.

Dashboard shows a running health score for the plot and proactive alerts ("Rain expected in 48h — delay pesticide spraying").

Extension officers/policymakers see an aggregated regional view (disease hotspots, irrigation stress zones) — this is the thread that ties back to national-scale decision-making.

8. 36-Hour Build Plan (suggested prioritisation)

Time Milestone 0–4h Finalise scope, set up Firebase project, Gemini API keys, basic React shell 4–10h Build crop disease detector: image upload → Gemini Vision prompt → structured diagnosis response 10–16h Build conversational advisory chat (Gemini text + basic RAG on your own agri-knowledge snippets) 16–22h Integrate Earth Engine (or precomputed sample data if API quota/time is tight) for NDVI + soil layer 22–28h Build dashboard with charts (soil moisture, NDVI trend, weather forecast) 28–32h Add voice input (Speech-to-Text) + one non-English language via Translation API 32–36h Polish UI, prepare demo script, rehearse pitch, stress-test the live demo path

If time is short, cut in this order: federated learning (stretch, cut first) → voice input → multi-language → dashboard polish. Never cut the disease-detection demo — it is your single most convincing, judge-facing moment.

9. Demo Script (3 minutes)

Hook (20s): State the problem in one line — "600 million smallholder farmers make planting and treatment decisions with no data. AgriN gives them a satellite-and-AI-powered agronomist in their pocket, in their language."

Live diagnosis (60s): Photograph a real or sample diseased leaf on stage → show Gemini's diagnosis + treatment appear in seconds.

Live advisory (45s): Ask the chatbot a question by voice in a regional language → show grounded, plot-specific answer.

Dashboard (30s): Show the NDVI/soil/weather dashboard and one proactive alert.

Cooperation angle (25s): Close on the federated-learning vision — how a model improvement in one BRICS nation lifts outcomes in another, tying directly back to the "Cooperation" theme.

10. Why This Wins

Deepest, most natural Google AI integration of the four problem statements — Gemini Vision, Gemini text, Speech-to-Text, Translation, and Earth Engine all have a genuine, non-forced job to do.

Demo-able with real, public data — no need to fabricate government datasets to look credible.

Visually compelling — a live "photo in, diagnosis out" moment is the single strongest 60 seconds you can put in front of judges.

Directly answers the BRICS "Cooperation" theme through the federated data-sharing vision, without needing to build it fully for the MVP.

11. Post-Hackathon Roadmap

Fine-tune a dedicated crop-disease vision model per major BRICS crop (rice, cotton, soy, wheat, maize) instead of relying purely on prompting.

Formal Digital Public Good registration, open API for state agriculture departments.

Federated learning pilot between two BRICS nations' agri-ministries.

SMS/USSD fallback channel for feature-phone farmers with no smartphone or data access.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://agri-wise-aid-75.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4b4cd4a5-c833-4338-a6d7-583540a7aba7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
