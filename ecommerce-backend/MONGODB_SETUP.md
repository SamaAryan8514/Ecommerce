# MongoDB Backend Setup

This backend is now configured to use MongoDB instead of SQLite.

## How to run
1. Install dependencies in the backend folder:
   ```bash
   cd d:\React-course\ecommerce-backend
   npm install
   ```

2. Start a local MongoDB server.
   - If you're using MongoDB Compass, make sure MongoDB is running on `mongodb://127.0.0.1:27017`.

3. Run the backend:
   ```bash
   npm start
   ```

4. Open MongoDB Compass and connect to:
   ```text
   mongodb://127.0.0.1:27017
   ```

5. The database name is `ecommerce-project`.
   - Collections created by the backend:
     - `products`
     - `deliveryoptions`
     - `cartitems`
     - `orders`

6. The backend automatically seeds default data when it starts and the `products` collection is empty.

## Custom URI
You can configure a custom MongoDB URI by setting:
```bash
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce-project
```

## Notes
- The frontend is still proxied to `http://localhost:3000` for `/api` calls.
- If you want to reset data, POST to `/api/reset`.
