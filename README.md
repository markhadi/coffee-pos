# Setup Project

1. Create Database named <your_database_name>
2. Create .env file

```
DATABASE_URL="mysql://<your_mysql_user>:<your_mysql_password>@<your_mysql_host>:<your_mysql_port>/<your_database_name>"
```

3. write command

```shell
npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start
```
