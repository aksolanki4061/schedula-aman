#!/usr/bin/env pwsh

# Allow self-signed certificates
add-type @"
    using System.Net;
    using System.Security.Cryptography.X509Certificates;
    public class TrustAllCertsPolicy : ICertificatePolicy {
        public bool CheckValidationResult(
            ServicePoint srvPoint, X509Certificate certificate,
            WebRequest request, int certificateProblem) {
            return true;
        }
    }
"@
[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy

# ============================================
# 1. DOCTOR SIGNUP
# ============================================
Write-Host "=== 1. DOCTOR SIGNUP ===" -ForegroundColor Green
Write-Host "URL: http://localhost:3000/auth/signup" -ForegroundColor Yellow
Write-Host "METHOD: POST" -ForegroundColor Yellow
$doctorSignupBody = @{
    name = "Dr. Sarah Johnson"
    email = "dr.sarah@example.com"
    password = "SecurePass123!"
    role = "DOCTOR"
} | ConvertTo-Json
Write-Host "Raw Data:" -ForegroundColor Cyan
Write-Host $doctorSignupBody
Write-Host ""

$doctorSignupResponse = Invoke-WebRequest -Uri "http://localhost:3000/auth/signup" -Method POST -ContentType "application/json" -Body $doctorSignupBody -UseBasicParsing
$doctorData = $doctorSignupResponse.Content | ConvertFrom-Json
$doctorToken = $doctorData.accessToken
$doctorUserId = $doctorData.user.id

Write-Host "Response:" -ForegroundColor Cyan
Write-Host ($doctorData | ConvertTo-Json -Depth 5)
Write-Host ""

# ============================================
# 2. CREATE DOCTOR PROFILE
# ============================================
Write-Host "=== 2. CREATE DOCTOR PROFILE ===" -ForegroundColor Green
Write-Host "URL: http://localhost:3000/doctor/profile" -ForegroundColor Yellow
Write-Host "METHOD: POST" -ForegroundColor Yellow
Write-Host "Headers: Authorization: Bearer <token>" -ForegroundColor Yellow
$doctorProfileBody = @{
    fullName = "Dr. Sarah Johnson"
    specialization = "Cardiology"
    experience = 10
    qualification = "MD, Board Certified Cardiologist"
    consultationFee = 150.00
    availability = @{
        Monday = "09:00-17:00"
        Tuesday = "09:00-17:00"
        Wednesday = "09:00-17:00"
        Thursday = "09:00-17:00"
        Friday = "09:00-17:00"
    }
    profileDetails = "Experienced cardiologist with 10 years of clinical practice"
} | ConvertTo-Json
Write-Host "Raw Data:" -ForegroundColor Cyan
Write-Host $doctorProfileBody
Write-Host ""

$createDocResponse = Invoke-WebRequest -Uri "http://localhost:3000/doctor/profile" -Method POST -ContentType "application/json" -Body $doctorProfileBody -Headers @{Authorization = "Bearer $doctorToken"} -UseBasicParsing
$createDocData = $createDocResponse.Content | ConvertFrom-Json

Write-Host "Response:" -ForegroundColor Cyan
Write-Host ($createDocData | ConvertTo-Json -Depth 5)
Write-Host ""

# ============================================
# 3. GET DOCTOR PROFILE
# ============================================
Write-Host "=== 3. GET DOCTOR PROFILE ===" -ForegroundColor Green
Write-Host "URL: http://localhost:3000/doctor/profile" -ForegroundColor Yellow
Write-Host "METHOD: GET" -ForegroundColor Yellow
Write-Host "Headers: Authorization: Bearer <token>" -ForegroundColor Yellow

$getDocResponse = Invoke-WebRequest -Uri "http://localhost:3000/doctor/profile" -Method GET -Headers @{Authorization = "Bearer $doctorToken"} -UseBasicParsing
$getDocData = $getDocResponse.Content | ConvertFrom-Json

Write-Host "Response:" -ForegroundColor Cyan
Write-Host ($getDocData | ConvertTo-Json -Depth 5)
Write-Host ""

# ============================================
# 4. UPDATE DOCTOR PROFILE
# ============================================
Write-Host "=== 4. UPDATE DOCTOR PROFILE ===" -ForegroundColor Green
Write-Host "URL: http://localhost:3000/doctor/profile" -ForegroundColor Yellow
Write-Host "METHOD: PATCH" -ForegroundColor Yellow
Write-Host "Headers: Authorization: Bearer <token>" -ForegroundColor Yellow
$updateDocBody = @{
    consultationFee = 200.00
    profileDetails = "Updated: Now offers 12 years of clinical experience"
} | ConvertTo-Json
Write-Host "Raw Data:" -ForegroundColor Cyan
Write-Host $updateDocBody
Write-Host ""

$updateDocResponse = Invoke-WebRequest -Uri "http://localhost:3000/doctor/profile" -Method PATCH -ContentType "application/json" -Body $updateDocBody -Headers @{Authorization = "Bearer $doctorToken"} -UseBasicParsing
$updateDocData = $updateDocResponse.Content | ConvertFrom-Json

Write-Host "Response:" -ForegroundColor Cyan
Write-Host ($updateDocData | ConvertTo-Json -Depth 5)
Write-Host ""

# ============================================
# 5. PATIENT SIGNUP
# ============================================
Write-Host "=== 5. PATIENT SIGNUP ===" -ForegroundColor Green
Write-Host "URL: http://localhost:3000/auth/signup" -ForegroundColor Yellow
Write-Host "METHOD: POST" -ForegroundColor Yellow
$patientSignupBody = @{
    name = "John Smith"
    email = "john.smith@example.com"
    password = "PatientPass123!"
    role = "PATIENT"
} | ConvertTo-Json
Write-Host "Raw Data:" -ForegroundColor Cyan
Write-Host $patientSignupBody
Write-Host ""

$patientSignupResponse = Invoke-WebRequest -Uri "http://localhost:3000/auth/signup" -Method POST -ContentType "application/json" -Body $patientSignupBody -UseBasicParsing
$patientData = $patientSignupResponse.Content | ConvertFrom-Json
$patientToken = $patientData.accessToken
$patientUserId = $patientData.user.id

Write-Host "Response:" -ForegroundColor Cyan
Write-Host ($patientData | ConvertTo-Json -Depth 5)
Write-Host ""

# ============================================
# 6. CREATE PATIENT PROFILE
# ============================================
Write-Host "=== 6. CREATE PATIENT PROFILE ===" -ForegroundColor Green
Write-Host "URL: http://localhost:3000/patient/profile" -ForegroundColor Yellow
Write-Host "METHOD: POST" -ForegroundColor Yellow
Write-Host "Headers: Authorization: Bearer <token>" -ForegroundColor Yellow
$patientProfileBody = @{
    fullName = "John Smith"
    age = 35
    gender = "Male"
    contactDetails = @{
        phone = "+1-555-0123"
        email = "john.smith@example.com"
    }
    basicHealthInformation = @{
        bloodType = "O+"
        allergies = @("Penicillin")
        chronicConditions = @("Hypertension")
    }
} | ConvertTo-Json
Write-Host "Raw Data:" -ForegroundColor Cyan
Write-Host $patientProfileBody
Write-Host ""

$createPatResponse = Invoke-WebRequest -Uri "http://localhost:3000/patient/profile" -Method POST -ContentType "application/json" -Body $patientProfileBody -Headers @{Authorization = "Bearer $patientToken"} -UseBasicParsing
$createPatData = $createPatResponse.Content | ConvertFrom-Json

Write-Host "Response:" -ForegroundColor Cyan
Write-Host ($createPatData | ConvertTo-Json -Depth 5)
Write-Host ""

# ============================================
# 7. GET PATIENT PROFILE
# ============================================
Write-Host "=== 7. GET PATIENT PROFILE ===" -ForegroundColor Green
Write-Host "URL: http://localhost:3000/patient/profile" -ForegroundColor Yellow
Write-Host "METHOD: GET" -ForegroundColor Yellow
Write-Host "Headers: Authorization: Bearer <token>" -ForegroundColor Yellow

$getPatResponse = Invoke-WebRequest -Uri "http://localhost:3000/patient/profile" -Method GET -Headers @{Authorization = "Bearer $patientToken"} -UseBasicParsing
$getPatData = $getPatResponse.Content | ConvertFrom-Json

Write-Host "Response:" -ForegroundColor Cyan
Write-Host ($getPatData | ConvertTo-Json -Depth 5)
Write-Host ""

# ============================================
# 8. UPDATE PATIENT PROFILE
# ============================================
Write-Host "=== 8. UPDATE PATIENT PROFILE ===" -ForegroundColor Green
Write-Host "URL: http://localhost:3000/patient/profile" -ForegroundColor Yellow
Write-Host "METHOD: PATCH" -ForegroundColor Yellow
Write-Host "Headers: Authorization: Bearer <token>" -ForegroundColor Yellow
$updatePatBody = @{
    age = 36
    basicHealthInformation = @{
        bloodType = "O+"
        allergies = @("Penicillin", "Aspirin")
        chronicConditions = @("Hypertension", "Diabetes")
    }
} | ConvertTo-Json
Write-Host "Raw Data:" -ForegroundColor Cyan
Write-Host $updatePatBody
Write-Host ""

$updatePatResponse = Invoke-WebRequest -Uri "http://localhost:3000/patient/profile" -Method PATCH -ContentType "application/json" -Body $updatePatBody -Headers @{Authorization = "Bearer $patientToken"} -UseBasicParsing
$updatePatData = $updatePatResponse.Content | ConvertFrom-Json

Write-Host "Response:" -ForegroundColor Cyan
Write-Host ($updatePatData | ConvertTo-Json -Depth 5)
Write-Host ""

# ============================================
# 9. ROLE PROTECTION - Doctor tries Patient API
# ============================================
Write-Host "=== 9. ROLE PROTECTION TEST (Doctor tries to access Patient API) ===" -ForegroundColor Green
Write-Host "URL: http://localhost:3000/patient/profile" -ForegroundColor Yellow
Write-Host "METHOD: GET" -ForegroundColor Yellow
Write-Host "Headers: Authorization: Bearer <doctor_token>" -ForegroundColor Yellow
Write-Host "Expected: 403 Forbidden" -ForegroundColor Yellow

Try {
    $roleProtectResponse = Invoke-WebRequest -Uri "http://localhost:3000/patient/profile" -Method GET -Headers @{Authorization = "Bearer $doctorToken"} -UseBasicParsing
    Write-Host "Response:" -ForegroundColor Cyan
    Write-Host ($roleProtectResponse.Content | ConvertFrom-Json | ConvertTo-Json -Depth 5)
} Catch {
    Write-Host "Error (Expected):" -ForegroundColor Cyan
    $error = $_.Exception.Response.StatusCode
    Write-Host "Status Code: $error" -ForegroundColor Red
    Write-Host ($_.Exception.Response.Content.ReadAsStream() | ConvertFrom-Json | ConvertTo-Json -Depth 5) -ErrorAction SilentlyContinue
}
Write-Host ""

# ============================================
# 10. DUPLICATE PROFILE PREVENTION
# ============================================
Write-Host "=== 10. DUPLICATE PROFILE PREVENTION (Doctor tries to create profile twice) ===" -ForegroundColor Green
Write-Host "URL: http://localhost:3000/doctor/profile" -ForegroundColor Yellow
Write-Host "METHOD: POST" -ForegroundColor Yellow
Write-Host "Expected: 409 Conflict" -ForegroundColor Yellow

Try {
    $dupResponse = Invoke-WebRequest -Uri "http://localhost:3000/doctor/profile" -Method POST -ContentType "application/json" -Body $doctorProfileBody -Headers @{Authorization = "Bearer $doctorToken"} -UseBasicParsing
    Write-Host "Response:" -ForegroundColor Cyan
    Write-Host ($dupResponse.Content | ConvertFrom-Json | ConvertTo-Json -Depth 5)
} Catch {
    Write-Host "Error (Expected):" -ForegroundColor Cyan
    $error = $_.Exception.Response.StatusCode
    Write-Host "Status Code: $error" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== ALL TESTS COMPLETED ===" -ForegroundColor Green
