# 🔷 PATIENT API - COMPLETE REFERENCE

---

## 1️⃣ PATIENT SIGNUP

**URL:** `http://localhost:3000/auth/signup`
**METHOD:** `POST`
**Headers:** `Content-Type: application/json`

```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "password": "PatientPass123!",
  "role": "PATIENT"
}
```

**Response (200):**
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

**SAVE TOKEN as: `PATIENT_TOKEN`**

---

## 2️⃣ CREATE PATIENT PROFILE

**URL:** `http://localhost:3000/patient/profile`
**METHOD:** `POST`
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {PATIENT_TOKEN}
```

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

**Response (201):**
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

## 3️⃣ GET PATIENT PROFILE

**URL:** `http://localhost:3000/patient/profile`
**METHOD:** `GET`
**Headers:**
```
Authorization: Bearer {PATIENT_TOKEN}
```

**Response (200):**
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

## 4️⃣ UPDATE PATIENT PROFILE

**URL:** `http://localhost:3000/patient/profile`
**METHOD:** `PATCH`
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {PATIENT_TOKEN}
```

### UPDATE AGE ONLY:
```json
{
  "age": 36
}
```

**Response (200):**
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
    "allergies": ["Penicillin"],
    "chronicConditions": ["Hypertension"]
  },
  "createdAt": "2026-06-08T20:32:00.000Z",
  "updatedAt": "2026-06-08T20:33:00.000Z"
}
```

---

### UPDATE HEALTH INFORMATION ONLY:
```json
{
  "basicHealthInformation": {
    "bloodType": "O+",
    "allergies": ["Penicillin", "Aspirin"],
    "chronicConditions": ["Hypertension", "Diabetes"]
  }
}
```

**Response (200):**
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
  "updatedAt": "2026-06-08T20:34:00.000Z"
}
```

---

### UPDATE MULTIPLE FIELDS:
```json
{
  "age": 37,
  "contactDetails": {
    "phone": "+1-555-9999",
    "email": "john.smith.updated@example.com"
  },
  "basicHealthInformation": {
    "bloodType": "O+",
    "allergies": ["Penicillin", "Aspirin", "Ibuprofen"],
    "chronicConditions": ["Hypertension", "Diabetes", "Asthma"]
  }
}
```

**Response (200):**
```json
{
  "id": 1,
  "userId": 2,
  "fullName": "John Smith",
  "age": 37,
  "gender": "Male",
  "contactDetails": {
    "phone": "+1-555-9999",
    "email": "john.smith.updated@example.com"
  },
  "basicHealthInformation": {
    "bloodType": "O+",
    "allergies": ["Penicillin", "Aspirin", "Ibuprofen"],
    "chronicConditions": ["Hypertension", "Diabetes", "Asthma"]
  },
  "createdAt": "2026-06-08T20:32:00.000Z",
  "updatedAt": "2026-06-08T20:35:00.000Z"
}
```

---

# 🔶 DOCTOR UPDATE ENDPOINTS

---

## UPDATE DOCTOR PROFILE - PARTIAL

**URL:** `http://localhost:3000/doctor/profile`
**METHOD:** `PATCH`
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {DOCTOR_TOKEN}
```

### UPDATE CONSULTATION FEE ONLY:
```json
{
  "consultationFee": 200.00
}
```

**Response (200):**
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
  "profileDetails": "Experienced cardiologist with 10 years of clinical practice",
  "createdAt": "2026-06-08T20:30:00.000Z",
  "updatedAt": "2026-06-08T20:31:00.000Z"
}
```

---

### UPDATE AVAILABILITY ONLY:
```json
{
  "availability": {
    "Monday": "10:00-18:00",
    "Tuesday": "10:00-18:00",
    "Wednesday": "10:00-18:00",
    "Thursday": "10:00-18:00",
    "Friday": "10:00-18:00",
    "Saturday": "10:00-14:00"
  }
}
```

