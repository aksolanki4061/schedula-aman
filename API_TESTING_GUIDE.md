# Doctor & Patient Onboarding - Complete API Testing Guide

## Base URL
```
http://localhost:3000
```

---

## ✅ 1. DOCTOR SIGNUP

**URL:** `http://localhost:3000/auth/signup`
**METHOD:** `POST`
**Headers:** `Content-Type: application/json`

### Raw Data (JSON):
```json
{
  "name": "Dr. Sarah Johnson",
  "email": "dr.sarah@example.com",
  "password": "SecurePass123!",
  "role": "DOCTOR"
}
```

### Expected Response (200 OK):
```json
{
  "user": {
    "id": 1,
    "name": "Dr. Sarah Johnson",
    "email": "dr.sarah@example.com",
    "role": "DOCTOR"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Save this token as: `DOCTOR_TOKEN`

---

## ✅ 2. CREATE DOCTOR PROFILE

**URL:** `http://localhost:3000/doctor/profile`
**METHOD:** `POST`
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {DOCTOR_TOKEN}
```

### Raw Data (JSON):
```json
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

### Expected Response (201 Created):
```json
{
  "id": 1,
  "userId": 1,
  "fullName": "Dr. Sarah Johnson",
  "specialization": "Cardiology",
  "experience": 10,
  "qualification": "MD, Board Certified Cardiologist",
  "consultationFee": "150.00",
  "availability": {
    "Monday": "09:00-17:00",
    "Tuesday": "09:00-17:00",
    "Wednesday": "09:00-17:00",
    "Thursday": "09:00-17:00",
    "Friday": "09:00-17:00"
  },
  "profileDetails": "Experienced cardiologist with 10 years of clinical practice",
  "createdAt": "2026-06-08T20:30:00.000Z",
  "updatedAt": "2026-06-08T20:30:00.000Z"
}
```

---

## ✅ 3. GET DOCTOR PROFILE

**URL:** `http://localhost:3000/doctor/profile`
**METHOD:** `GET`
**Headers:**
```
Authorization: Bearer {DOCTOR_TOKEN}
```

### Expected Response (200 OK):
```json
{
  "id": 1,
  "userId": 1,
  "fullName": "Dr. Sarah Johnson",
  "specialization": "Cardiology",
  "experience": 10,
  "qualification": "MD, Board Certified Cardiologist",
  "consultationFee": "150.00",
  "availability": {
    "Monday": "09:00-17:00",
    "Tuesday": "09:00-17:00",
    "Wednesday": "09:00-17:00",
    "Thursday": "09:00-17:00",
    "Friday": "09:00-17:00"
  },
  "profileDetails": "Experienced cardiologist with 10 years of clinical practice",
  "createdAt": "2026-06-08T20:30:00.000Z",
  "updatedAt": "2026-06-08T20:30:00.000Z"
}
```

---

## ✅ 4. UPDATE DOCTOR PROFILE

**URL:** `http://localhost:3000/doctor/profile`
**METHOD:** `PATCH`
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {DOCTOR_TOKEN}
```

### Raw Data (JSON) - Only update changed fields:
```json
{
  "consultationFee": 200.00,
  "profileDetails": "Updated: Now offers 12 years of clinical experience"
}
```

### Expected Response (200 OK):
```json
{
  "id": 1,
  "userId": 1,
  "fullName": "Dr. Sarah Johnson",
  "specialization": "Cardiology",
  "experience": 10,
  "qualification": "MD, Board Certified Cardiologist",
  "consultationFee": "200.00",
  "availability": {
    "Monday": "09:00-17:00",
    "Tuesday": "09:00-17:00",
    "Wednesday": "09:00-17:00",
    "Thursday": "09:00-17:00",
    "Friday": "09:00-17:00"
  },
  "profileDetails": "Updated: Now offers 12 years of clinical experience",
  "createdAt": "2026-06-08T20:30:00.000Z",
  "updatedAt": "2026-06-08T20:31:00.000Z"
}
```

---

## ✅ 5. PATIENT SIGNUP

**URL:** `http://localhost:3000/auth/signup`
**METHOD:** `POST`
**Headers:** `Content-Type: application/json`

