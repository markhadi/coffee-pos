# Setup Project

1. Create Database named <your_database_name>
2. Create .env file

```
DATABASE_URL="mysql://<your_mysql_user>:<your_mysql_password>@<your_mysql_host>:<your_mysql_port>/<your_database_name>"
NODE_ENV=<development or production>
PORT=<yourport>
JWT_EXPIRES_IN=<your_setting,_example:_15m>
JWT_ACCESS_TOKEN_SECRET=<your_access_token_scret>
JWT_REFRESH_TOKEN_SECRET=<your_refresh_token_scret>
USER_CURSOR_SECRET=<your_cursor_secret>
CLIENT_DOMAIN=<your_client_domain,_example:_https://yourdomain.com>
```

3. write command

```shell
npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start
```
