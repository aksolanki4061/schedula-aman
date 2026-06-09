# 📁 PROJECT FILES GUIDE

## Documentation Files (Created for Easy Reference)

| File | Purpose |
|------|---------|
| **API_TESTING_GUIDE.md** | Complete API documentation with all endpoints, request/response formats, edge cases |
| **QUICK_API_REFERENCE.md** | Copy-paste ready API requests for quick testing |
| **IMPLEMENTATION_SUMMARY.md** | Project status, deliverables checklist, feature highlights |
| **GIT_WORKFLOW.md** | Git branching, committing, and PR submission guide |
| **PROJECT_FILES_GUIDE.md** | This file - navigation guide for all files |

---

## Core Implementation Files

### Doctor Module
```
src/doctor/
├── doctor.controller.ts          # Endpoints: POST, GET, PATCH /doctor/profile
├── doctor.service.ts             # Business logic & validation
├── doctor-profile.entity.ts       # Database model (TypeORM)
├── doctor-profile.dto.ts          # Request/Response data transfer objects
├── doctor.module.ts              # Module configuration & imports
└── doctor.controller.spec.ts      # Unit tests (existing)
```

**Key Features:**
- ✅ 3 RESTful endpoints
- ✅ Full CRUD operations
- ✅ Input validation on all fields
- ✅ Duplicate prevention (409 Conflict)
- ✅ Role-based access control (DOCTOR only)

---

### Patient Module
```
src/patient/
├── patient.controller.ts         # Endpoints: POST, GET, PATCH /patient/profile
├── patient.service.ts            # Business logic & validation
├── patient-profile.entity.ts      # Database model (TypeORM)
├── patient-profile.dto.ts         # Request/Response data transfer objects
├── patient.module.ts             # Module configuration & imports
└── patient.controller.spec.ts     # Unit tests (existing)
```

**Key Features:**
- ✅ 3 RESTful endpoints
- ✅ Full CRUD operations
- ✅ Input validation on all fields
- ✅ Duplicate prevention (409 Conflict)
- ✅ Role-based access control (PATIENT only)

---

### Authentication & Authorization
```
src/auth/
├── auth.controller.ts            # Signup & Login endpoints
├── auth.service.ts               # Auth logic & JWT generation
├── jwt-auth.guard.ts             # JWT validation guard
├── auth.dto.ts                   # Auth request/response types
├── auth.module.ts                # Auth module
└── auth.controller.spec.ts        # Auth tests

src/roles/
├── roles.decorator.ts            # @Roles() decorator for endpoints
├── roles.guard.ts                # Role-based access control guard
└── roles.guard.spec.ts           # Role protection tests

src/users/
├── user.entity.ts                # User database model
├── user-role.enum.ts             # DOCTOR/PATIENT enum
├── users.service.ts              # User management service
├── users.module.ts               # Users module
└── users.service.spec.ts         # User service tests
```

---

### Database
```
src/
├── data-source.ts                # TypeORM configuration
├── migrations/
│   └── 1717860000000-CreateDoctorAndPatientProfiles.ts
│       ├── Creates users table with role enum
│       ├── Creates doctor_profiles table
│       ├── Creates patient_profiles table
│       ├── Adds foreign key constraints
│       └── Adds cascade delete
```

**Migration Details:**
- Creates 3 tables: users, doctor_profiles, patient_profiles
- Foreign key relationships with cascade delete
- Unique constraints on user_id (one profile per user)
- JSONB fields for flexibility (availability, contactDetails, etc)
- Automatic timestamps (createdAt, updatedAt)

---

### Main Application
```
src/
├── app.controller.ts             # Root controller
├── app.service.ts                # Root service
├── app.module.ts                 # Main module (all imports)
└── main.ts                       # Application bootstrap
```

---

## Configuration Files

```
.env                              # Database credentials & JWT secret
nest-cli.json                     # NestJS CLI config
tsconfig.json                     # TypeScript config
tsconfig.build.json               # Build-specific TS config
eslint.config.mjs                 # ESLint rules
```

---

## Dependencies

### Core Packages
- `@nestjs/core` - NestJS framework
- `@nestjs/common` - NestJS utilities
- `@nestjs/platform-express` - Express adapter
- `@nestjs/typeorm` - Database ORM
- `@nestjs/jwt` - JWT authentication
- `@nestjs/passport` - Passport integration
- `typeorm` - ORM library
- `pg` - PostgreSQL driver
- `passport` - Authentication middleware
- `passport-jwt` - JWT strategy
- `bcrypt` - Password hashing
- `reflect-metadata` - Metadata reflection
- `rxjs` - Reactive programming

---

## API Endpoints Reference

### Doctor Endpoints (DOCTOR role only)
```
POST   /doctor/profile      → Create doctor profile
GET    /doctor/profile      → Get doctor profile
PATCH  /doctor/profile      → Update doctor profile
```