**Response (200):**
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
    "Monday": "10:00-18:00",
    "Tuesday": "10:00-18:00",
    "Wednesday": "10:00-18:00",
    "Thursday": "10:00-18:00",
    "Friday": "10:00-18:00",
    "Saturday": "10:00-14:00"
  },
  "profileDetails": "Experienced cardiologist with 10 years of clinical practice",
  "createdAt": "2026-06-08T20:30:00.000Z",
  "updatedAt": "2026-06-08T20:35:00.000Z"
}
```

---

### UPDATE PROFILE DETAILS ONLY:
```json
{
  "profileDetails": "Updated: Now available for online consultations. 12+ years experience in cardiac care."
}
```

**Response (200):**
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
    "Monday": "10:00-18:00",
    "Tuesday": "10:00-18:00",
    "Wednesday": "10:00-18:00",
    "Thursday": "10:00-18:00",
    "Friday": "10:00-18:00",
    "Saturday": "10:00-14:00"
  },
  "profileDetails": "Updated: Now available for online consultations. 12+ years experience in cardiac care.",
  "createdAt": "2026-06-08T20:30:00.000Z",
  "updatedAt": "2026-06-08T20:36:00.000Z"
}
```

---

### UPDATE MULTIPLE FIELDS:
```json
{
  "consultationFee": 250.00,
  "experience": 12,
  "profileDetails": "Updated 2026: Specializing in advanced cardiac diagnostics"
}
```

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "fullName": "Dr. Sarah Johnson",
  "specialization": "Cardiology",
  "experience": 12,
  "qualification": "MD, Board Certified Cardiologist",
  "consultationFee": "250.00",
  "availability": {
    "Monday": "10:00-18:00",
    "Tuesday": "10:00-18:00",
    "Wednesday": "10:00-18:00",
    "Thursday": "10:00-18:00",
    "Friday": "10:00-18:00",
    "Saturday": "10:00-14:00"
  },
  "profileDetails": "Updated 2026: Specializing in advanced cardiac diagnostics",
  "createdAt": "2026-06-08T20:30:00.000Z",
  "updatedAt": "2026-06-08T20:37:00.000Z"
}
```

---

# 📋 UPDATE OPERATIONS CHEATSHEET

| Operation | Endpoint | Method | Fields You Can Update |
|-----------|----------|--------|----------------------|
| **Doctor** | `/doctor/profile` | PATCH | fullName, specialization, experience, qualification, consultationFee, availability, profileDetails |
| **Patient** | `/patient/profile` | PATCH | fullName, age, gender, contactDetails, basicHealthInformation |

---

# ❌ RESTRICTED FIELDS (Cannot be updated)

| Field | Why |
|-------|-----|
| `id` | Primary key - system generated |
| `userId` | Foreign key - tied to user |
| `createdAt` | Timestamp - set at creation |
| `updatedAt` | Timestamp - auto updated by system |
| `role` | User role - set at signup |

---

# 🧪 UPDATE TESTING SCENARIOS

## Scenario 1: Update Single Field (Doctor)
```
PATCH /doctor/profile
Body: { "consultationFee": 175.00 }
Expected: Only consultationFee changes, everything else remains the same
```

## Scenario 2: Update Multiple Fields (Patient)
```
PATCH /patient/profile
Body: {
  "age": 40,
  "basicHealthInformation": {
    "bloodType": "A+",
    "allergies": [],
    "chronicConditions": []
  }
}
Expected: Age and health info updated, name and gender unchanged
```

## Scenario 3: Try to Update Restricted Field (Should Fail)
```
PATCH /doctor/profile
Body: { "id": 999, "consultationFee": 300 }
Expected: Error - id is restricted, but consultationFee updates to 300
```

## Scenario 4: Empty Update (Should Fail)
```
PATCH /doctor/profile
Body: {}
Expected: 400 Bad Request - "at least one field is required"
```

---

# ✅ COMPLETE PATIENT + UPDATE TESTING CHECKLIST

- [ ] Patient Signup - Get token
- [ ] Create Patient Profile - All fields
- [ ] Get Patient Profile - Verify creation
- [ ] Update Age Only - Partial update
- [ ] Update Health Info Only - Partial update
- [ ] Update Multiple Fields - Combined update
- [ ] Update with null value - Clear optional field
- [ ] Doctor Update Consultation Fee
- [ ] Doctor Update Availability 
- [ ] Doctor Update Profile Details
- [ ] Doctor Update Multiple Fields
- [ ] Try update restricted field (should fail)
- [ ] Try empty update body (should fail)

---

**Ready to test! Use these in Postman, Hoppscotch, or Thunder Client**
**Last Updated:** June 8, 2026
