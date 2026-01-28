## Issue Type
Bug

## Bug ID
SH-WEB-BUG-003

## Summary
No error notification when uploading profile photo larger than 1MB

## Platform
Web Application

## Environment
- Application: SecondHand Web
- Browser: Microsoft Edge
- OS: Windows 10

## Description
When uploading a profile photo larger than 1MB, the upload fails silently without any notification.

## Preconditions
User is logged in

## Steps to Reproduce
1. Open SecondHand homepage
2. Login with valid account
3. Open **Complete Account Information**
4. Upload profile photo larger than 1MB
5. Click **Save**

## Expected Result
System should display a notification indicating photo size exceeds the limit (1MB).

## Actual Result
Photo upload fails without any notification.

## Severity
Medium

## Priority
High

## Status
Open

## Fix Version
Not Assigned

## Evidence
![SH-WEB-BUG-003](Evidence/SH-WEB-BUG-003.webm)
