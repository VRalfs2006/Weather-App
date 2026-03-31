# Weather App

A modern, responsive weather application built with React and Vite. This application fetches weather data from the OpenWeatherMap API and displays it in a user-friendly interface.

## Features

- **Current Weather**: Displays temperature, weather conditions, humidity, wind speed, and UV index.
- **5-Day Forecast**: Shows a daily forecast for the next five days with high and low temperatures.
- **Search Functionality**: Allows users to search for weather in different cities.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.
- **Dark Mode**: Automatic theme switching based on system preference.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: OpenWeatherMap

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Weather-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Add your OpenWeatherMap API key to the `.env` file:
   ```env
   VITE_API_KEY=your_api_key_here
   ```

## Usage

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.