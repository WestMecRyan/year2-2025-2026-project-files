## Sample usersDB.json## Simple Server-Side Exercises with EJS

Here are some beginner-friendly exercises using JavaScript's built-in array methods:

### **Exercise 1: Filter by Age**

```javascript
// In server.js route
app.get("/young-users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDBfilePath, "utf8"));

  const youngUsers = users.filter((user) => {
    const birthYear = new Date(user.birthdate).getFullYear();
    const age = 2024 - birthYear;
    return age < 30;
  });

  res.render("users-list", { users: youngUsers, title: "Young Users" });
});
```

### **Exercise 2: Sort by Last Name**

```javascript
app.get("/users-alphabetical", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDBfilePath, "utf8"));

  const sortedUsers = users.sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  res.render("users-list", { users: sortedUsers, title: "Users A-Z" });
});
```

### **Exercise 3: Find by Email Domain**

```javascript
app.get("/gmail-users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDBfilePath, "utf8"));

  const gmailUsers = users.filter((user) => user.email.includes("@gmail.com"));

  res.render("users-list", { users: gmailUsers, title: "Gmail Users" });
});
```

### **Simple EJS Template (views/users-list.ejs)**

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
  </head>
  <body>
    <h1><%= title %></h1>
    <ul>
      <% users.forEach(user => { %>
      <li>
        <%= user.firstName %> <%= user.lastName %> - <%= user.email %> - <%=
        user.phone %>
      </li>
      <% }); %>
    </ul>
  </body>
</html>
```

**Try these routes:**

- `/young-users` - Shows users under 30
- `/users-alphabetical` - Shows all users sorted by last name
- `/gmail-users` - Shows only users with gmail addresses

Want to try one of these or explore more advanced filtering?

## More Array Methods for User Data

### **Exercise 4: Map - Transform Data**

```javascript
app.get("/user-names-only", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDBfilePath, "utf8"));

  const fullNames = users.map((user) => `${user.firstName} ${user.lastName}`);

  res.render("names-list", { names: fullNames, title: "Full Names" });
});
```

### **Exercise 5: Find - Get Single User**

```javascript
app.get("/find-user/:firstName", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDBfilePath, "utf8"));

  const foundUser = users.find(
    (user) =>
      user.firstName.toLowerCase() === req.params.firstName.toLowerCase()
  );

  res.render("single-user", { user: foundUser, title: "User Found" });
});
```

### **Exercise 6: Reduce - Count by Birth Year**

```javascript
app.get("/birth-year-stats", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDBfilePath, "utf8"));

  const yearCounts = users.reduce((acc, user) => {
    const year = new Date(user.birthdate).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  res.render("year-stats", { stats: yearCounts, title: "Birth Year Stats" });
});
```

### **Exercise 7: Some/Every - Boolean Checks**

```javascript
app.get("/user-checks", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDBfilePath, "utf8"));

  const hasGmailUser = users.some((user) => user.email.includes("@gmail.com"));
  const allHavePhone = users.every((user) => user.phone.length > 0);

  res.render("checks", {
    hasGmail: hasGmailUser,
    allHavePhone: allHavePhone,
    title: "User Checks",
  });
});
```

### **Exercise 8: Slice - Pagination**

```javascript
app.get("/users-page/:page", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDBfilePath, "utf8"));
  const page = parseInt(req.params.page) || 1;
  const perPage = 3;

  const startIndex = (page - 1) * perPage;
  const pageUsers = users.slice(startIndex, startIndex + perPage);

  res.render("users-list", {
    users: pageUsers,
    title: `Page ${page} Users`,
  });
});
```

### **Exercise 9: Chain Methods - Complex Filtering**

```javascript
app.get("/adult-sorted-first-names", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDBfilePath, "utf8"));

  const result = users
    .filter((user) => {
      const age = 2024 - new Date(user.birthdate).getFullYear();
      return age >= 25;
    })
    .sort((a, b) => a.firstName.localeCompare(b.firstName))
    .map((user) => user.firstName);

  res.render("names-list", { names: result, title: "Adult Names (Sorted)" });
});
```

### **Exercise 10: Includes/IndexOf - Search**

```javascript
app.get("/search/:term", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDBfilePath, "utf8"));
  const searchTerm = req.params.term.toLowerCase();

  const matchingUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm) ||
      user.lastName.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  );

  res.render("users-list", {
    users: matchingUsers,
    title: `Search Results for "${req.params.term}"`,
  });
});
```

**Test these routes:**

- `/user-names-only` - Just the names
- `/find-user/Emma` - Find Emma specifically
- `/birth-year-stats` - Count users by birth year
- `/users-page/1` - First 3 users
- `/search/john` - Search for "john" in names/emails

Which method interests you most?
