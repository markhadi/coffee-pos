# Setup Project

1. Create Database named coffee_server
2. Create .env file

```
DATABASE_URL="mysql://root:@localhost:3306/coffee_server"
```

3. write command

```shell
npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start
```
