# MongoDB Atlas Free Setup

## 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and create account
3. Choose "Build a Database" → "Free" (M0 Sandbox)

## 2. Database Configuration
- **Cloud Provider**: AWS (recommended)
- **Region**: Choose closest to your users
- **Cluster Name**: `dreampad-finder`

## 3. Database Access Setup
```bash
# Create Database User
Username: dreampad-admin
Password: [Generate secure password]
Database User Privileges: Read and write to any database
```

## 4. Network Access
- Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
- Or add specific IPs for better security

## 5. Get Connection String
```bash
# Your connection string will look like:
mongodb+srv://dreampad-admin:<password>@dreampad-finder.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## 6. Database Collections
Your app will create these collections automatically:
- `users`
- `properties` 
- `offers`
