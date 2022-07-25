# The BlingList

The Blinglist is an online ecommerce web application used to buy jewellery. This web application entirely built using JavaScript and is deployed on heroku.

---
## Authors of the whole Project
---
- Dhairya Analbhai Doctor
- Aayushi Gandhi
- Suchitra Dhamu
- Aditya Satendra Dixit
- Guryash Singh Dhall
- Parvish Vijay Gajjar

---
## Application Details
---
### Application features list along with their task
1. User management
   - User Registration
   - User Login
   - Forget Password
   - View Profile
   - Edit Profile
  
2. Blog
   - Add a blog
   - View all blogs
   - View blogs of the logged user
  
3. User Dashboard
   - Show products based on user search.
   - Show recently arrived products.
   - Show most popular products (Products bought by most of the customers).
   - Show products with most reviews.

4. Admin Interface
   - Add products
   - Delete products
   - Edit products

5. Search, Sort, Filter, and View Products
   - View product details
   - Searching and Filtering API

6. Add to favorites
   - Add products to favorites
   - Remove products from favorites
   - View logged in user favorites list
  
7. Find a store
   - Display store info including timings
   - Search item on location page
  
8. Manage orders
   - View previous orders
   - Filter previous orders
   - Reorder same orders
  
9.  Add to cart
    - Adding product to cart
    - Increase or Decrease number of items in the cart
    - Remove items from the cart
  
10. Reviews
    - Add a review
    - View all reviews given to the products
  
11. Checkout
    - Stripe payment integration
    - View all products that are to be bought
    - Calculate amount to be paid (Apply promocode discount, taxes, shipping cost)
  
12. Get a Gift Card
    - Select gift card from the list of gift card
    - Collect user basic information
    - Collect amount to be added to the gift card
    - Stripe payment integration

---
## Prerequisites
---
Following are the things we need to install for developing application using MERN stack.

1. Node JS
2. Javascript
3. React
4. Mongo Compass
5. NPX Plugin

---
## Technoglogy Used:
---
### Frontend Technology Used:
1. [Node](https://nodejs.org/en/)
2. [React](https://reactjs.org/) - Library for building user interfaces
3. [MUI](https://mui.com/) - For Styling Components
4. [Stripe](https://stripe.com/docs) - For Payment Integration

### Backend Technology Used:
1. NodeJS
2. ExpressJS

### Database Used:
1. MongoDB

### Deployment Platform
1. Heroku

---
## How to install?
---

1. First you need to clone the project using follwoing command

```bash
git clone https://git.cs.dal.ca/doctor/theblinglist.git
```
2. Navigate to **theblinglist** folder
```bash
cd theblinglist
```

3. Navigate to client folder, install dependencies, and start the application
```bash
cd client
npm install
npm run dev
```

4. Navigate back to server folder, install dependencies and start the sever
```bash
cd server
npm install
npm start
```

5. Now your application will be running.
6. Open [http://localhost:3000/](http://localhost:3000/) in your browser.

# References

[1] "React – A JavaScript library for building user interfaces", _Reactjs.org_, 2022. [Online]. Available: https://reactjs.org/. [Accessed: 01-July- 2022]

[2] "Continuous Delivery | Heroku Dev Center", _Devcenter.heroku.com_, 2022. [Online]. Available: https://devcenter.heroku.com/categories/continuous-delivery. [Accessed: 02- July- 2022]

[3] "MUI: The React component library you always wanted", V5-0-6.mui.com, 2022. [Online]. Available: https://v5-0-6.mui.com/. [Accessed: 03- July- 2022].

[4] "Stripe Checkout", Stripe.com, 2022. [Online]. Available: https://stripe.com/docs/payments/checkout. [Accessed: 04- Jul- 2022].
