# The Perfect Gift

## Description
A digital gift shop where users can sign up to the app (according to different permission levels) and mark favorite products, create products, delete and edit products and perform searches according to different filters.
The project is written in node.js (server side) and react (user side).

## Order of project installation operations

1. Clone the project from Git.

### Server Side


2. Type the following code in the terminal to get to the server folder of the app.

```
cd app-server
```


3. Type the following code in the terminal to install all the required libraries for the project.

```
npm i
```

4. Create a cloned file to the .env.example file only without the .example extension, with the help of this file you can create a connection to a local (mongoDB) database by inserting values ​​for the parameters in the .env file you created.

5. For the development process, write the following code in the terminal:

```
npm run dev
```

### Front Side

6. Open another terminal with the 'split terminal' button.

7. Type the following code in the terminal to get to the front folder of the app.

```
cd app-front
```

8. Type the following code in the terminal to install all the required libraries for the project.

```
npm i
```

9. For the development process, write the following code in the terminal:

```
npm run start
```

## Usage & Functionality

#### Unregistered user
##### A user who enters the site but has not yet registered
- Can see the about page
- Can see the existing products on the site
- Can change the view of the products (to the table) by clicking the change display button
- Can use the various filters to see specific products
- Can register on the site

__________________________________________

#### Registered user (non-business)
##### A user who enters the site and registers but not as a business user (do not click the check box)
- Can see the about page
- Can see the existing products on the site
- Can change the view of the products (to the table) by clicking the change display button
- Can use the various filters to see specific products
- Can mark favorite products and display them only by clicking the Show Favorites button
- Can view a single product by clicking on the view link
__________________________________________________________________

#### Registered user (business)
A user who enters the site and registers as a business user (click on the check box)
- Can see the about page
- Can see the existing products on the site
- Can change the view of the products (to the table) by clicking the change display button
- Can use the various filters to see specific products
- Can mark favorite products and display them only by clicking the Show Favorites button
- Can view a single product by clicking on the view link
- Can create products by clicking the Create Product link
- Can edit a product by clicking the edit link
- Can delete a product by clicking the delete link
_______________________________________________________________________

### Filters
#### By name
 The search field in default is according to the product name, you can write both uppercase and lowercase letters and the site will search if the letter or pair of letters (or more) exists in one or more of the products and these are the products that will be displayed on the main page.
 _______________________________________________________________________
#### By description (after clicking the advanced button)
The search field according to the product description opens after clicking on the advanced button, there is no difference between uppercase and lowercase letters and the system will search for products whose description contain the letter or pair of letters (or more) that you entered in the field and these are the products that will be displayed on the main page.
__________________________________________________________________________
#### By price (after clicking the advanced button)
The search field by price is opened after clicking on the advanced button, when you select the filter by price, 3 selection options will open in the left field according to different price ranges, each selection in a certain range will display on the top page only the products that are in the selected range.
____________________________________________________________
#### By favorites
Marking the favorite products will be possible after marking (check box) a product (or more) as a favorite and will be displayed by clicking on the show favorites button, the display is performed on a Bootstrap model, another click on the check box of the same product will remove it from the favorites list and it will no longer be displayed.


## Libraries

### Libraries used by the project and their uses:
#### Server side

