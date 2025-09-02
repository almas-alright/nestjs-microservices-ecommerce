
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

### 3. Configure Environment Variables
Copy the `example.env.auth`, `example.env.product`, and `example.env.user` files from the `src/config/env/` folder and rename them (excluding the `example` prefix). Then place them in the root directory:

```bash
# Example command for Ubuntu/macOS
for file in src/config/env/*; do
  if [[ ! $(basename "$file") =~ ^example\. ]]; then
    cp "$file" ./"$(basename "$file")"
  fi
done
```

### 4. Set up the environment variables
Each `.env` file is specific to the service, like `auth.env`, `product.env`, and `user.env`. Make sure to configure these files by editing the respective environment variables (like database URLs, JWT secrets).

### 5. Run the Application
To run the services locally, use the following command:

```bash
npm run start:dev
```

### 6. Access the Services
- Auth Service: `http://localhost:3001`
- Product Service: `http://localhost:3002`
- User Service: `http://localhost:3003`

### 7. Running in Docker (Optional)
To run the services using Docker, follow the Docker setup steps in the Dockerfile and docker-compose files.

## PowerShell Script for Windows Users
If you're using Windows and want to copy `.env` files from `src/config/env/` to the root directory, you can use the following PowerShell script:

```powershell
# PowerShell script to copy .env files from src/config/env/ to root and rename them
$sourceDir = "src/config/env/"
$destinationDir = "."

# Get all .env files in the source directory (excluding "example.*")
Get-ChildItem -Path $sourceDir -Filter "*.env" | Where-Object { $_.Name -notmatch "^example\." } | ForEach-Object {
    $destPath = Join-Path -Path $destinationDir -ChildPath $_.Name
    Copy-Item -Path $_.FullName -Destination $destPath
}
```

### 8. Running `copy-env-files.sh` (For Ubuntu/macOS users)
To copy `.env` files from `src/config/env/` to the root directory and rename them, execute the following Bash script:

```bash
# Make sure the script is executable
chmod +x copy-env-files.sh

# Run the script
./copy-env-files.sh
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.