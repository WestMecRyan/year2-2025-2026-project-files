### Option 1: Create the Default Directory (requires admin rights)
```bash
# Create the default MongoDB data directory
sudo mkdir -p /data/db
sudo chown $(whoami) /data/db

# Then start MongoDB
mongod
```

### Option 2: Use Custom Data Directory (Recommended)
```bash
# Create a local data directory in your project
mkdir mongodb-data

# Start MongoDB with custom data path
mongod --dbpath ./mongodb-data
```

### Option 3: Use Your Home Directory
```bash
# Create data directory in your home folder
mkdir ~/mongodb-data

# Start MongoDB pointing to it
mongod --dbpath ~/mongodb-data
```

## Complete Workflow

```bash
# 1. Navigate to your project directory
cd year2-2025-2026-project-files/expressJS/movies-with-mongo

# 2. Create local data directory
mkdir mongodb-data

# 3. Start MongoDB (keep this terminal open)
mongod --dbpath ./mongodb-data
```

You should see output like:
```
{"msg":"Waiting for connections","attr":{"port":27017}}
```

### Then in a NEW terminal:
```bash
# Navigate back to your project
cd year2-2025-2026-project-files/expressJS/movies-with-mongo

# Import your BSON files
mongorestore --db movies movies.bson
mongorestore --db movies moviesDetails.bson
mongorestore --db movies people.bson

# Connect and verify
mongosh
use movies
show collections
db.movies.findOne()
```

## Why This Happened

MongoDB needs a place to store data files. On macOS, it defaults to `/data/db`, but:
- This directory doesn't exist by default
- Creating it requires admin permissions
- It's often better to use a local project directory anyway

Using `--dbpath ./mongodb-data` tells MongoDB to store data in your project folder, which is:
- ✅ No admin rights needed
- ✅ Easy to clean up
- ✅ Project-specific data
- ✅ Works on any system

Try the custom data directory approach - it should work perfectly!