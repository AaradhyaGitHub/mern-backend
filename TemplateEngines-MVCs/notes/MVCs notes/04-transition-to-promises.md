````markdown
# 📘 Deep Dive: Node.js File System, Callbacks vs Promises, and Building a Product Model in Express

Welcome! If you're building your first backend with Node.js and Express, you're probably going to hit the point where you need to read and write data to the file system.

This article will **walk you line by line** through:

- How Node.js handles asynchronous file reading/writing
- How callback-based logic works
- How and why to migrate to Promises
- How to build a clean, promise-based model system for saving and fetching data

## 🗃️ The File-Based Product Model (Old vs New)

We'll start with the **old version** that uses **callbacks**, and migrate to the newer, cleaner version that uses **Promises**.

---

## 🧓 OLD VERSION (Callback-Based)

```js
const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
```
````

---

### 🧠 How This Works – Line by Line (Callback Version)

#### 1. `const fs = require("fs");`

This imports Node's built-in **File System** module, allowing us to read/write files.

#### 2. `const path = require("path");`

Node's **Path** module helps us build safe, cross-platform file paths.

#### 3. `const p = path.join(...)`

We dynamically build the path to the file where products are stored:

- `require.main.filename` is the entry point file (e.g., `app.js`)
- `path.dirname(...)` gives us the directory path of that file
- `'data', 'products.json'` means we're looking for a file like: `/yourproject/data/products.json`

#### 4. `getProductsFromFile(cb)`

This function **reads the file** asynchronously using a **callback**.

```js
fs.readFile(p, (err, fileContent) => {
  if (err) return cb([]); // If file not found or corrupted, return an empty array
  cb(JSON.parse(fileContent)); // Otherwise parse the JSON and return
});
```

This uses the **callback pattern**:

- Instead of returning data, we **pass a function** (the callback) to `getProductsFromFile()`
- That callback will run **after** the file is read

This is known as the **"error-first callback"** convention in Node.js.

#### 5. `save()`

The `save` method:

- Loads the current product list from the file
- Adds the current product (`this`)
- Writes the updated list back to the file

```js
getProductsFromFile((products) => {
  products.push(this);
  fs.writeFile(p, JSON.stringify(products), (err) => {
    console.log(err);
  });
});
```

Here you see **callback nesting**: read file → update → write file → log error. This can become messy—also known as "callback hell".

---

## 🚀 NEW VERSION (Promise-Based)

### The Upgraded Product Model with `fs.promises`

```js
const fs = require("fs").promises;
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = () => {
  return fs
    .readFile(p)
    .then((fileContent) => {
      return JSON.parse(fileContent);
    })
    .catch((err) => {
      return [];
    });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    return getProductsFromFile()
      .then((products) => {
        products.push(this);
        return fs.writeFile(p, JSON.stringify(products));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    return getProductsFromFile();
  }
};
```

---

### 🔍 How This Works – Line by Line (Promise Version)

#### `const fs = require('fs').promises;`

This loads the **Promise-based API** of the `fs` module, allowing us to use `.then()` instead of callbacks.

#### `const path = require('path');` (same as before)

Still using the path module to build a safe path.

#### `const p = path.join(...)` (same as before)

Creates the full path to `products.json`.

---

### 🔁 `getProductsFromFile` – Promisified

```js
const getProductsFromFile = () => {
  return fs
    .readFile(p)
    .then((fileContent) => {
      return JSON.parse(fileContent);
    })
    .catch((err) => {
      return [];
    });
};
```

#### What’s going on?

- `fs.readFile(p)` returns a **Promise**
- `.then(fileContent => {...})`: this runs **after the file is successfully read**
- `JSON.parse(fileContent)`: convert the text into an array of products
- `.catch(...)`: if the file doesn't exist or can't be read, we **return an empty array** to keep the app running smoothly

---

### 💾 `save()` – Promises Version

```js
save() {
  return getProductsFromFile()
    .then(products => {
      products.push(this);
      return fs.writeFile(p, JSON.stringify(products));
    })
    .catch(err => {
      console.log(err);
    });
}
```

#### Key Concepts:

1. `getProductsFromFile()` returns a Promise that resolves to an array of products.
2. `.then(products => { ... })` lets us wait until those products are loaded.
3. `products.push(this)` adds the new product.
4. `fs.writeFile(...)` writes the new array back to disk. Since it's a Promise, we return it.
5. `.catch(err => ...)` handles any error in reading OR writing.

No nested callbacks! It's **flat, readable, and clean**.

---

### 📦 `static fetchAll()`

```js
static fetchAll() {
  return getProductsFromFile();
}
```

Since `getProductsFromFile()` already returns a Promise that resolves to the array of products, `fetchAll()` simply returns that Promise.

---

## 📡 How the Controller Uses It

```js
exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/error");
    });
};
```

This code:

1. Creates a new product with the submitted title.
2. Calls `.save()` which returns a Promise.
3. `.then()` waits for the file to be written.
4. If successful, redirect to homepage.
5. If error, redirect to error page.

---

## 🤔 Why Use Promises?

| Feature           | Callbacks                  | Promises                     |
| ----------------- | -------------------------- | ---------------------------- |
| Readability       | Nested / Hard to read      | Flat / Easy to follow        |
| Error Handling    | Scattered across functions | Unified `.catch()`           |
| Composition       | Hard to chain multiple ops | Easy chaining with `.then()` |
| Modern Support    | Legacy                     | Standard in modern JS        |
| Async/Await Ready | ❌                         | ✅                           |

---

## 🧪 Summary

### What You Learned

- How to **read and write files** in Node.js using `fs` and `path`
- How Node’s **callback system** works and what "callback hell" means
- How to **migrate to Promises** using `fs.promises`
- How Promises work: `.then()`, `.catch()`
- How to create a **Product model** that’s clean, testable, and expressive
- How to plug it into an **Express controller**

---

## 🔄 Next Steps

Once you’re comfortable with Promises, the natural next step is:

- Use **async/await** syntax instead of `.then()`
- Add **input validation**
- Store data in a **real database** (like MongoDB or PostgreSQL)

---

## ✅ Exercise: Convert to `async/await`

Try rewriting the `save()` method using `async/await` syntax!

```js
async save() {
  try {
    const products = await getProductsFromFile();
    products.push(this);
    await fs.writeFile(p, JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
}
```

---

Happy coding! 🎉
