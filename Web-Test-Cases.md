# 📄 WEB TEST CASES — SecondHand Web Application

---

## 🔐 Module: Authentication  

| Test Case ID | Title | Type | Preconditions | Test Steps | Test Data | Expected Result | Status | Bug ID |
|--------------|-------|------|---------------|------------|-----------|-----------------|--------|--------|
| TC-WEB-AUTH-001 | User cannot register using invalid email domain | Negative | User is on registration page | 1. Open homepage<br>2. Click **Masuk**<br>3. Click **Daftar di sini**<br>4. Enter invalid email<br>5. Click **Daftar** | Email: faruq@g | Registration is rejected with validation message | Fail | SH-WEB-BUG-001 |

---

## 👤 Module: User Profile

| Test Case ID | Title | Type | Preconditions | Test Steps | Test Data | Expected Result | Status | Bug ID |
|--------------|-------|------|---------------|------------|-----------|-----------------|--------|--------|
| TC-WEB-PROFILE-001 | Phone number field accepts numeric characters only | Negative | User is logged in | 1. Open profile page<br>2. Open **Complete Account Information**<br>3. Enter letters/symbols in phone number<br>4. Click **Save** | Phone: abc@123 | System rejects non-numeric input | Fail | SH-WEB-BUG-002 |
| TC-WEB-PROFILE-002 | Error shown when uploading profile photo >1MB | Negative | User is logged in | 1. Open profile page<br>2. Upload image >1MB<br>3. Click **Save** | Image size: >1MB | Error message about file size is displayed | Fail | SH-WEB-BUG-003 |
| TC-WEB-PROFILE-003 | Profile photo is displayed correctly on homepage | UI | User is logged in | 1. Login to system<br>2. Observe profile photo on homepage | Valid profile photo | Photo is displayed without cropping | Fail | SH-WEB-BUG-004 |
| TC-WEB-PROFILE-004 | Name field accepts alphabetic characters only | Negative | User is logged in | 1. Open profile page<br>2. Enter symbols in name field<br>3. Click **Save** | Name: @@@### | Validation message is displayed | Fail | SH-WEB-BUG-009 |

---

## 📦 Module: Product Management

| Test Case ID | Title | Type | Preconditions | Test Steps | Test Data | Expected Result | Status | Bug ID |
|--------------|-------|------|---------------|------------|-----------|-----------------|--------|--------|
| TC-WEB-PRODUCT-001 | Seller can publish a product successfully | Positive | User is logged in as seller | 1. Open SecondHand website<br>2. Click **Jual**<br>3. Fill all mandatory fields<br>4. Upload product images<br>5. Click **Terbitkan** | Valid product data | Product is published successfully | Pass | - |
| TC-WEB-PRODUCT-002 | Seller cannot publish product without images | Negative | User is logged in as seller | 1. Open **Jual** page<br>2. Fill all mandatory fields except images<br>3. Click **Terbitkan** | Images: Empty | Submission blocked with validation message | Fail | SH-WEB-BUG-006 |
| TC-WEB-PRODUCT-003 | Seller can preview product before publishing | Positive | User is logged in as seller | 1. Open **Jual** page<br>2. Fill all mandatory fields<br>3. Upload images<br>4. Click **Preview** | Valid product data | Product preview page is displayed | Pass | - |
| TC-WEB-PRODUCT-004 | Seller cannot preview product without images | Negative | User is logged in as seller | 1. Open **Jual** page<br>2. Fill all mandatory fields<br>3. Leave images empty<br>4. Click **Preview** | Images: Empty | Validation message is shown | Fail | - |
| TC-WEB-PRODUCT-005 | Seller cannot publish product with negative price | Negative | User is logged in as seller | 1. Open **Jual** page<br>2. Enter negative price<br>3. Upload images<br>4. Click **Terbitkan** | Price: -1,000,000 | System rejects negative price | Fail | - |

---

## 📄 Module: Product Detail Page  

| Test Case ID | Title | Type | Preconditions | Test Steps | Test Data | Expected Result | Status | Bug ID |
|--------------|-------|------|---------------|------------|-----------|-----------------|--------|--------|
| TC-WEB-PDP-001 | Product detail page opens without product image | Negative | User is logged in | 1. Open homepage<br>2. Click product without image | Product without image | Product detail page loads normally | Fail | SH-WEB-BUG-008 |

---

## 💬 Module: Negotiation

| Test Case ID | Title | Type | Preconditions | Test Steps | Test Data | Expected Result | Status | Bug ID |
|--------------|-------|------|---------------|------------|-----------|-----------------|--------|--------|
| TC-WEB-NEGOTIATION-001 | Negotiation price input has maximum digit limit | Negative | User is logged in | 1. Open product detail page<br>2. Click **Saya tertarik dan ingin nego**<br>3. Enter long numeric value<br>4. Click **Kirim** | Price: 999999999999 | Input length is restricted | Fail | SH-WEB-BUG-005 |
| TC-WEB-NEGOTIATION-002 | Negotiation price does not allow negative value | Negative | User is logged in | 1. Open product detail page<br>2. Click **Saya tertarik dan ingin nego**<br>3. Enter negative price<br>4. Click **Kirim** | Price: -50 | Negative values are rejected | Fail | SH-WEB-BUG-007 |
