# 📌 GIT WORKFLOW & PR SUBMISSION GUIDE

## 1. Create Feature Branch

```bash
git checkout -b feature/doctor-patient-onboarding
```

---

## 2. Check Status

```bash
git status
```

You should see:
- ✅ New files created:
  - src/doctor/doctor.controller.ts
  - src/doctor/doctor.service.ts
  - src/doctor/doctor-profile.entity.ts
  - src/doctor/doctor-profile.dto.ts
  - src/doctor/doctor.module.ts
  - src/patient/patient.controller.ts
  - src/patient/patient.service.ts
  - src/patient/patient-profile.entity.ts
  - src/patient/patient-profile.dto.ts
  - src/patient/patient.module.ts
  - src/migrations/1717860000000-CreateDoctorAndPatientProfiles.ts

- ✅ Modified files:
  - src/app.module.ts (imports added)
  - package.json (if dependencies added)
  - .env (database config)

---

## 3. Stage Changes

```bash
# Stage all changes
git add .

# Or stage specific files
git add src/doctor/
git add src/patient/
git add src/migrations/
git add src/app.module.ts
```

---

## 4. Commit with Meaningful Messages

```bash
# Initial commit
git commit -m "feat: implement doctor onboarding APIs

- Create POST /doctor/profile endpoint
- Create GET /doctor/profile endpoint
- Create PATCH /doctor/profile endpoint
- Add DoctorProfile entity with validation
- Add role-based access control for doctors only"

# Second commit
git commit -m "feat: implement patient onboarding APIs

- Create POST /patient/profile endpoint
- Create GET /patient/profile endpoint
- Create PATCH /patient/profile endpoint
- Add PatientProfile entity with validation
- Add role-based access control for patients only"

# Third commit
git commit -m "feat: add database migration for profiles

- Create doctor_profiles table
- Create patient_profiles table
- Add foreign key constraints
- Add unique constraints on user_id
- Configure cascade delete"

# Fourth commit
git commit -m "feat: add role-based access protection

- Implement @Roles decorator
- Implement RolesGuard for authorization
- Prevent cross-role API access
- Return 403 Forbidden for unauthorized roles"

# Fifth commit
git commit -m "docs: add API testing documentation

- Add API_TESTING_GUIDE.md with all endpoints
- Add QUICK_API_REFERENCE.md for easy testing
- Add IMPLEMENTATION_SUMMARY.md with checklist
- Include edge case scenarios and error handling"
```

---

## 5. View Commit History

```bash
git log --oneline
```

Expected output:
```
abc1234 docs: add API testing documentation
def5678 feat: add role-based access protection
ghi9012 feat: add database migration for profiles
jkl3456 feat: implement patient onboarding APIs
mno7890 feat: implement doctor onboarding APIs
```

---

## 6. Push to Remote

```bash
git push origin feature/doctor-patient-onboarding
```

---

## 7. Create Pull Request

### On GitHub:

1. Go to repository → Pull requests
2. Click **New pull request**
3. Select:
   - Base: `main` (or `develop`)
   - Compare: `feature/doctor-patient-onboarding`
4. Click **Create pull request**

### PR Title:
```
feat: Implement Doctor & Patient Onboarding Flow
```

### PR Description:

