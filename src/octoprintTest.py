#!/usr/bin/env python3

import requests

# Replace with your OctoPrint API key
API_KEY = "FCF508F0D18C4321985BD6BC4387C1C3"

# Replace with your OctoPrint server address (e.g., http://octopi.local:5000)
OCTOPRINT_URL = "http://enderdream.local"

def get_print_status():
    try:
        response = requests.get(f"{OCTOPRINT_URL}/api/printer", headers={"X-Api-Key": API_KEY})
        data = response.json()
        print(data)

        # Extract relevant information
        print_status = data["state"]["text"]
        completion_percentage = data["progress"]["completion"]
        time_remaining = data["progress"]["printTimeLeft"]

        return print_status, completion_percentage, time_remaining
    except Exception as e:
        return None, None, None

if __name__ == "__main__":
    status, progress, time_left = get_print_status()

    if status:
        print(f"Print Status: {status}")
        print(f"Completion: {progress:.2f}%")
        print(f"Time Remaining: {time_left} seconds")
    else:
        print("Error fetching data from OctoPrint. Check your API key and server address.")
        print(status)
