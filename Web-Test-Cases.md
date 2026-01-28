# 📄 WEB TEST CASES — SecondHand Web Application

---

## 🔐 Module: Authentication  

| Test Case ID | Title | Type | Preconditions | Test Steps | Test Data | Expected Result | Status | Bug ID |
|--------------|-------|------|---------------|------------|-----------|-----------------|--------|--------|
| TC-WEB-AUTH-001 | User cannot register using invalid email domain | Negative | User is on registration page | 1. Open homepage<br>2. Click **Masuk**<br>3. Click **Daftar di sini**<br>4. Enter invalid email<br>5. Click **Daftar** | Email: faruq@g | Registration is rejected with validation message | Fail | SH-WEB-BUG-001 |
| TC-WEB-AUTH-002 | User cannot login with incorrect password | Negative | User is on login page | 1. Open login page<br>2. Enter valid email<br>3. Enter incorrect password<br>4. Click **Masuk** | Wrong password | Error message is displayed | Pass | - |
| TC-WEB-AUTH-003 | User cannot login with unregistered email | Negative | User is on login page | 1. Open login page<br>2. Enter unregistered email<br>3. Enter password<br>4. Click **Masuk** | Unregistered email | Login is rejected with error message | Pass | - |
| TC-WEB-AUTH-004 | User can logout successfully | Positive | User is logged in | 1. Click profile menu<br>2. Click **Logout** | - | User is logged out and redirected to homepage | Pass | - |

---

## 👤 Module: User Profile

| Test Case ID | Title | Type | Preconditions | Test Steps | Test Data | Expected Result | Status | Bug ID |
|--------------|-------|------|---------------|------------|-----------|-----------------|--------|--------|
| TC-WEB-PROFILE-001 | Phone number field accepts numeric characters only | Negative | User is logged in | 1. Open profile page<br>2. Enter letters/symbols in phone number<br>3. Click **Save** | Phone: abc@123 | System rejects non-numeric input | Fail | SH-WEB-BUG-002 |
| TC-WEB-PROFILE-002 | Error shown when uploading profile photo >1MB | Negative | User is logged in | 1. Upload image >1MB<br>2. Click **Save** | Image size >1MB | Error message displayed | Fail | SH-WEB-BUG-003 |
| TC-WEB-PROFILE-003 | Profile photo is displayed correctly on homepage | UI | User is logged in | 1. Login<br>2. Observe homepage | Valid photo | Photo displayed correctly | Fail | SH-WEB-BUG-004 |
| TC-WEB-PROFILE-004 | Name field accepts alphabetic characters only | Negative | User is logged in | 1. Enter symbols in name field<br>2. Click **Save** | @@@### | Validation message shown | Fail | SH-WEB-BUG-009 |
| TC-WEB-PROFILE-005 | User can update profile successfully | Positive | User is logged in | 1. Update profile fields<br>2. Click **Save** | Valid profile data | Profile updated successfully | Pass | - |
| TC-WEB-PROFILE-006 | Phone number field enforces maximum length | Negative | User is logged in | 1. Enter phone number exceeding max length<br>2. Click **Save** | Long numeric value | Input is restricted | Pass | - |
| TC-WEB-PROFILE-007 | System rejects unsupported profile photo format | Negative | User is logged in | 1. Upload unsupported file format<br>2. Click **Save** | File: .txt | Validation message displayed | Pass | - |

---

## 📦 Module: Product Management

| Test Case ID | Title | Type | Preconditions | Test Steps | Test Data | Expected Result | Status | Bug ID |
|--------------|-------|------|---------------|------------|-----------|-----------------|--------|--------|
| TC-WEB-PRODUCT-001 | Seller can publish a product successfully | Positive | User is logged in as seller | 1. Fill product form<br>2. Upload images<br>3. Click **Terbitkan** | Valid product data | Product published | Pass | - |
| TC-WEB-PRODUCT-002 | Seller cannot publish product without images | Negative | User is logged in as seller | 1. Leave images empty<br>2. Click **Terbitkan** | Images empty | Validation message shown | Fail | SH-WEB-BUG-006 |
| TC-WEB-PRODUCT-003 | Seller can preview product before publishing | Positive | User is logged in as seller | 1. Fill form<br>2. Click **Preview** | Valid data | Preview page shown | Pass | - |
| TC-WEB-PRODUCT-004 | Seller cannot preview product without images | Negative | User is logged in as seller | 1. Leave images empty<br>2. Click **Preview** | Images empty | Validation message | Fail | - |
| TC-WEB-PRODUCT-005 | Seller cannot publish product with negative price | Negative | User is logged in as seller | 1. Enter negative price<br>2. Click **Terbitkan** | Price -1,000,000 | Submission rejected | Fail | - |
| TC-WEB-PRODUCT-006 | Seller can edit product successfully | Positive | Seller has published product | 1. Open product<br>2. Click **Edit**<br>3. Update data<br>4. Save | Valid updated data | Product updated successfully | Pass | - |
| TC-WEB-PRODUCT-007 | Seller can delete product successfully | Positive | Seller has product | 1. Click **Delete**<br>2. Confirm deletion | - | Product removed | Pass | - |
| TC-WEB-PRODUCT-008 | System blocks publishing with empty mandatory fields | Negative | User is logged in as seller | 1. Leave mandatory field empty<br>2. Click **Terbitkan** | Empty required field | Validation message shown | Pass | - |

---

## 📄 Module: Product Detail Page  

| Test Case ID | Title | Type | Preconditions | Test Steps | Test Data | Expected Result | Status | Bug ID |
|--------------|-------|------|---------------|------------|-----------|-----------------|--------|--------|
| TC-WEB-PDP-001 | Product detail page opens without product image | Negative | User is logged in | 1. Open product without image | Product without image | Page loads normally | Fail | SH-WEB-BUG-008 |
| TC-WEB-PDP-002 | Default image is displayed when product image is missing | UI | Product has no image | 1. Open product detail page | - | Default image displayed | Pass | - |
| TC-WEB-PDP-003 | Seller information is displayed correctly on PDP | UI | Product exists | 1. Open product detail page | - | Seller info shown correctly | Pass | - |

---

## 💬 Module: Negotiation

| Test Case ID | Title | Type | Preconditions | Test Steps | Test Data | Expected Result | Status | Bug ID |
|--------------|-------|------|---------------|------------|-----------|-----------------|--------|--------|
| TC-WEB-NEGOTIATION-001 | Negotiation price input has maximum digit limit | Negative | User is logged in | 1. Enter long price<br>2. Click **Kirim** | 999999999999 | Input restricted | Fail | SH-WEB-BUG-005 |
| TC-WEB-NEGOTIATION-002 | Negotiation price does not allow negative value | Negative | User is logged in | 1. Enter negative price<br>2. Click **Kirim** | -50 | Validation message | Fail | SH-WEB-BUG-007 |
| TC-WEB-NEGOTIATION-003 | Buyer cannot submit negotiation without price | Negative | User is logged in | 1. Leave price empty<br>2. Click **Kirim** | Empty price | Validation message shown | Pass | - |
| TC-WEB-NEGOTIATION-004 | Buyer can cancel negotiation successfully | Positive | Negotiation exists | 1. Open negotiation<br>2. Click **Cancel** | - | Negotiation cancelled | Pass | - |