```markdown
## Overview
This PR implements the complete Doctor and Patient onboarding flow as specified in the Day 3 task.

## Features Implemented

### ✅ Doctor Onboarding
- POST /doctor/profile - Create doctor profile
- GET /doctor/profile - Retrieve doctor profile
- PATCH /doctor/profile - Update doctor profile
- Full validation and error handling
- Role-based access control (DOCTOR only)

### ✅ Patient Onboarding
- POST /patient/profile - Create patient profile
- GET /patient/profile - Retrieve patient profile
- PATCH /patient/profile - Update patient profile
- Full validation and error handling
- Role-based access control (PATIENT only)

### ✅ Security & Protection
- JWT authentication on all endpoints
- Role-based access control (RBAC)
- Doctor cannot access patient APIs (403)
- Patient cannot access doctor APIs (403)
- Unauthorized token rejection (401)

### ✅ Database
- DoctorProfile entity with all required fields
- PatientProfile entity with all required fields
- One-to-One relationship with User via userId
- Migration file for schema creation
- Foreign key constraints with cascade delete
- Unique constraints on user_id

### ✅ Edge Cases Handled
- Prevent duplicate profile creation (409 Conflict)
- Return 404 Not Found if profile doesn't exist
- Return 403 Forbidden for cross-role access
- Validate all required fields (400 Bad Request)
- Reject invalid JWT tokens (401 Unauthorized)
- Prevent updating restricted fields (id, userId, timestamps)

## Changes

**Files Added:**
- src/doctor/doctor.controller.ts
- src/doctor/doctor.service.ts
- src/doctor/doctor-profile.entity.ts
- src/doctor/doctor-profile.dto.ts
- src/doctor/doctor.module.ts
- src/patient/patient.controller.ts
- src/patient/patient.service.ts
- src/patient/patient-profile.entity.ts
- src/patient/patient-profile.dto.ts
- src/patient/patient.module.ts
- src/migrations/1717860000000-CreateDoctorAndPatientProfiles.ts
- API_TESTING_GUIDE.md
- QUICK_API_REFERENCE.md
- IMPLEMENTATION_SUMMARY.md

**Files Modified:**
- src/app.module.ts (added DoctorModule, PatientModule imports)

## Testing

Run migrations first:
```bash
npm run migration:run
```

Start development server:
```bash
npm run start:dev
```

See API_TESTING_GUIDE.md for complete testing documentation with:
- All endpoint URLs and methods
- Raw request data (JSON)
- Expected responses
- Edge case scenarios
- Error handling examples

## Checklist

- [x] Doctor onboarding APIs implemented
- [x] Patient onboarding APIs implemented
- [x] Role-based protection implemented
- [x] Database migration created and tested
- [x] All edge cases handled
- [x] Error handling implemented
- [x] Input validation added
- [x] Documentation added
- [x] Code follows NestJS best practices
- [x] No breaking changes

## Related Task
Day 3 Backend Internship Program - Doctor & Patient Onboarding
```

---

## 8. After PR Review

### If Changes Requested:

```bash
# Make changes locally
git add .
git commit -m "refactor: address review comments"
git push origin feature/doctor-patient-onboarding
```

### Merge to Main:

```bash
# After approval, merge on GitHub
git checkout main
git pull origin main
git merge feature/doctor-patient-onboarding
git push origin main
```

---

## ✅ SUBMISSION CHECKLIST

- [ ] Feature branch created: `feature/doctor-patient-onboarding`
- [ ] All changes committed with meaningful messages
- [ ] Branch pushed to remote repository
- [ ] Pull request created with detailed description
- [ ] PR title matches convention: `feat: ...`
- [ ] ~15 changed files or less
- [ ] All tests documented in API_TESTING_GUIDE.md
- [ ] Ready for reviewer approval
- [ ] Loom video recorded showing:
  - [ ] Doctor signup flow
  - [ ] Doctor profile creation
  - [ ] Doctor profile retrieval
  - [ ] Doctor profile update
  - [ ] Patient signup flow
  - [ ] Patient profile creation
  - [ ] Patient profile retrieval
  - [ ] Patient profile update
  - [ ] Role protection (doctor cannot access patient API)
  - [ ] Role protection (patient cannot access doctor API)
  - [ ] Error handling (duplicate profiles, invalid tokens, etc.)

---

## 📝 NOTES

1. Keep commits small and meaningful
2. Each commit should represent one logical change
3. Write clear commit messages
4. Don't merge to main without reviewer approval
5. Update PR if any changes are requested
6. Record Loom video showing all features working

---

**Created:** June 8, 2026
**Task:** Doctor & Patient Onboarding - Day 3
**Submission Channel:** Backend Internship Program - Submissions
