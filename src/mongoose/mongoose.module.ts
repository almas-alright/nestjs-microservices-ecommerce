import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // MongoDB connection for User Service
    MongooseModule.forRoot('mongodb://localhost:27017/nest-ms-ec-users', {
      connectionName: 'usersDb', // Connection for User DB
    }),

    // MongoDB connection for Product Service
    MongooseModule.forRoot('mongodb://localhost:27017/nest-ms-ec-products', {
      connectionName: 'productsDb',  // Connection for Product DB
    }),

    // Add more MongoDB connections as needed for other services
  ],
})
export class MongooseConnectionModule {}
