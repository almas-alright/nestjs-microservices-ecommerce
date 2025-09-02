
# E-Commerce Microservices API (NestJS)

## Objective
This project is a **Microservices-based E-Commerce API** built using **NestJS**. It demonstrates how to build scalable and maintainable microservices with the following features:

- **Auth Service**: Manages user authentication, registration, and JWT-based authorization.
- **Product Service**: Handles CRUD operations for products, product categories, and brands.
- **User Service**: Manages user data for admin, shop owners, and sellers.

### Technologies Used:
- **NestJS**: A progressive Node.js framework for building efficient and scalable applications.
- **MongoDB**: NoSQL database used to store data for each service.
- **JWT**: Used for user authentication and authorization.
- **Docker**: For containerization and easier deployment.
- **RabbitMQ/Kafka**: For inter-service communication (future feature).

## Installation Instructions

### Prerequisites
- Node.js (>=14.x)
- npm or yarn
- MongoDB (for local development)

### 1. Clone the repository
```bash
git clone https://github.com/almas-alright/nestjs-microservices-ecommerce.git
cd nestjs-microservices-ecommerce
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Each `.env` file is specific to the service, like `auth.env`, `product.env`, and `user.env`. You can easily copy and rename the `.env` files using the `copy-env.sh` script. Make sure to configure these files by editing the respective environment variables (like database URLs, JWT secrets).

To do this, execute the following Bash script:

```bash
# Make sure the script is executable
chmod +x copy-env.sh

# Run the script to copy .env files to the root directory
./copy-env.sh
```

### 4. Configure Environment Variables
After running the `copy-env.sh` script, the `.env` files will be copied to the root directory. You should then open these `.env` files (like `auth.env`, `product.env`, `user.env`) and configure the necessary environment variables (e.g., database URLs, JWT secrets).

### 5. Run the Application
To run the services locally, use the following command:

```bash
npm run start:dev
```

### 6. Access the Services
Once the application is running, you can access the services at the following endpoints:

- Auth Service: `http://localhost:3001`
- Product Service: `http://localhost:3002`
- User Service: `http://localhost:3003`

### 7. Running in Docker (Optional)
To run the services using Docker, follow the Docker setup steps in the Dockerfile and docker-compose files.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.