# Getting started

## Installation

Clone the repository

    git clone git@github.com:Vlad0395/TestShop.git

Switch to the repo folder

    cd TestShop

Install all the dependencies using composer

    composer install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate

Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate
    
Run the database seed to fill your database

    php artisan db:seed
    
Start the local development server

    php artisan serve

You can now access the server at http://localhost:8000

#### Front-End

In root of project

    npm install
    npm run dev
    
For access to test task: http://localhost:8000/cart
    
