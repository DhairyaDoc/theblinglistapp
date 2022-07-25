# The BlingList

The Blinglist is an online ecommerce web application used to buy jewellery. This web application entirely built using JavaScript and is deployed on heroku.

---
## Authors of the whole Project
---
- [Dhairya Analbhai Doctor - B00864868](dh973257@dal.ca) - (Maintainer)
- [Aayushi Gandhi - B00890697](ay753882@dal.ca) - (Maintainer)
- [Suchitra Dhamu - B00897187](sc632007@dal.ca) - (Maintainer)
- [Aditya Satendra Dixit - B00874076](ad433393@dal.ca) - (Maintainer)
- [Guryash Singh Dhall - B00910690](gr622265@dal.ca) - (Maintainer)
- [Parvish Vijay Gajjar - B00912090](pr222321@dal.ca)- (Maintainer)

---
## Application Details
---

### BlingList Git Repository Link
- [BlingList Git Repository](https://git.cs.dal.ca/doctor/theblinglist)

### BlingList Frontend Deployment URL
- [BlingList FrontEnd URL](http://theblinglist.herokuapp.com/)

### Blinglist Backend Deployment URL
- [BlingList Backend URL](https://theblinglist-backend.herokuapp.com/)

### Application features list along with their task
1. User management **(Guryash Singh Dhall - B00910690)**
   - User Registration
   - User Login
   - Forget Password
   - View Profile
   - Edit Profile
  
2. Blog **(Guryash Singh Dhall - B00910690)**
   - Add a blog
   - View all blogs
   - View blogs of the logged user
  
3. User Dashboard **(Aayushi Gandhi - B00890697)**
   - Show products based on user search.
   - Show recently arrived products.
   - Show most popular products (Products bought by most of the customers).
   - Show products with most reviews.

4. Admin Interface **(Aayushi Gandhi - B00890697)**
   - Add products
   - Delete products
   - Edit products

5. Search, Sort, Filter, and View Products **(Parvish Vijay Gajjar - B00912090)**
   - View product details
   - Searching and Filtering API

6. Add to favorites **(Parvish Vijay Gajjar - B00912090)**
   - Add products to favorites
   - Remove products from favorites
   - View logged in user favorites list
  
7. Find a store **(Suchitra Dhamu - B00897187)**
   - Display store info including timings
   - Search item on location page
  
8. Manage orders **(Suchitra Dhamu - B00897187)**
   - View previous orders
   - Filter previous orders
   - Reorder same orders
  
9.  Add to cart **(Aditya Satendra Dixit - B00874076)**
    - Adding product to cart
    - Increase or Decrease number of items in the cart
    - Remove items from the cart
  
10. Reviews **(Aditya Satendra Dixit - B00874076)**
    - Add a review
    - View all reviews given to the products
  
11. Checkout **(Dhairya Doctor - B00864868)**
    - Stripe payment integration
    - View all products that are to be bought
    - Calculate amount to be paid (Apply promocode discount, taxes, shipping cost)
  
12. Get a Gift Card **(Dhairya Doctor - B00864868)**
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
