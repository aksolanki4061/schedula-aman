# 🚀 QUICK API REFERENCE - Copy & Paste Ready

## Base URL
```
http://localhost:3000
```

---

## 1️⃣ DOCTOR SIGNUP
```
POST /auth/signup
Content-Type: application/json

{
  "name": "Dr. Sarah Johnson",
  "email": "dr.sarah@example.com",
  "password": "SecurePass123!",
  "role": "DOCTOR"
}
```

**Response:** Get `accessToken` - **SAVE THIS TOKEN**

---

## 2️⃣ CREATE DOCTOR PROFILE
```
POST /doctor/profile
Authorization: Bearer {DOCTOR_TOKEN}
Content-Type: application/json

{
  "fullName": "Dr. Sarah Johnson",
  "specialization": "Cardiology",
  "experience": 10,
  "qualification": "MD, Board Certified Cardiologist",
  "consultationFee": 150.00,
  "availability": {
    "Monday": "09:00-17:00",
    "Tuesday": "09:00-17:00",
    "Wednesday": "09:00-17:00",
    "Thursday": "09:00-17:00",
    "Friday": "09:00-17:00"
  },
  "profileDetails": "Experienced cardiologist with 10 years of clinical practice"
}
```

---

## 3️⃣ GET DOCTOR PROFILE
```
GET /doctor/profile
Authorization: Bearer {DOCTOR_TOKEN}
```

---

## 4️⃣ UPDATE DOCTOR PROFILE
```
PATCH /doctor/profile
Authorization: Bearer {DOCTOR_TOKEN}
Content-Type: application/json

{
  "consultationFee": 200.00
}
```

---

## 5️⃣ PATIENT SIGNUP
```
POST /auth/signup
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "password": "PatientPass123!",
  "role": "PATIENT"
}
```

**Response:** Get `accessToken` - **SAVE THIS TOKEN**

---

## 6️⃣ CREATE PATIENT PROFILE
```
POST /patient/profile
Authorization: Bearer {PATIENT_TOKEN}
Content-Type: application/json

{
  "fullName": "John Smith",
  "age": 35,
  "gender": "Male",
  "contactDetails": {
    "phone": "+1-555-0123",
    "email": "john.smith@example.com"
  },
  "basicHealthInformation": {
    "bloodType": "O+",
    "allergies": ["Penicillin"],
    "chronicConditions": ["Hypertension"]
  }
}
```

---

## 7️⃣ GET PATIENT PROFILE
```
GET /patient/profile
Authorization: Bearer {PATIENT_TOKEN}
```

---

## 8️⃣ UPDATE PATIENT PROFILE
```
PATCH /patient/profile
Authorization: Bearer {PATIENT_TOKEN}
Content-Type: application/json

{
  "age": 36,
  "basicHealthInformation": {
    "bloodType": "O+",
    "allergies": ["Penicillin", "Aspirin"],
    "chronicConditions": ["Hypertension", "Diabetes"]
  }
}
```

---

## 🚫 ERROR SCENARIOS

### Doctor tries to access Patient API
```
GET /patient/profile
Authorization: Bearer {DOCTOR_TOKEN}
```
**Expected:** 403 Forbidden

### Patient tries to access Doctor API  
```
GET /doctor/profile
Authorization: Bearer {PATIENT_TOKEN}
```
**Expected:** 403 Forbidden

### Duplicate Profile Creation
```
POST /doctor/profile
Authorization: Bearer {DOCTOR_TOKEN}
Content-Type: application/json

{ ... same data as step 2 ... }
```
**Expected:** 409 Conflict - "doctor profile already exists"

### Invalid Token
```
GET /doctor/profile
Authorization: Bearer invalid_token_xyz
```
**Expected:** 401 Unauthorized

---

## ✅ TESTING CHECKLIST

- [ ] Doctor signup & get token
- [ ] Create doctor profile with all fields
- [ ] Get doctor profile - returns all data
- [ ] Update doctor profile - partial update works
- [ ] Patient signup & get token  
- [ ] Create patient profile with all fields
- [ ] Get patient profile - returns all data
- [ ] Update patient profile - partial update works
- [ ] Doctor cannot GET /patient/profile (403)
- [ ] Patient cannot GET /doctor/profile (403)
- [ ] Create same profile twice (409)
- [ ] Get profile before creating (404)
- [ ] Use invalid JWT token (401)

---

## 🔧 USING POSTMAN

1. Click **Import** → Paste any endpoint above
2. Set request type (GET, POST, PATCH)
3. Paste URL: `http://localhost:3000{endpoint}`
4. Go to **Headers** tab → Add:
   - `Content-Type: application/json` (for POST/PATCH)
   - `Authorization: Bearer {token}` (for all profile endpoints)
5. Go to **Body** tab → Select **raw** → Paste JSON data
6. Click **Send**

---

## 🔧 USING HOPPSCOTCH

1. Go to https://hoppscotch.io/
2. Create new request
3. Select method (GET, POST, PATCH)
4. Enter URL: `http://localhost:3000{endpoint}`
5. Add headers (Content-Type, Authorization)
6. Add body (JSON) for POST/PATCH requests
7. Click Send

---

**Last Updated:** June 8, 2026 | **Status:** Ready for Testing