### Patient Endpoints (PATIENT role only)
```
POST   /patient/profile     → Create patient profile
GET    /patient/profile     → Get patient profile
PATCH  /patient/profile     → Update patient profile
```

### Authentication Endpoints (Public)
```
POST   /auth/signup         → User signup
POST   /auth/login          → User login
```

---

## Database Schema

### users table
```
├── id (SERIAL PRIMARY KEY)
├── name (VARCHAR)
├── email (VARCHAR UNIQUE)
├── password (VARCHAR)
└── role (ENUM: DOCTOR, PATIENT)
```

### doctor_profiles table
```
├── id (SERIAL PRIMARY KEY)
├── user_id (INTEGER UNIQUE FK)
├── full_name (VARCHAR)
├── specialization (VARCHAR)
├── experience (INTEGER)
├── qualification (VARCHAR)
├── consultation_fee (NUMERIC)
├── availability (JSONB)
├── profile_details (TEXT)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### patient_profiles table
```
├── id (SERIAL PRIMARY KEY)
├── user_id (INTEGER UNIQUE FK)
├── full_name (VARCHAR)
├── age (INTEGER)
├── gender (VARCHAR)
├── contact_details (JSONB)
├── basic_health_information (JSONB)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

---

## Testing Documentation

### API Testing
- **API_TESTING_GUIDE.md** - Full endpoint documentation
  - Complete request/response examples
  - All HTTP status codes
  - Error scenarios
  - Edge cases

- **QUICK_API_REFERENCE.md** - Quick copy-paste format
  - Copy-ready API requests
  - Testing checklist
  - Postman/Hoppscotch instructions

### Test Files (Unit Tests)
- `src/app.controller.spec.ts`
- `src/auth/auth.controller.spec.ts`
- `src/doctor/doctor.controller.spec.ts`
- `src/patient/patient.controller.spec.ts`
- `src/roles/roles.guard.spec.ts`
- `src/users/users.service.spec.ts`
- `src/doctor/doctor.service.spec.ts`
- `src/patient/patient.service.spec.ts`
- `test/app.e2e-spec.ts` (E2E tests)

---

## Key Features by Category

### ✅ CRUD Operations
- Create profile (POST)
- Read profile (GET)
- Update profile (PATCH)
- No delete (profiles are permanent)

### ✅ Validation
- Type checking
- Required field validation
- String trimming
- JSONB validation
- Age/experience validation (positive integers)
- Email uniqueness
- Unique profile per user

### ✅ Security
- JWT authentication
- Password hashing (bcrypt)
- Role-based access control
- User isolation
- Token validation
- Restricted field protection

### ✅ Error Handling
- 200 OK - Successful GET
- 201 Created - Successful POST
- 400 Bad Request - Validation errors
- 401 Unauthorized - Invalid token
- 403 Forbidden - Role violation
- 404 Not Found - Profile not found
- 409 Conflict - Duplicate profile

### ✅ Database
- PostgreSQL with TypeORM
- Migrations for schema
- Foreign keys with cascade
- Unique constraints
- JSONB fields for flexibility
- Auto timestamps

---

## Getting Started

1. **Setup Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Migrations**
   ```bash
   npm run migration:run
   ```

4. **Start Development**
   ```bash
   npm run start:dev
   ```

5. **Test APIs**
   - See API_TESTING_GUIDE.md
   - Use Postman, Hoppscotch, or Thunder Client
   - Follow QUICK_API_REFERENCE.md

---

## Submission Requirements

- [x] Feature branch created
- [x] All code committed with meaningful messages
- [x] PR description completed
- [x] API documentation provided
- [x] Testing guide created
- [x] Edge cases handled
- [x] Role protection implemented
- [ ] Loom video recorded (TODO - User to record)
- [ ] PR raised (TODO - User to raise)

---

## Quick Navigation

| What I need | Where to find it |
|-----------|-----------------|
| API Endpoints | API_TESTING_GUIDE.md or QUICK_API_REFERENCE.md |
| Copy-paste API requests | QUICK_API_REFERENCE.md |
| Complete implementation details | IMPLEMENTATION_SUMMARY.md |
| Git & PR workflow | GIT_WORKFLOW.md |
| Controller code | src/{doctor,patient}/[name].controller.ts |
| Service logic | src/{doctor,patient}/[name].service.ts |
| Database models | src/{doctor,patient}/[name]-profile.entity.ts |
| Data validation | src/{doctor,patient}/[name]-profile.dto.ts |
| Database migrations | src/migrations/*.ts |
| Authentication | src/auth/* |
| Authorization | src/roles/* |
| User management | src/users/* |

---

**Project Status:** ✅ COMPLETE - Ready for Testing & Submission
**Created:** June 8, 2026
**Type:** Backend - Doctor & Patient Onboarding Flow
