// weather-api-example.js - External API Integration with Express
const express = require('express');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// 🔧 MIDDLEWARE
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🌤️ WEATHER API INTEGRATION

// Example using OpenWeatherMap API (free tier available)
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Check if API key is configured
if (!WEATHER_API_KEY) {
  console.warn('⚠️  Warning: OPENWEATHER_API_KEY not found in environment variables');
  console.log('💡 Create a .env file with: OPENWEATHER_API_KEY=your_api_key_here');
}

// Home page with weather form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Weather App</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: Arial, sans-serif; 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 20px; 
          line-height: 1.6;
        }
        .weather-form { 
          background: #f5f5f5; 
          padding: 20px; 
          border-radius: 8px; 
          margin: 20px 0; 
        }
        .weather-result { 
          background: #e8f4fd; 
          padding: 15px; 
          border-radius: 8px; 
          margin: 15px 0; 
        }
        input, button { 
          padding: 10px; 
          margin: 5px; 
          border: 1px solid #ddd; 
          border-radius: 4px; 
        }
        button { 
          background: #007bff; 
          color: white; 
          cursor: pointer; 
        }
        button:hover { background: #0056b3; }
        .error { background: #f8d7da; color: #721c24; }
        .loading { background: #d4edda; color: #155724; }
      </style>
    </head>
    <body>
      <h1>🌤️ Weather App</h1>
      <p>Enter a city name to get current weather information:</p>
      
      <div class="weather-form">
        <input type="text" id="cityInput" placeholder="Enter city name (e.g., London, New York)" />
        <button onclick="getWeather()">Get Weather</button>
        <button onclick="getCurrentLocationWeather()">Use My Location</button>
      </div>
      
      <div id="weatherResult"></div>
      
      <h2>📚 How This Works</h2>
      <ol>
        <li><strong>Client Request:</strong> Browser sends city name to our server</li>
        <li><strong>Server Proxy:</strong> Our Express server calls external weather API</li>
        <li><strong>API Response:</strong> Weather service returns data to our server</li>
        <li><strong>Data Processing:</strong> Server processes and formats the data</li>
        <li><strong>Client Response:</strong> Formatted data sent back to browser</li>
      </ol>
      
      <h3>🔐 API Key Security</h3>
      <ul>
        <li>API key is stored safely on the server (in environment variables)</li>
        <li>Client never sees or handles the API key</li>
        <li>Server acts as a secure proxy for the external API</li>
        <li>We can add rate limiting, caching, and error handling</li>
      </ul>

      <script>
        async function getWeather() {
          const city = document.getElementById('cityInput').value.trim();
          const resultDiv = document.getElementById('weatherResult');
          
          if (!city) {
            resultDiv.innerHTML = '<div class="error">Please enter a city name!</div>';
            return;
          }
          
          resultDiv.innerHTML = '<div class="loading">🔄 Fetching weather data...</div>';
          
          try {
            const response = await fetch(\`/api/weather/city/\${encodeURIComponent(city)}\`);
            const data = await response.json();
            
            if (!response.ok) {
              throw new Error(data.error || 'Failed to fetch weather data');
            }
            
            displayWeather(data);
          } catch (error) {
            console.error('Weather fetch error:', error);
            resultDiv.innerHTML = \`<div class="error">❌ Error: \${error.message}</div>\`;
          }
        }
        
        async function getCurrentLocationWeather() {
          const resultDiv = document.getElementById('weatherResult');
          
          if (!navigator.geolocation) {
            resultDiv.innerHTML = '<div class="error">❌ Geolocation not supported by this browser</div>';
            return;
          }
          
          resultDiv.innerHTML = '<div class="loading">📍 Getting your location...</div>';
          
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            
            resultDiv.innerHTML = '<div class="loading">🔄 Fetching weather data...</div>';
            
            try {
              const response = await fetch(\`/api/weather/coordinates?lat=\${latitude}&lon=\${longitude}\`);
              const data = await response.json();
              
              if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch weather data');
              }
              
              displayWeather(data);
            } catch (error) {
              console.error('Weather fetch error:', error);
              resultDiv.innerHTML = \`<div class="error">❌ Error: \${error.message}</div>\`;
            }
          }, (error) => {
            resultDiv.innerHTML = \`<div class="error">❌ Location error: \${error.message}</div>\`;
          });
        }
        
        function displayWeather(data) {
          const resultDiv = document.getElementById('weatherResult');
          const temp = Math.round(data.temperature);
          const feelsLike = Math.round(data.feelsLike);
          
          resultDiv.innerHTML = \`
            <div class="weather-result">
              <h3>🌤️ Weather for \${data.city}, \${data.country}</h3>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div>
                  <strong>🌡️ Temperature:</strong> \${temp}°C (\${Math.round(temp * 9/5 + 32)}°F)<br>
                  <strong>🤔 Feels like:</strong> \${feelsLike}°C<br>
                  <strong>☁️ Conditions:</strong> \${data.description}
                </div>
                <div>
                  <strong>💧 Humidity:</strong> \${data.humidity}%<br>
                  <strong>🌬️ Wind:</strong> \${data.windSpeed} m/s<br>
                  <strong>👁️ Visibility:</strong> \${(data.visibility / 1000).toFixed(1)} km
                </div>
              </div>
              <p><small>📅 Last updated: \${new Date().toLocaleString()}</small></p>
            </div>
          \`;
        }
        
        // Allow Enter key to trigger weather search
        document.getElementById('cityInput').addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            getWeather();
          }
        });
      </script>
    </body>
    </html>
  `);
});

// 🌍 API ENDPOINT: Get weather by city name
app.get('/api/weather/city/:city', async (req, res) => {
  try {
    const city = req.params.city;
    
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }
    
    if (!WEATHER_API_KEY) {
      return res.status(500).json({ 
        error: 'Weather service not configured. Please set OPENWEATHER_API_KEY environment variable.' 
      });
    }
    
    console.log(\`🌤️ Fetching weather for city: \${city}\`);
    
    // Make API request to OpenWeatherMap
    const weatherUrl = \`\${WEATHER_BASE_URL}/weather?q=\${encodeURIComponent(city)}&appid=\${WEATHER_API_KEY}&units=metric\`;
    
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();
    
    if (!response.ok) {
      console.error('Weather API Error:', weatherData);
      return res.status(response.status).json({ 
        error: weatherData.message || 'Failed to fetch weather data' 
      });
    }
    
    // Process and format the weather data
    const formattedData = {
      city: weatherData.name,
      country: weatherData.sys.country,
      temperature: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      visibility: weatherData.visibility,
      coordinates: {
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon
      },
      timestamp: new Date().toISOString()
    };
    
    console.log(\`✅ Weather data retrieved for \${formattedData.city}\`);
    res.json(formattedData);
    
  } catch (error) {
    console.error('Weather API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch weather data. Please try again later.' 
    });
  }
});

// 📍 API ENDPOINT: Get weather by coordinates
app.get('/api/weather/coordinates', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    
    if (!WEATHER_API_KEY) {
      return res.status(500).json({ 
        error: 'Weather service not configured. Please set OPENWEATHER_API_KEY environment variable.' 
      });
    }
    
    console.log(\`🌤️ Fetching weather for coordinates: \${lat}, \${lon}\`);
    
    // Make API request to OpenWeatherMap
    const weatherUrl = \`\${WEATHER_BASE_URL}/weather?lat=\${lat}&lon=\${lon}&appid=\${WEATHER_API_KEY}&units=metric\`;
    
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();
    
    if (!response.ok) {
      console.error('Weather API Error:', weatherData);
      return res.status(response.status).json({ 
        error: weatherData.message || 'Failed to fetch weather data' 
      });
    }
    
    // Process and format the weather data
    const formattedData = {
      city: weatherData.name,
      country: weatherData.sys.country,
      temperature: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      visibility: weatherData.visibility,
      coordinates: {
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon
      },
      timestamp: new Date().toISOString()
    };
    
    console.log(\`✅ Weather data retrieved for \${formattedData.city}\`);
    res.json(formattedData);
    
  } catch (error) {
    console.error('Weather API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch weather data. Please try again later.' 
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(\`🌤️ Weather API server running on http://localhost:\${PORT}\`);
  if (WEATHER_API_KEY) {
    console.log('🔑 Weather API key configured');
  } else {
    console.log('⚠️  Weather API key not configured - add OPENWEATHER_API_KEY to .env file');
  }
});

// 📚 TEACHING NOTES:

/*
API INTEGRATION PATTERNS DEMONSTRATED:

1. SERVER-SIDE PROXY PATTERN:
   - Client → Our Server → External API → Our Server → Client
   - Keeps API keys secure on server
   - Allows data processing and formatting
   - Handles CORS issues
   - Enables rate limiting and caching

2. ENVIRONMENT VARIABLE SECURITY:
   - API keys stored in .env file (not committed to git)
   - Accessed via process.env.VARIABLE_NAME
   - Fail gracefully when keys are missing

3. ERROR HANDLING:
   - Check for missing required parameters
   - Handle API errors gracefully
   - Provide meaningful error messages to client
   - Log errors for debugging

4. DATA TRANSFORMATION:
   - Receive complex API response
   - Extract only needed data
   - Format for client consumption
   - Add additional calculated fields

5. ASYNC/AWAIT PATTERN:
   - Clean error handling with try/catch
   - Sequential async operations
   - Proper error propagation

SETUP INSTRUCTIONS:
1. npm init -y
2. npm install express dotenv
3. Get API key from openweathermap.org (free)
4. Create .env file: OPENWEATHER_API_KEY=your_key_here
5. Add .env to .gitignore
6. Run: node weather-api-example.js

NEXT STEPS:
- Add data caching to reduce API calls
- Implement rate limiting
- Add more weather data sources
- Store weather history in database
- Add user authentication
*/