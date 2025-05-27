# Complete Guide to Sequelize ORM

## What is Sequelize?

**Sequelize is a third-party package for Object Relational Mapping (ORM)**. It functions as a **library** that acts as a bridge between your JavaScript application and your SQL database.

### The Power of Sequelize

The beauty of Sequelize lies in how **it does the heavy lifting of SQL work for us and maps it to JavaScript objects with convenience methods**. This means that **we don't have to write SQL** queries manually - Sequelize handles the translation between JavaScript and SQL automatically.

### Object-Relational Mapping Explained

Think of Sequelize as a translator between two different worlds:

| JavaScript World | SQL World |
| ---------------- | --------- |
| Objects          | Tables    |
| Properties       | Columns   |
| Methods          | Queries   |
| Instances        | Records   |

**A User object with name, age, email, and password can be mapped into a user table with those attributes mapped** directly. This seamless translation is what makes ORMs so powerful for developers.

**Example Mapping:**

```javascript
// JavaScript Object
const userObject = {
  name: "John Smith",
  age: 30,
  email: "john@email.com",
  password: "securePassword123"
};
```

**Maps to SQL Table:**
| id | name | age | email | password |
|----|------|-----|-------|----------|
| 1 | John Smith | 30 | john@email.com | securePassword123 |

---

## Core Sequelize Concepts

### Models: Defining Your Data Structure

**We get models in Sequelize, and we get to define which data defines these models**. Models are essentially blueprints that describe the structure of your database tables and the behavior of the data they contain.

**Examples of common models include: User, Product, Order, Category**

#### Defining a Model

```javascript
// Example: Defining a User model
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
```

### Model Instantiation: Creating Objects

**We can instantiate these models** to create new instances of our data objects. **Example: `const user = User.build()`**

This creates a new User instance that you can work with in your JavaScript code before saving it to the database.

#### Creating Instances

```javascript
// Building a new user instance (not yet saved to database)
const user = User.build({
  name: "Jane Doe",
  age: 25,
  email: "jane@email.com",
  password: "mySecretPassword"
});

// Creating and immediately saving to database
const savedUser = await User.create({
  name: "Bob Johnson",
  age: 32,
  email: "bob@email.com",
  password: "anotherPassword"
});
```

### Queries: Retrieving and Manipulating Data

**We can run queries using convenient methods**. **Example: `User.findAll()`**

Sequelize provides numerous built-in methods that translate to SQL queries automatically.

#### Common Query Examples

```javascript
// Find all users
const allUsers = await User.findAll();

// Find a specific user by ID
const user = await User.findByPk(1);

// Find users with specific conditions
const adults = await User.findAll({
  where: {
    age: {
      [Op.gte]: 18
    }
  }
});

// Update a user
await User.update({ age: 26 }, { where: { id: 1 } });

// Delete a user
await User.destroy({
  where: { id: 1 }
});
```

### Associations: Defining Relationships

**We can create associations between models**. **Example: `User.hasMany(Product)`**

Associations define how different models relate to each other, similar to foreign key relationships in SQL databases.

#### Types of Associations

```javascript
// One-to-Many: A user can have many products
User.hasMany(Product);
Product.belongsTo(User);

// Many-to-Many: Users can have many roles, roles can belong to many users
User.belongsToMany(Role, { through: "UserRoles" });
Role.belongsToMany(User, { through: "UserRoles" });

// One-to-One: A user has one profile
User.hasOne(Profile);
Profile.belongsTo(User);
```

---

## Benefits of Using Sequelize

### 1. No Manual SQL Writing

Instead of writing complex SQL queries, you work with intuitive JavaScript methods:

| SQL Query                                                           | Sequelize Method                                         |
| ------------------------------------------------------------------- | -------------------------------------------------------- |
| `SELECT * FROM users`                                               | `User.findAll()`                                         |
| `SELECT * FROM users WHERE age > 18`                                | `User.findAll({ where: { age: { [Op.gt]: 18 } } })`      |
| `INSERT INTO users (name, email) VALUES ('John', 'john@email.com')` | `User.create({ name: 'John', email: 'john@email.com' })` |
| `UPDATE users SET age = 30 WHERE id = 1`                            | `User.update({ age: 30 }, { where: { id: 1 } })`         |

### 2. Data Validation

Sequelize provides built-in validation to ensure data integrity:

```javascript
const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 120
    }
  }
});
```

### 3. Database Abstraction

Sequelize works with multiple database systems:

- **PostgreSQL**
- **MySQL**
- **MariaDB**
- **SQLite**
- **Microsoft SQL Server**

You can switch between databases with minimal code changes.

---

## Getting Started with Sequelize

### Installation

```bash
# Install Sequelize and database driver
npm install sequelize
npm install pg pg-hstore    # for PostgreSQL
npm install mysql2          # for MySQL
npm install sqlite3         # for SQLite
```

### Basic Setup

```javascript
const { Sequelize, DataTypes } = require("sequelize");

// Database connection
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres" // or 'mysql', 'sqlite', etc.
});

// Test connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
}
```
