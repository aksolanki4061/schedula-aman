@echo off
REM ============================================
REM 1. DOCTOR SIGNUP
REM ============================================
echo.
echo ========== 1. DOCTOR SIGNUP ==========
echo URL: http://localhost:3000/auth/signup
echo METHOD: POST
echo Raw Data:
(
echo {
echo   "name": "Dr. Sarah Johnson",
echo   "email": "dr.sarah@example.com",
echo   "password": "SecurePass123!",
echo   "role": "DOCTOR"
echo }
)

curl -X POST http://localhost:3000/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Dr. Sarah Johnson\",\"email\":\"dr.sarah.json@example.com\",\"password\":\"SecurePass123!\",\"role\":\"DOCTOR\"}" > doctor_signup_response.json 2>&1

echo.
echo Response:
type doctor_signup_response.json

REM Extract token from response
for /f "tokens=2 delims=," %%A in (doctor_signup_response.json) do (
  if "%%A" neq "" (
    set "DOCTOR_TOKEN_LINE=%%A"
  )
)

REM ============================================
REM 2. CREATE DOCTOR PROFILE
REM ============================================
echo.
echo ========== 2. CREATE DOCTOR PROFILE ==========
echo URL: http://localhost:3000/doctor/profile
echo METHOD: POST
echo Headers: Authorization: Bearer {token}
echo Raw Data:
(
echo {
echo   "fullName": "Dr. Sarah Johnson",
echo   "specialization": "Cardiology",
echo   "experience": 10,
echo   "qualification": "MD, Board Certified Cardiologist",
echo   "consultationFee": 150.00,
echo   "availability": {
echo     "Monday": "09:00-17:00",
echo     "Tuesday": "09:00-17:00",
echo     "Wednesday": "09:00-17:00",
echo     "Thursday": "09:00-17:00",
echo     "Friday": "09:00-17:00"
echo   },
echo   "profileDetails": "Experienced cardiologist with 10 years of clinical practice"
echo }
)

REM This would need the actual token from above
echo.
echo Note: Run from Postman or Hoppscotch with actual token for complete testing
