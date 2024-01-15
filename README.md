Weathio 
====================================

Welcome to my weather and location managing application! This app is targeted towards park rangers that need to quickly identify their location and current weather conditions, that need to be reported as they traverse through the national park.

[](https://github.com/Stskdrv/mp-wthr-test#features)
-------------------------------------------

Features
--------

-   **Current location**: View your current location.

-   **Search feature**: Get a detailed weather info and check location on a map.

-   **History**: Check your last searches.

--------------------------------------------------

Getting Started
---------------

Follow these simple steps to get started with our application:

1.  **Clone the Repository**: Clone this repository to your local machine.

    ```source-shell
    git clone
    ```

**Add .env file in app root directory**: Open app root folder and create new file called .env. Then you need to add and fill environment variables:

```source-shell
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=please add valid token
CLERK_SECRET_KEY=please add valid key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=please add valid url
NEXT_PUBLIC_CLERK_SIGN_UP_URL=please add valid url
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=please add valid url
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=please add valid url

MONGODB_URL=please add valid url
```

**Install Dependencies and Run the Application:**: Navigate to the project directory, install the required dependencies, and start the development server to run the application locally.

```source-shell
cd mp-wthr-test
npm install
npm run dev
```

**Access the Application:**: Open your web browser and access the application at

```source-shell
http://localhost:3000

```
[](https://github.com/Stskdrv/mp-wthr-test#license)
------------------------------------------

License
-------

This project is licensed under the license.