### Raw Data (JSON):
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "password": "PatientPass123!",
  "role": "PATIENT"
}
```

### Expected Response (200 OK):
```json
{
  "user": {
    "id": 2,
    "name": "John Smith",
    "email": "john.smith@example.com",
    "role": "PATIENT"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Save this token as: `PATIENT_TOKEN`

---

## ✅ 6. CREATE PATIENT PROFILE

**URL:** `http://localhost:3000/patient/profile`
**METHOD:** `POST`
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {PATIENT_TOKEN}
```

### Raw Data (JSON):
```json
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

### Expected Response (201 Created):
```json
{
  "id": 1,
  "userId": 2,
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
  },
  "createdAt": "2026-06-08T20:32:00.000Z",
  "updatedAt": "2026-06-08T20:32:00.000Z"
}
```

---

## ✅ 7. GET PATIENT PROFILE

**URL:** `http://localhost:3000/patient/profile`
**METHOD:** `GET`
**Headers:**
```
Authorization: Bearer {PATIENT_TOKEN}
```

### Expected Response (200 OK):
```json
{
  "id": 1,
  "userId": 2,
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
  },
  "createdAt": "2026-06-08T20:32:00.000Z",
  "updatedAt": "2026-06-08T20:32:00.000Z"
}
```

---

## ✅ 8. UPDATE PATIENT PROFILE

**URL:** `http://localhost:3000/patient/profile`
**METHOD:** `PATCH`
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {PATIENT_TOKEN}
```

### Raw Data (JSON) - Update health information:
```json
{
  "age": 36,
  "basicHealthInformation": {
    "bloodType": "O+",
    "allergies": ["Penicillin", "Aspirin"],
    "chronicConditions": ["Hypertension", "Diabetes"]
  }
}
```

### Expected Response (200 OK):
```json
{
  "id": 1,
  "userId": 2,
  "fullName": "John Smith",
  "age": 36,
  "gender": "Male",
  "contactDetails": {
    "phone": "+1-555-0123",
    "email": "john.smith@example.com"
  },
  "basicHealthInformation": {
    "bloodType": "O+",
    "allergies": ["Penicillin", "Aspirin"],
    "chronicConditions": ["Hypertension", "Diabetes"]
  },
  "createdAt": "2026-06-08T20:32:00.000Z",
  "updatedAt": "2026-06-08T20:33:00.000Z"
}
```

---

## 🚫 EDGE CASES & ERROR HANDLING

### ❌ 9. DUPLICATE PROFILE PREVENTION

**URL:** `http://localhost:3000/doctor/profile`
**METHOD:** `POST`
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {DOCTOR_TOKEN}
```

**Action:** Send the same profile creation request twice

### Expected Response (409 Conflict) on second attempt:
```json
{
  "message": "doctor profile already exists",
  "error": "Conflict",
  "statusCode": 409
}
```

---

### ❌ 10. ROLE PROTECTION - Doctor tries Patient API

**URL:** `http://localhost:3000/patient/profile`
**METHOD:** `GET`
**Headers:**
```
Authorization: Bearer {DOCTOR_TOKEN}
```

### Expected Response (403 Forbidden):
```json
{
  "message": "Forbidden resource",
  "error": "Forbidden",
  "statusCode": 403
}
```

---

### ❌ 11. ROLE PROTECTION - Patient tries Doctor API

**URL:** `http://localhost:3000/doctor/profile`
**METHOD:** `GET`
**Headers:**
```
Authorization: Bearer {PATIENT_TOKEN}
```

### Expected Response (403 Forbidden):
```json
{
  "message": "Forbidden resource",
  "error": "Forbidden",
  "statusCode": 403
}
```

---

### ❌ 12. PROFILE NOT FOUND

**URL:** `http://localhost:3000/doctor/profile`
**METHOD:** `GET`
**Headers:**
```
Authorization: Bearer {DOCTOR_TOKEN}
```

**Action:** Call this before creating a profile

### Expected Response (404 Not Found):
```json
{
  "message": "doctor profile not found",
  "error": "Not Found",
  "statusCode": 404
}
```

---

### ❌ 13. INVALID TOKEN

**URL:** `http://localhost:3000/doctor/profile`
**METHOD:** `GET`
**Headers:**
```
Authorization: Bearer invalid_token_xyz
```

### Expected Response (401 Unauthorized):
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

---

### ❌ 14. MISSING REQUIRED FIELDS

**URL:** `http://localhost:3000/doctor/profile`
**METHOD:** `POST`
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {DOCTOR_TOKEN}
```

### Raw Data (JSON) - Missing specialization:
```json
{
  "fullName": "Dr. Test",
  "experience": 5,
  "qualification": "MD"
}
```

### Expected Response (400 Bad Request):
```json
{
  "message": "Validation failed",
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## 📋 TESTING CHECKLIST

Use Postman, Hoppscotch, or Thunder Client to test:

- [ ] **Doctor Signup** - Create doctor account
- [ ] **Create Doctor Profile** - Add doctor details
- [ ] **Get Doctor Profile** - Retrieve doctor profile
- [ ] **Update Doctor Profile** - Modify consultation fee
- [ ] **Patient Signup** - Create patient account
- [ ] **Create Patient Profile** - Add patient details
- [ ] **Get Patient Profile** - Retrieve patient profile
- [ ] **Update Patient Profile** - Modify health info
- [ ] **Doctor cannot access Patient API** - 403 error expected
- [ ] **Patient cannot access Doctor API** - 403 error expected
- [ ] **Duplicate profile prevention** - 409 error expected
- [ ] **Profile not found** - 404 error expected
- [ ] **Invalid token** - 401 error expected

---

## 🔗 REFERENCE LINKS FOR TESTING TOOLS

- **Postman:** https://www.postman.com/downloads/
- **Hoppscotch:** https://hoppscotch.io/
- **Thunder Client:** https://www.thunderclient.com/

---

## 📝 NOTES

1. All timestamps are in ISO 8601 format
2. Consultation fee is returned as a string (decimal type)
3. Availability and contact details are JSONB fields
4. Basic health information is optional for patients
5. Role-based guards ensure only appropriate users access their respective endpoints
6. All endpoints require valid JWT token in Authorization header
