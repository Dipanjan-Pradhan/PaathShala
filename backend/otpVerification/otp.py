import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from twilio.rest import Client
import random

# Load environment variables
load_dotenv()

# Fetch credentials securely
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

app = Flask(__name__)
otp_store = {}

@app.route("/send_otp", methods=["POST"])
def send_otp():
    data = request.json
    mobile = data.get("mobile")
    if not mobile:
        return jsonify({"error": "Mobile number required"}), 400

    otp = str(random.randint(100000, 999999))
    otp_store[mobile] = otp

    try:
        client.messages.create(
            body=f"Your OTP is {otp}",
            from_=TWILIO_PHONE_NUMBER,
            to=mobile
        )
        return jsonify({"message": "OTP sent successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/verify_otp", methods=["POST"])
def verify_otp():
    data = request.json
    mobile = data.get("mobile")
    otp = data.get("otp")

    if otp_store.get(mobile) == otp:
        return jsonify({"message": "OTP verified", "redirect_url": "src/student/index.html"})
    return jsonify({"error": "Invalid OTP"}), 400

if __name__ == "__main__":
    app.run(debug=True)
