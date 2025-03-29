from flask import Flask, request, jsonify
import joblib
import numpy as np
import requests
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load trained ML model
model = joblib.load("parking_slot_model.pkl")

# Load trained scaler
scaler = joblib.load("scaler.pkl")  # ✅ Load scaler here

# OpenWeather API
def get_weather_data():
    API_KEY = "b50a43f9b8547b97f96f45673ef24dd1"
    CITY = "Chennai"
    URL = f"http://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric"

    response = requests.get(URL)

    # Check if API request was successful
    if response.status_code != 200:
        return "API Error", "API Error", -1  # Return default values

    weather_data = response.json()
    if "main" not in weather_data or "weather" not in weather_data:
        return "API Error", "API Error", -1  # Return default values
    
    temp_max = weather_data["main"]["temp_max"]
    temp_min = weather_data["main"]["temp_min"]
    weather_description = weather_data["weather"][0]["description"]

    # Convert description to Weather_Code (use mapping from training data)
    weather_mapping = {"clear sky": 0, "Dense drizzle": 1, "Heavy rain": 2,"Light drizzle":3,"Mainly clear":4,"Moderate drizzle":5,"Moderate rain":6,
                       "Overcast":7,"Partly cloudy":8,"Slight rain":9}  
#     'Clear sky' -> 0
# 'Dense drizzle' -> 1
# 'Heavy rain' -> 2
# 'Light drizzle' -> 3
# 'Mainly clear' -> 4
# 'Moderate drizzle' -> 5
# 'Moderate rain' -> 6
# 'Overcast' -> 7
# 'Partly cloudy' -> 8
# 'Slight rain' -> 9
    weather_code = weather_mapping.get(weather_description, -1)

    return temp_max, temp_min, weather_code

# Check if today is a holiday
HOLIDAYS = ["2025-01-01", "2025-12-25"]  

def is_today_holiday():
    today = datetime.today().strftime("%Y-%m-%d")
    return 1 if today in HOLIDAYS else 0

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Fetch weather dynamically
        temp_max, temp_min, weather_code = get_weather_data()

        # Get current date info
        day_of_week = datetime.today().weekday()
        is_weekend = 1 if day_of_week in [5, 6] else 0
        is_holiday = is_today_holiday()

        # Get input data
        data = request.json
        total_vehicles_entered = data["Total_Vehicles_Entered"]

        # Create feature array
        features = np.array([[day_of_week, is_weekend, is_holiday, temp_max, temp_min, weather_code, total_vehicles_entered]])

        # ✅ Apply scaling before prediction
        features_scaled = scaler.transform(features)

        # Predict
        prediction = model.predict(features_scaled)[0] * 100  # Convert to percentage
        return jsonify({"chanceOfGettingSlot": round(prediction, 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)