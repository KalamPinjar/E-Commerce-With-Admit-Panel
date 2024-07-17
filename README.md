# E-Commerce Admin Panel Manager

## Features

  - Fully Automated Backend API Server: Supports your e-commerce website with comprehensive backend services.
  - Product Management: Add, edit, and delete products effortlessly.
  - Billboard Management: Manage promotional billboards with add, edit, and delete functionality.
  - Multi-Store Management: Seamlessly manage multiple e-commerce stores.
  - User-Friendly Interface: Designed for ease of use and efficiency.

## Installation

To install the necessary dependencies, run:

```

npm install
```

## Running Locally

   - Ensure the project is running on localhost:3000 by setting the environment variables accordingly.

   - Use the following command to start the development server:
     
```
    npm run dev
```

## Using in Production

   - Deploy the project to your desired hosting platform.
   - Update the environment variables with the respective URLs to connect to your e-commerce websites.

Deployment

   - Update Stripe Secret Key:
        Set your Stripe Secret Key in the environment variables file (.env).

```.env

STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Update Deployment URL:

   - Change the URL in the environment variables to match your deployed domain name.

```.env

    NEXT_PUBLIC_API_URL=https://your-deployed-domain.com
```
   - Stripe Dashboard Configuration:
        In the Stripe Dashboard, set your webhook endpoint to https://your-deployed-domain.com/api/webhook.
        Ensure to select the event checkout.session.completed for successful payment redirects.

## Environment Variables

Ensure the following environment variables are set correctly in your .env file:

```.env

DATABASE_URL=your_postgresql_database_url
DIRECT_URL=your_postgresql_direct_url
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000  # Update for production
FRONTEND_STORE_URL=http://localhost:3001  # Update for production
```

License

This project is licensed under the MIT License.
Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
Support

For any questions or support, please contact owaiskal57@gmail.com
