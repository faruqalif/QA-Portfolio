Test Case ID	Title	Type	Preconditions	Test Steps	Test Data	Expected Result	Status
TC-WEB-PRODUCT-001	Seller can publish a product successfully	Positive	User is logged in as seller	"1. Open SecondHand website
2. Click Jual
3. Fill all mandatory fields
4. Upload product images
5. Click Terbitkan"	Valid product data	Product is published successfully	Pass
TC-WEB-PRODUCT-002	Seller cannot publish product without uploading images	Negative	User is logged in as seller	"1. Open Jual page
2. Fill all mandatory fields except images
3. Click Terbitkan"	Images: Empty	System blocks submission and shows validation message	Fail
TC-WEB-PRODUCT-003	Seller can preview product before publishing	Positive	User is logged in as seller	"1. Open Jual page
2. Fill all mandatory fields
3. Upload images
4. Click Preview"	Valid product data	Product preview page is displayed correctly	Pass
TC-WEB-PRODUCT-004	Seller cannot preview product without images	Negative	User is logged in as seller	"1. Open Jual page
2. Fill all mandatory fields
3. Leave images empty
4. Click Preview"	Images: Empty	Validation message is shown	Fail
TC-WEB-PRODUCT-005	Seller cannot publish product with negative price	Negative	User is logged in as seller	"1. Open Jual page
2. Enter negative price
3. Upload images
4. Click Terbitkan"	Price: -1,000,000	System rejects negative price input	Fail
TC-WEB-AUTH-001	User cannot register using invalid email domain	Negative	User is on registration page	"1. Open homepage
2. Click Masuk
3. Click Daftar di sini
4. Enter invalid email
5. Click Daftar"	Email: faruq@g	Registration is rejected with validation message	Fail
TC-WEB-PROFILE-001	Phone number field accepts numeric characters only	Negative	User is logged in	"1. Open profile page
2. Open Complete Account Information
3. Enter letters/symbols in phone number
4. Click Save"	Phone: abc@123	System rejects non-numeric input	Fail
TC-WEB-PROFILE-002	System shows error notification when uploading profile photo >1MB	Negative	User is logged in	"1. Open profile page
2. Upload image >1MB
3. Click Save"	Image size: >1MB	Error message about file size is displayed	Fail
TC-WEB-PROFILE-003	Profile photo is displayed correctly on homepage	UI	User is logged in	"1. Login to system
2. Observe profile photo on homepage"	Valid profile photo	Photo is displayed without cropping	Fail
TC-WEB-NEGOTIATION-001	Negotiation price input has maximum digit limit	Negative	User is logged in	"1. Open product detail page
2. Click Saya tertarik dan ingin nego
3. Enter long numeric value
4. Click Kirim"	Price: 999999999999	Input length is restricted	Fail
TC-WEB-PRODUCT-001	Seller must upload at least one photo before publishing product	Negative	User is logged in as seller	"1. Open Jual page
2. Fill product details without photo
3. Click Terbitkan"	Images: Empty	Submission is blocked with validation message	Fail
TC-WEB-NEGOTIATION-002	Negotiation price does not allow negative value	Negative	User is logged in	"1. Open product detail page
2. Click Saya tertarik dan ingin nego
3. Enter negative price
4. Click Kirim"	Price: -50	Negative values are rejected	Fail
TC-WEB-PDP-001	Product detail page opens normally without product image	Negative	User is logged in	"1. Open homepage
2. Click product without image"	Product without image	Product detail page loads normally	Fail
TC-WEB-PROFILE-004	Name field accepts alphabetic characters only	Negative	User is logged in	"1. Open profile page
2. Enter symbols in name field
3. Click Save"	Name: @@@###	Validation message is displayed	Fail
