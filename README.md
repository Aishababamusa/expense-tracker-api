# 💰 Expense Tracker API

A secure and feature-rich RESTful API for managing personal expenses, built with Node.js, Express, and PostgreSQL. This project demonstrates full-stack backend development skills including authentication, database design, and advanced querying.

## 👩‍💻 About This Project

This is my second backend project, built as part of my journey to becoming a professional backend developer. I developed this API from scratch to showcase my ability to:
- Design and implement secure RESTful APIs
- Work with relational databases and complex SQL queries
- Implement authentication and authorization
- Write clean, maintainable, and well-structured code
- Build real-world features that users actually need

**Project Timeline:** [21st January 2026 - 4th February 2026]

## ✨ Features

### Core Functionality
- ✅ **User Authentication & Authorization** - Secure JWT-based authentication
- ✅ **CRUD Operations** - Complete Create, Read, Update, Delete for expenses
- ✅ **User-Specific Data** - Each user can only access their own expenses
- ✅ **Password Security** - Passwords hashed with bcrypt

### Advanced Features
- 🔍 **Search Functionality** - Search expenses by description
- 📅 **Date Range Filtering** - Filter expenses by custom date ranges
- 🏷️ **Category Filtering** - Filter expenses by type/category
- 📊 **Spending Statistics** - Get total spending and breakdown by category
- 🔐 **Protected Routes** - Middleware-based route protection

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Environment Variables:** dotenv
- **Development:** Nodemon

## 📁 Project Structure
```
expense-tracker-api/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── expenseController.js # Expense operations logic
│   ├── models/
│   │   ├── userModel.js         # User database queries
│   │   └── expenseModel.js      # Expense database queries
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication endpoints
│   │   └── expenseRoutes.js     # Expense endpoints
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification middleware
│   └── server.js                # Application entry point
├── .env                         # Environment variables (not in repo)
├── .gitignore
├── package.json
└── README.md
```

## 🗄️ Database Schema

### Users Table
```sql
- id (Primary Key, Auto-increment)
- name (String, Required)
- email (String, Unique, Required)
- password (String, Hashed, Required)
- created_at (Timestamp, Auto-generated)
```

### Types Table
```sql
- id (Primary Key, Auto-increment)
- name (String, Unique, Required)
```

### Expenses Table
```sql
- id (Primary Key, Auto-increment)
- user_id (Foreign Key → users.id)
- type_id (Foreign Key → types.id)
- amount (Decimal, Required)
- description (Text)
- date (Date, Required)
- created_at (Timestamp, Auto-generated)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/YOUR_USERNAME/expense-tracker-api.git
   cd expense-tracker-api
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
```env
   PORT=3000
   DATABASE_URL=postgresql://username:password@localhost:5432/expense_tracker
   JWT_SECRET=your_super_secret_jwt_key_here
```

4. **Set up the database**
   
   Create the database and tables:
```sql
   CREATE DATABASE expense_tracker;
   
   -- Run the SQL schema (see database setup section)
```

5. **Run the application**
```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
```

The API will be running at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register a New User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "Aisha Baba Musa",
  "email": "aisha@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "Aisha Baba Musa",
      "email": "aisha@example.com",
      "created_at": "2026-02-04T..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "aisha@example.com",
  "password": "securepassword123"
}
```

---

### Expense Endpoints
*All expense endpoints require authentication. Include the JWT token in the Authorization header:*
```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Get All Expenses
```http
GET /expenses
```

#### Get Single Expense
```http
GET /expenses/:id
```

#### Create New Expense
```http
POST /expenses
Content-Type: application/json

{
  "type_id": 1,
  "amount": 50.00,
  "description": "Groceries from the market",
  "date": "2026-02-04"
}
```

#### Update Expense
```http
PUT /expenses/:id
Content-Type: application/json

{
  "type_id": 2,
  "amount": 75.00,
  "description": "Updated description",
  "date": "2026-02-04"
}
```

#### Delete Expense
```http
DELETE /expenses/:id
```

---

### Filter & Search Endpoints

#### Filter by Date Range
```http
GET /expenses/filter/date-range?startDate=2026-01-01&endDate=2026-01-31
```

#### Filter by Category
```http
GET /expenses/filter/type?typeId=1
```

#### Search Expenses
```http
GET /expenses/search?q=groceries
```

---

### Statistics Endpoints

#### Get Total Spending
```http
GET /expenses/stats/total

# With date range
GET /expenses/stats/total?startDate=2026-01-01&endDate=2026-01-31
```

#### Get Spending by Category
```http
GET /expenses/stats/by-category

# With date range
GET /expenses/stats/by-category?startDate=2026-01-01&endDate=2026-01-31
```

## 🔒 Security Features

- **Password Hashing:** All passwords are hashed using bcrypt before storage
- **JWT Authentication:** Secure token-based authentication with expiration
- **Protected Routes:** Middleware ensures only authenticated users can access expenses
- **User Isolation:** Users can only access their own data
- **SQL Injection Prevention:** Parameterized queries protect against SQL injection
- **Environment Variables:** Sensitive data stored in environment variables

## 🧪 Testing

I tested this API extensively using **Postman**, covering:
- All CRUD operations
- Authentication flows (register, login, protected routes)
- Edge cases (invalid data, unauthorized access, non-existent resources)
- Filter and search functionality
- Statistics calculations

## 📈 What I Learned

Building this project taught me:
- **Database Design:** Creating normalized schemas with proper relationships and foreign keys
- **Authentication:** Implementing secure JWT-based authentication from scratch
- **MVC Architecture:** Organizing code into Models, Views (JSON responses), and Controllers
- **Middleware:** Creating reusable middleware for authentication and error handling
- **SQL Mastery:** Writing complex queries with JOINs, aggregations, and filtering
- **API Design:** Following REST principles and best practices
- **Error Handling:** Implementing comprehensive try-catch blocks and meaningful error messages
- **Git Workflow:** Using Git and GitHub for version control throughout development
- **Problem Solving:** Debugging errors independently and finding solutions

## 🎯 Future Enhancements

Ideas for future improvements:
- [ ] Add pagination for large datasets
- [ ] Implement expense categories management (add/edit/delete categories)
- [ ] Add recurring expenses functionality
- [ ] Generate expense reports (PDF/CSV export)
- [ ] Add budget tracking and alerts
- [ ] Implement email verification
- [ ] Add password reset functionality
- [ ] Deploy to production (Render/Railway/Heroku)

## 👤 Author

**Aisha Baba Musa**
- Email: aishababamusa103@gmail.com
- GitHub: [@YOUR_GITHUB_USERNAME](https://github.com/Aishababmusa)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/aishababamusa) 

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

This project was built as part of my self-taught backend development journey. Special thanks to the developer community for the countless resources and documentation that made this possible.

---

⭐ If you found this project interesting or useful, please consider giving it a star!