1. "nodemon": for a development process
1. "bcrypt": to encrypt passwords
1. "chalk": Paints messages in the console
1. "config": configuration
1. "cors": cors policy
1. "dotenv": environment variables
1. "express": requests for routes
1. "joi": validation
1. "jsonwebtoken": manage web token
1. "lodash": Built-in functions that shorten the code
1. "mongoose": Interfacing and running against mongoDB
1. "morgan": logging response messages 
_____________________________________________
#### Front side
1. @testing-library/jest-dom (Version: ^5.17.0): Provides custom Jest matchers for asserting on DOM elements. Enhances the testing of React components.
1. @testing-library/react (Version: ^13.4.0): Testing utilities for React, facilitating the testing of React components in a user-friendly way.
1. @testing-library/user-event (Version: ^13.5.0): Provides utilities for simulating user events like clicks and typing in testing scenarios.
1. axios (Version: ^1.6.2): A promise-based HTTP client for making requests to external APIs or your server, simplifying AJAX requests.
1. bootstrap (Version: ^5.3.2): A popular CSS framework for building responsive and visually appealing user interfaces.
1. bootstrap-icons (Version: ^1.11.2): Provides a collection of free, high-quality SVG icons that can be easily integrated into your Bootstrap-based UI.
1. formik (Version: ^2.4.5): A library for building forms in React, simplifying form validation, handling, and submission.
1. joi (Version: ^17.11.0): A schema validation library for JavaScript. Useful for defining and validating the structure of objects.
1. jwt-decode (Version: ^4.0.0): Decodes JSON Web Tokens (JWT), commonly used for authentication, enabling you to inspect the token's payload.
1. react (Version: ^18.2.0): The core React library for building user interfaces using a component-based architecture.
1. react-bootstrap (Version: ^2.9.2): Integrates Bootstrap styles and components into your React application, providing reusable UI elements.
1. react-dom (Version: ^18.2.0): Handles the integration of React with the DOM, rendering React components to the browser.
1. react-router-dom (Version: ^6.20.1): Enables declarative routing in React applications, allowing for navigation and managing the UI state based on the URL.
1. react-scripts (Version: 5.0.1): Provides scripts and configurations for building and running a React application. Includes development and production builds.
1. react-toastify (Version: ^9.1.3): A notification library for React applications, making it easy to display informative messages to users.
1. web-vitals (Version: ^2.1.4): Provides metrics and tools for measuring and monitoring the performance of a web page.


 










<!-- # Users and Business Cards API

A server-side project who was written in Node.js, that manages requests (and errors) of creating users with different permission levels, the users can create business cards with several characteristics, each user according to his permission level.

## Order of project installation operations

1. Clone the project from Git.
1. Type the following code in the terminal to install all the required libraries for the project.

```
npm i
```

3. Create a cloned file to the .env.example file only without the .example extension, with the help of this file you can create a connection to a local (mongoDB) or global (mongoDB Atlas) database by inserting values ​​for the parameters in the .env file you created.

4. For the development process, write the following code in the terminal:

```
npm run dev
```

5. For the development process, write the following code in the terminal: -->

<!-- ```
npm run start
```

## Initial data

There is an option to seed initial information to the project, the operation empties the database (if there is anything in it) and creates 3 users according to different permission levels (normal, business, manager) and three business cards that will be associated with the user who has business permission but not administrative permission.
To perform this operation, write the following code in the terminal:

```
npm run seed-initialData
```

# Usage

## Models

Fixing the data model that the database expects to receive in order to create an object, if a mistake is made in inserting the data, an error will be given to the user by the 'mongoose' library that communicates with the database.

### User Model

```
{
  name: {
    first: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    middle: {
      type: String,
      minlength: 0,
      maxlength: 255,
      default: "",
    },
    last: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    _id: {
      type: mongoose.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  email: {
33    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  image: {
    url: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      minlength: 11,
      maxlength: 1024,
    },
    alt: {
      type: String,
      minlength: 6,
      maxlength: 255,
      default: "User Image",
    },
    _id: {
      type: mongoose.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
  },
  address: {
    state: {
      type: String,
      minlength: 0,
      maxlength: 255,
      default: "",
    },
    country: {
      type: String,
      minlength: 6,
      maxlength: 255,
      required: true,
    },
    city: {
      type: String,
      minlength: 6,
      maxlength: 255,
      required: true,
    },
    street: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true,
    },
    houseNumber: {
      type: String,
      minlength: 1,
      maxlength: 10,
      required: true,
    },
    zip: {
      type: String,
      minlength: 0,
      maxlength: 12,
      default: "",
    },
    _id: {
      type: mongoose.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
  },
  isBusiness: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
```

### Card Model

