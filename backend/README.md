# API Endpoints Documentation

This document provides an overview of the pending API endpoints and their details for our project. 

---


# Postal Circle & Philatelic API Documentation

This documentation provides details for the available API endpoints related to postal circles, philatelic items, news, events, and PDA (Philatelic Deposit Account) management.

## Endpoints

### 1. **Get All Postal Circle Details**
- **URL**: `GET localhost:5000/api/postal-circles`
- **Description**: Get all postal circle details without admin verification.

---

### 2. **Get All Philatelic Items**
- **URL**: `GET localhost:5000/api/philatelic-items`
- **Description**: Get all philatelic items.

---

### 3. **Upload a Philatelic Item**
- **URL**: `POST localhost:5000/api/philatelic-items`
- **Request Body**:
```json
{
  "title": "New Postal Circle Announcement",
  "description": "Join us for the upcoming event at the ABC postal circle. Learn about the latest services and updates.",
  "image": "https://example.com/news-image.jpg",
  "postalCircle": "ABC Postal Circle",
  "postedTime": "2024-11-10T14:00:00Z"
}
```

### 4. **Upload Postal Circle Details**
- **URL**: `POST localhost:5000/api/postal-circles`
- **Request Body**:
```json
{
  "unique_id": "PC456",
  "name": "Mumbai Postal Circle",
  "email": "mumbai@postal.com",
  "user": "615c2d6e8f123456789abcd1",
  "region": "Western",
  "state": "Maharashtra",
  "address": {
    "street": "123 Postal Lane",
    "city": "Mumbai",
    "pincode": "400001"
  },
  "coin_rules": [
    {
      "minimum_order_amount": 500,
      "coins_to_give": 10
    }
  ]
}
```
---
### 5. Get All PDA Accounts
- **URL**: `GET localhost:5000/api/pda`
- **Description**: Get all PDA (Philatelic Deposit Account) details.

---

### 6. Create a News Item
- **URL**: `POST localhost:5000/api/news`
- **Request Body**:
  ```json
  {
    "title": "New Postal Circle Announcement",
    "description": "Join us for the upcoming event at the ABC postal circle. Learn about the latest services and updates.",
    "image": "https://example.com/news-image.jpg",
    "postalCircle": "ABC Postal Circle",
    "postedTime": "2024-11-10T14:00:00Z"
  }

### 7. Retrieve All News Items
- **URL**: `GET localhost:5000/api/news`
- **Description**: Retrieve all news items.

---

### 8. Retrieve a News Item by ID
- **URL**: `GET localhost:5000/api/news/{id}`
- **Description**: Retrieve a news item by its ID.

---

### 9. Update a News Item by ID
- **URL**: `PUT localhost:5000/api/news/{id}`
- **Request Body**:
  ```json
  {
    "title": "Updated Postal Circle Announcement",
    "description": "Updated description for the postal circle announcement."
  }
### 10. Delete a News Item by ID
- **URL**: `DELETE localhost:5000/api/news/{id}`
- **Description**: Delete a news item by ID.

---

### 11. Create an Event
- **URL**: `POST localhost:5000/api/events`
- **Request Body**:
  ```json
  {
    "title": "Music Festival",
    "description": "Join us for a great music festival.",
    "postalCircle": "12345",
    "image": "https://example.com/event-image.jpg",
    "startDate": "2024-12-01",
    "endDate": "2024-12-05",
    "startTime": "6:00 pm",
    "endTime": "10:00 pm",
    "location": "Los Angeles, CA",
    "registrationLink": "https://example.com/register",
    "postedDate": "2024-10-01",
    "lat": 34.0522,
    "lng": -118.2437
  }
### 12. Retrieve All Events
- **URL**: `GET localhost:5000/api/events`
- **Description**: Retrieve all events.

---

### 13. Retrieve an Event by ID
- **URL**: `GET localhost:5000/api/events/{id}`
- **Description**: Retrieve an event by ID.

---

### 14. Update an Event
- **URL**: `PUT localhost:5000/api/events/{id}`
- **Request Body**:
  ```json
  {
    "title": "Updated Event Title",
    "description": "Updated description for the event."
  }
### 15. Delete an Event
- **URL**: `DELETE localhost:5000/api/events/{id}`
- **Description**: Delete an event by ID.

---

### 16. Create a PDA Account
- **URL**: `POST localhost:5000/api/pda`
- **Request Body**:
  ```json
  {
    "account_number": "PDA123456789",
    "user": "6730c113e7b9622fed06eee9",
    "postal_circle": "6730b1b6b21c8b91449c9f62",
    "balance": 5000,
    "preferences": {
      "item_types": ["stamps", "souvenir sheets", "first day covers"],
      "notification_preferences": {
        "email": true,
        "sms": false
      }
    },
    "status": "active",
    "philatelicInventory": {
      "MintCommemorativeStamps": 20,
      "MintDefinitiveStamps": 15,
      "TopMarginalBlock": 5,
      "BottomMarginalBlock": 7,
      "FullSheet": 3,
      "FirstDayCoversAffixed": 10,
      "FirstDayCoversBlank": 8,
      "InformationBrochureAffixed": 5,
      "InformationBrochureBlank": 6,
      "AnnualStampPack": 2,
      "ChildrenSpecialAnnualStampPack": 1,
      "SpecialCollectorsStampPack": 3,
      "FirstDayCoverPack": 4,
      "MiniSheetSouvenirSheet": 12,
      "PostalStationery": 6,
      "OtherItems": "Custom commemorative stamps"
    }
  }







