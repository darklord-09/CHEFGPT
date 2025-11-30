# 🧑‍🍳 CHEFGPT: AI-Powered Recipe Application

## Project Introduction

**CHEFGPT** is a full-stack application designed for cooking enthusiasts. It leverages **Artificial Intelligence (AI)** to generate personalized recipe suggestions based on ingredients provided by the user and offers a personalized **Dashboard** for storing and managing favorite recipes.

This project was instrumental in strengthening my skills in **React**, **Node.js**, and **SQL DB queries**, alongside applying **Generative AI** in a creative, practical context.

---

## Key Features Implemented

* **AI Recipe Generation:** Uses the **HuggingFace API** to access an LLM client, generating recipe suggestions in a specific, structured format.
* **Manual Recipe Adder:** Allows users to manually input and save their own recipes in the required format.
* **Recipe Dashboard:** Shows saved recipes (limited to 5 per user).
* **User Authentication:** Simple **Sign In** and **Signup** features.
* **Recipe Search Bar:** Functionality to search existing recipes by name via LLM suggestion.

---

## 💻 Backend Development

* **Technologies:** **Node.js**, **Express.js**

### Server Structure (Express.js)

The server handles routing and business logic for authentication and recipe management.

#### Authentication Routes:

| Endpoint | Functionality | Purpose |
| :--- | :--- | :--- |
| `/Createuser` | **Sign Up** | Handles user registration. |
| `/findUser` | **Sign In** | Handles user login/authentication. |

#### Recipes Routes:

| Endpoint | Functionality | Purpose |
| :--- | :--- | :--- |
| `/store` | **Add Recipe** | Adds a manually input recipe to the database. |
| `/delete` | **Delete Recipe** | Deletes a specified saved recipe. |
| `/ingredients` | **AI Generation (Ingredients)** | For generating recipes from user-provided ingredients (LLM). |
| `/recipe` | **AI Generation (By Name)** | For generating a recipe given a specific dish name (LLM). |
| `/` | **Get Saved List** | Returns the list of saved recipes for the logged-in user. |

---

## 🗄️ Database: PostgreSQL (SQL)

* **Database:** **SQL**
* **DBMS:** **PostgreSQL**

#### Rationale for PostgreSQL:

The choice of SQL and PostgreSQL was driven by the need for:

* **Strict Format Enforcement** and Data Integrity.
* Faster **Update** and **Delete** performance (critical for recipe management, especially with the 5-recipe limit).
* Efficient **Joins** for fetching user-specific recipes (better read performance). 

[Image of SQL JOIN types diagram]

* **Efficient storage** for structured, relational data.

#### Database Schema

**1. `users_table`**

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `user_id` | `INT` | `PRIMARY KEY` | Unique identifier for the user. |
| `username` | `VARCHAR(50)` | `NOT NULL` | User's chosen username. |
| `password` | `TEXT` | `NOT NULL` | User's password (hashed in a production environment). |

**SQL Schema:**
```sql
CREATE TABLE users_table (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);
