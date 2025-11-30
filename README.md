# 🧑‍🍳 CHEFGPT: AI-Powered Recipe Application

## Project Introduction

**CHEFGPT** is a full-stack application designed for cooking enthusiasts. It leverages **Artificial Intelligence (AI)** to generate personalized recipe suggestions based on ingredients provided by the user and offers a personalized **Dashboard** for storing and managing favorite recipes.

This project was instrumental in strengthening my skills in **React**, **Node.js**, and **SQL DB queries**, alongside applying **Generative AI** in a creative, practical context.

---

## Key Features Implemented

* **AI Recipe Generation:** Uses the **HuggingFace API** to access an LLM client, generating recipe suggestions in a specific, structured format.
* **Manual Recipe Adder:** Allows users to manually input and save their own recipes.
* **Recipe Dashboard:** Displays all saved recipes for the user.
* **User Authentication:** Simple **Sign In** and **Register** features.
* **Recipe Search Bar:** Functionality to search existing recipes (limited implementation).

---

## 💻 Backend Development

* **Technologies:** **Node.js**, **Express.js**

### Server Structure (Express.js)

The server handles routing and business logic for authentication and recipe management.

#### Authentication Routes:

| Endpoint | Functionality |
| :--- | :--- |
| `/auth/createuser` | Handles user registration. |
| `/auth/login` | Handles user sign-in. |

#### Recipes Routes:

| Endpoint | Functionality |
| :--- | :--- |
| `/recipes/add` | Adds a new recipe to the database. |
| `/recipes/delete` | Deletes a specified recipe. |
| `/recipes/modify` | Updates an existing recipe. |
| `/recipes/generate` | Triggers the **GenAI** recipe suggestion generator. |
| `/recipes/saved` | Displays saved recipes (Limited to 5 per user). |

---

## 🗄️ Database: PostgreSQL (SQL)

* **Database:** **SQL**
* **DBMS:** **PostgreSQL**

#### Rationale for PostgreSQL:

The choice of SQL and PostgreSQL was driven by the need for:

* **Strict Format Enforcement** and Data Integrity.
* Faster **Update** and **Delete** performance (critical for recipe management).
* Efficient **Joins** for fetching user-specific recipes (better read performance).
* **Efficient storage** for structured, relational data.

#### Database Schema

**1. `users_table`**

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `user_id` | `INT` | `PRIMARY KEY` | Unique identifier for the user. |
| `username` | `VARCHAR(50)` | `NOT NULL` | User's chosen username. |
| `password` | `VARCHAR(50)` | `NOT NULL` | User's password. |

**SQL Schema:**
```sql
CREATE TABLE users_table (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);
