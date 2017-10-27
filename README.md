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

### 환경설정
- 외부 DB 사용  
  `process.env.DB_URL`을 통해 본인의 MongoDB를 사용할 수 있다.
```bash
$ export DB_URL=your_url
```

- production mode로 변경  
  기본적으로 `NODE_ENV='development'`으로 되어있어 터미널에 
  사용자가 접속한 log가 뜨도록 되어있다.
  이를 원치 않거나 배포를 위해 로그를 기록하지 않으려면 다음과 같이 하면 된다
```bash
$ export NODE_ENV='production'
```

### api 목록
[api list 보기(링크)](/doc/api_list.md)



### License

Licensed under [MIT License](LICENSE). © minung.han
