## dictation-server
- `모두의받아쓰기`의 server

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
#### 외부 DB 사용  
- `DB_URL`을 환경변수로 추가하는 것으로 본인의 외부 DB를 사용할 수 있다.
- `process.env.DB_URL`을 통해 DB에 접속한다.
```bash
$ export DB_URL=your_url
```

#### production mode로 변경  
- 기본적으로 `NODE_ENV='development'`으로 되어있어 터미널에 사용자가 접속한 log가 뜨도록 되어있다.
- 이를 원치 않거나 배포를 위해 로그를 기록하지 않으려면 다음과 같이 하면 된다
```bash
$ export NODE_ENV='production'
```

### 관련 프로젝트
- [dictation_teacher](https://github.com/dohun94/dictation_teacher) : `모두의받아쓰기` 선생님용 앱
- [dictation_user](https://github.com/dohun94/dictation_user) : `모두의받아쓰기` 학생용 앱
- [dictation-retrofit](https://github.com/hmu332233/dictation-retrofit) : `모두의받아쓰기` 서버와 연동되는 retrofit api

### api 목록
[api list 보기(링크)](/doc/api_list.md)

### License

Licensed under [MIT License](LICENSE). © minung.han
