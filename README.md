## dictation-server
- `우리학교받아쓰기`의 server

### 설치
- **nodejs**
```bash
$ apt-get install curl
$ curl -sL https://deb.nodesource.com/setup_6.x | bash -
$ apt-get install -y nodejs
```

- **mongoDB**
```bash
$ apt-get install mongodb
$ mkdir -p /data/db
```

### 실행
- **MongoDB 실행**
```bash
$ mongod
```
- **nodejs 실행**
```bash
$ npm install
$ npm start 또는 node app.js
```