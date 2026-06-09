# 📮 POSTMAN SETUP GUIDE

## ✅ HOW TO IMPORT THE COLLECTION

### Step 1: Download Postman
- Go to: https://www.postman.com/downloads/
- Download and install (Free version works)

### Step 2: Import Collection

**Method A - Via File:**
1. Open Postman
2. Click **Import** button (top left)
3. Select **Upload Files**
4. Choose: `Postman_Collection.json` from your project
5. Click **Import**

**Method B - Via Link:**
1. Open Postman
2. Click **Import** button
3. Select **Link** tab
4. Copy file path or use raw link
5. Click **Import**

### Step 3: You're Ready!
- All 16 endpoints are pre-configured
- All headers are set
- All request bodies are filled in

---

## 🔐 SET VARIABLES

### Step 1: Add Tokens
After signup requests, you'll get tokens. Add them to variables:

**Method 1 - Automatic (Recommended):**
After running Doctor Signup:
1. Go to **Tests** tab in Postman
2. Add script to save token automatically

**Method 2 - Manual:**
1. Copy token from signup response
2. Click **Variables** (bottom left)
3. Find `DOCTOR_TOKEN` 
4. Paste token in **Current value**
5. Repeat for `PATIENT_TOKEN`

### Step 3: Use in Requests
All requests use `{{DOCTOR_TOKEN}}` or `{{PATIENT_TOKEN}}` automatically

---

## 📋 FOLDER STRUCTURE IN POSTMAN

```
📦 Schedula Aman - Doctor & Patient Onboarding
├── 🔐 AUTHENTICATION
│   ├── Doctor Signup
│   ├── Patient Signup
│   └── Login
├── 🏥 DOCTOR PROFILE
│   ├── Create Doctor Profile
│   ├── Get Doctor Profile
│   ├── Update Doctor Profile - Consultation Fee
│   ├── Update Doctor Profile - Availability
│   └── Update Doctor Profile - Multiple Fields
├── 👨‍⚕️ PATIENT PROFILE
│   ├── Create Patient Profile
│   ├── Get Patient Profile
│   ├── Update Patient Profile - Age
│   ├── Update Patient Profile - Health Info
│   └── Update Patient Profile - Multiple Fields
└── 🚫 ERROR SCENARIOS
    ├── Doctor tries Patient API (403)
    ├── Patient tries Doctor API (403)
    ├── Invalid Token (401)
    ├── Profile Not Found (404)
    ├── Duplicate Profile (409)
    └── Missing Required Fields (400)
```

---

## 🚀 TESTING WORKFLOW

### 1. Doctor Flow
```
1. Run: Doctor Signup
   ✅ Copy token from response
   
2. Set Variable: DOCTOR_TOKEN = {copied_token}
   
3. Run: Create Doctor Profile
   ✅ Verify response (201)
   
4. Run: Get Doctor Profile
   ✅ Verify all fields returned
   
5. Run: Update Doctor Profile - Consultation Fee
   ✅ Verify fee updated
```

### 2. Patient Flow
```
1. Run: Patient Signup
   ✅ Copy token from response
   
2. Set Variable: PATIENT_TOKEN = {copied_token}
   
3. Run: Create Patient Profile
   ✅ Verify response (201)
   
4. Run: Get Patient Profile
   ✅ Verify all fields returned
   
5. Run: Update Patient Profile - Age
   ✅ Verify age updated
```

### 3. Error Scenarios
```
1. Run: Doctor tries Patient API
   ✅ Should return 403 Forbidden
   
2. Run: Patient tries Doctor API
   ✅ Should return 403 Forbidden
   
3. Run: Invalid Token
   ✅ Should return 401 Unauthorized
   
4. Run: Duplicate Profile
   ✅ Should return 409 Conflict
```

---

## 💡 POSTMAN TIPS

### View Request Details
1. Click on any request
2. **Body** tab - See JSON being sent
3. **Headers** tab - See all headers
4. **Params** tab - See query parameters (if any)

### View Response
1. After clicking **Send**
2. See **Status Code** (200, 201, 400, etc)
3. **Body** tab - Response JSON
4. **Headers** tab - Response headers
5. **Tests** tab - Run validation tests

### Pretty Print JSON
1. Response appears
2. Click **Pretty** button
3. JSON is formatted nicely

### Save Response
1. After request, click **{}** icon
2. Save as example for documentation

---

## 🔧 MODIFY REQUESTS IN POSTMAN

### Change Doctor Email
1. Open: **Doctor Signup** request
2. Go to **Body** tab
3. Change `"email": "dr.sarah@example.com"` to any email
4. Click **Send**

### Change Patient Age
1. Open: **Create Patient Profile** request
2. Go to **Body** tab
3. Change `"age": 35` to different value
4. Click **Send**

### Add More Doctors
1. Copy **Doctor Signup** request
2. Click **Save As**
3. Change email and name
4. Send new request

---

## 🆘 COMMON ISSUES

### Issue: "401 Unauthorized"
**Solution:**
- Token expired or invalid
- Re-run signup request
- Copy new token to DOCTOR_TOKEN variable

### Issue: "403 Forbidden"
**Solution:**
- Using wrong role token
- Doctor token for patient endpoint (or vice versa)
- Re-check which token you're using

### Issue: "404 Not Found"
**Solution:**
- Profile doesn't exist yet
- Run Create Profile first
- Then run Get Profile

### Issue: "409 Conflict"
**Solution:**
- Profile already created for this user
- Create profile with different email
- Or use different token

### Issue: "Variables not working (showing {{TOKEN}})"
**Solution:**
- Set variables first
- Click **Variables** (bottom left)
- Enter token in **Current value**
- Not **Initial value**

---

## 📊 POSTMAN ENVIRONMENTS (Optional)

Create separate environments for Dev/Test:

### Development Environment
```
DOCTOR_TOKEN = dev_doctor_token
PATIENT_TOKEN = dev_patient_token
BASE_URL = http://localhost:3000
```

### Production Environment
```
DOCTOR_TOKEN = prod_doctor_token
PATIENT_TOKEN = prod_patient_token
BASE_URL = https://api.schedula-aman.com
```

**How to switch:**
1. Top right - Environment dropdown
2. Select environment
3. All variables update automatically

---

## ✅ COMPLETE POSTMAN TESTING CHECKLIST

**Authentication:**
- [ ] Doctor Signup - Get token
- [ ] Patient Signup - Get token
- [ ] Login - Get token

**Doctor Profile:**
- [ ] Create doctor profile
- [ ] Get doctor profile
- [ ] Update consultation fee
- [ ] Update availability
- [ ] Update multiple fields

**Patient Profile:**
- [ ] Create patient profile
- [ ] Get patient profile
- [ ] Update age
- [ ] Update health info
- [ ] Update multiple fields

**Error Scenarios:**
- [ ] Doctor cannot access patient API (403)
- [ ] Patient cannot access doctor API (403)
- [ ] Invalid token rejected (401)
- [ ] Profile not found (404)
- [ ] Duplicate profile rejected (409)
- [ ] Missing fields rejected (400)

---

## 🎥 POSTMAN VIDEO RESOURCES

- **Postman Basics:** https://www.youtube.com/watch?v=3YBxkdwIXMU
- **Collections & Variables:** https://www.youtube.com/watch?v=LoZXZLxIJKU
- **API Testing:** https://www.youtube.com/watch?v=klO2W-2PRSw

---

**File Location:** `Postman_Collection.json` in your project root
**Status:** Ready to import and use! 🚀
**Last Updated:** June 8, 2026