```
{
  title: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  subtitle: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  description: {
    type: String,
    minlength: 6,
    maxlength: 1024,
    required: true,
  },
  phone: {
    type: String,
    minlength: 9,
    maxlength: 10,
    required: true,
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 255,
    required: true,
  },
  web: {
    type: String,
    minlength: 11,
    maxlength: 1024,
    required: true,
  },
  image: {
    url: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      minlength: 11,
      maxlength: 1024,
    },
    alt: {
      type: String,
      minlength: 6,
      maxlength: 255,
      default: "Card Image",
    },
    _id: {
      type: mongoose.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
  },
  address: {
    state: {
      type: String,
      minlength: 0,
      maxlength: 255,
      default: "",
    },
    country: {
      type: String,
      minlength: 6,
      maxlength: 255,
      required: true,
    },
    city: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true,
    },
    street: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true,
    },
    houseNumber: {
      type: String,
      minlength: 1,
      maxlength: 10,
      required: true,
    },
    zip: {
      type: String,
      minlength: 0,
      maxlength: 12,
      default: "",
    },
    _id: {
      type: mongoose.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
  },
  bizNumber: {
    type: String,
    minlength: 3,
    maxlength: 999_999_999,
    required: true,
    unique: true,
  },
  likes: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}
```

## Routes

### User routes

| No. | URL          | Method | Authorization                | Action                     | Notice       | Return          |
| --- | ------------ | ------ | ---------------------------- | -------------------------- | ------------ | --------------- |
| 1.  | /users       | POST   | all                          | Register a user            | Unique email | User            |
| 2.  | /users/login | POST   | all                          | login                      |              | Encrypted token |
| 3.  | /users       | GET    | admin                        | Get all users              |              | Array of users  |
| 4.  | /users/id    | GET    | The registered user or admin | Get user                   |              | User            |
| 5.  | /users/id    | PUT    | The registered user          | Edit user                  |              | User            |
| 6.  | /users/id    | PATCH  | The registered user          | Change 'isBusiness' status |              | User            |
| 7.  | /users/id    | DELETE | The registered user or admin | Delete user                |              | Deleted user    |

The minimum details (The rest of the details are filled in automatically by the database or are not mandatory) that need to be transferred in order to register or edit a user:

```
{
    "name":{
        "first":"Israel",
        "last": "Israeli"
    },
    "phone":"0505555555",
    "email": "israel@israeli.com",
    "password": "Aa123456",
    "isBusiness": true,
    "address": {
        "state": "",
        "country":"Israel",
        "city":"Tel-Aviv",
        "street":"Rothschild",
        "houseNumber":"10"
    }
}
```

### Card routes

| No. | URL                       | Method | Authorization                          | Action           | Notice                                                                                                                        | Return         |
| --- | ------------------------- | ------ | -------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------- |
| 1.  | /cards                    | GET    | all                                    | All cards        |                                                                                                                               | Cards          |
| 2.  | /cards/my-cards           | GET    | The registered user                    | Get user cards   |                                                                                                                               | Array of cards |
| 3.  | /cards/id                 | GET    | all                                    | Get card         |                                                                                                                               | Card           |
| 4.  | /cards                    | POST   | Business user                          | Create new card  |                                                                                                                               | Card           |
| 5.  | /cards/id                 | PUT    | The user who created the card          | Edit card        |                                                                                                                               | Card           |
| 6.  | /cards/id                 | PATCH  | The registered user                    | Like card        |                                                                                                                               | Card           |
| 7.  | /cards/id                 | DELETE | The user who created the card or admin | Delete card      |                                                                                                                               | Deleted card   |
| 8.  | /cards/changeBizNumber/id | PATCH  | Admin                                  | Change bizNumber | You can write any number you want (as long as it is not occupied by another card) or it will generate a random number for you | Card           |

The minimum details (The rest of the details are filled in automatically by the database or are not mandatory) that need to be transferred in order to create or edit a card:

```
{
    "title": "card title",
    "subtitle": "card subtitle",
    "description": "card description",
    "phone":"0509999999",
    "email": "card@biz.com",
    "web": "BizCards_Web",
    "address": {
        "state": "",
        "country":"Israel",
        "city":"Tel-Aviv",
        "street":"Ben Gurion Avenue",
        "houseNumber":"13"
    }
}
```

## Libraries

#### Libraries used by the project and their uses:

1. "nodemon": for a development process
1. "bcrypt": to encrypt passwords
1. "chalk": Paints messages in the console
1. "config": configuration
1. "cors": cors policy
1. "dotenv": environment variables
1. "express": requests for routes
1. "joi": validation
1. "jsonwebtoken": manage web token
1. "lodash": Built-in functions that shorten the code
1. "mongoose": Interfacing and running against mongoDB
1. "morgan": logging response messages -->
