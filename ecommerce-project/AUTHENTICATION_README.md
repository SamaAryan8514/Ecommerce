# Authentication System Documentation

## Overview
A complete authentication system has been integrated into your ecommerce project with login, registration, and user profile management.

## Files Created/Modified

### New Files Created:
1. **src/context/AuthContext.jsx** - Authentication context provider with login/register logic
2. **src/pages/Auth/AuthPage.jsx** - Login and Registration page component
3. **src/pages/Auth/AuthPage.css** - Styling for authentication page
4. **src/components/ProtectedRoute.jsx** - Protected route wrapper for authenticated routes

### Modified Files:
1. **src/main.jsx** - Added AuthProvider wrapper
2. **src/App.jsx** - Added auth route and protected routes
3. **src/components/Header.jsx** - Added user profile button and logout functionality
4. **src/components/header.css** - Added styles for user menu and auth link

## Features

### Authentication Features:
- ✅ User Registration with email validation
- ✅ User Login with email/password
- ✅ Password validation (min 6 characters)
- ✅ Persistent login using localStorage
- ✅ Auto-logout on app refresh recovery
- ✅ Error handling and validation

### User Interface:
- ✅ Beautiful login/register page with gradient background
- ✅ Toggle between Login and Register modes
- ✅ User profile avatar in header
- ✅ Dropdown user menu with logout
- ✅ Protected routes (Checkout, Orders, Tracking)
- ✅ Responsive design

## How to Use

### 1. Access Authentication Page
Navigate to `http://localhost:5173/auth` or click "Sign In" button in the header

### 2. Register New Account
- Click "Sign Up" on the login page
- Fill in First Name, Last Name, Email, Password, and Confirm Password
- Click "Create Account"
- You'll be auto-logged in and redirected to home page

### 3. Login with Existing Account
- Enter your email and password
- Click "Sign In"
- You'll be redirected to home page

### 4. View User Profile
- Click the avatar with initials in the header (top right)
- See your name and email in the dropdown menu
- Click "Logout" to sign out

### 5. Protected Routes
The following routes are now protected and require authentication:
- `/checkout` - Shopping checkout
- `/orders` - Order history
- `/tracking/:orderId/:productId` - Order tracking

If you try to access these without logging in, you'll be redirected to the auth page.

## Data Storage

### Current Implementation:
- Uses **localStorage** for data persistence
- User data stored in `users` array in localStorage
- Current logged-in user stored in `user` item in localStorage

### For Production:
To use a real backend API, modify `src/context/AuthContext.jsx`:
- Replace localStorage operations with API calls to your backend
- Update the `login` and `register` functions to use axios
- Example:
  ```javascript
  const response = await axios.post('/api/auth/login', { email, password });
  setUser(response.data.user);
  localStorage.setItem('token', response.data.token);
  ```

## Testing

### Test Accounts (Pre-registered):
After creating your first account, you can use it to test login/logout functionality.

### Sample Test Flow:
1. Navigate to `/auth`
2. Register: 
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: password123
3. You'll be logged in automatically
4. Click avatar in header to see profile
5. Click Logout to sign out
6. Try logging back in with the same credentials

## Customization

### Modify Email Validation:
Edit the `validateEmail` function in `src/pages/Auth/AuthPage.jsx`

### Change Password Requirements:
Modify the password validation in the `handleSubmit` function

### Customize Colors:
- Auth page colors: Edit `src/pages/Auth/AuthPage.css`
- Header user menu: Edit `src/components/header.css`

### Add More User Fields:
1. Update the form in `AuthPage.jsx`
2. Update the registration logic in `AuthContext.jsx`
3. Update localStorage structure

## Troubleshooting

### Issue: "Protected route not working"
- Make sure AuthProvider is wrapped around your app (check `main.jsx`)
- Check browser console for errors

### Issue: "User data not persisting"
- Check localStorage in browser DevTools
- Clear localStorage and try registering again

### Issue: "Auth page styling looks wrong"
- Make sure all CSS files are imported correctly
- Check for CSS conflicts with existing styles

## Security Notes

⚠️ **Current Implementation Notes:**
- Uses localStorage (not secure for sensitive data)
- Passwords stored in plain text in localStorage (for demo only)
- No server-side validation or authentication tokens

### For Production, Implement:
- Server-side authentication with JWT tokens
- Secure password hashing (bcrypt)
- HTTPS only communication
- Secure token storage (httpOnly cookies)
- Rate limiting on login attempts
- Session management
- CSRF protection

## Support

If you encounter any issues, check:
1. Browser console for error messages
2. Network tab for API calls (if using backend)
3. localStorage contents in DevTools
