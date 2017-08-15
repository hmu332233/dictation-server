
### API 목록

#### auth
| ROUTE  | METHOD  | DESCRIPTION |
|---|---|---|
| /auth/login  | POST | 사용자 로그인 |

```
요청
"name": "홍길동",
"school": "한국초등학교",
"student_id": 123456
"type": "teacher" 또는 "student"
```
```
응답
- 성공
{
  "result": "success",
  "type": "teacher" 또는 "student"
  "user": {
    //해당 객체 정보 (하단 참조)
  }
}
- 실패
{
  "result": "fail",
  "type": "teacher" 또는 "student"
  "user": {}
}
```

#### teacher

| ROUTE  | METHOD  | DESCRIPTION |
|---|---|---|
| /teachers  |  GET | teacher 전체 정보 |
| /teachers/:id  |  GET | teacher 한명 정보 |
| /teachers  |  POST | teacher 생성 |
| /teachers/:id  |  PUT | teacher 수정 |
| /teachers/:id  |  DELETE | teacher 삭제 |
```
요청
"school": "한국초등학교",
"class_name": "6-7",
"name": "홍길동",
"email": "test@test.com",
"password": "123456",
```
```
응답
{
  "_id": "5986f90de1a62e01e76fdf2f",
  "school": "한국초등학교",
  "class_name": "6-7",
  "name": "홍길동",
  "email": "test@test.com",
  "password": "123456",
  "students": [
    "5986f9427848e702168e7fc9",
    "5986f9427848e702168e7fc0"
  ]
}
```

#### student

| ROUTE  | METHOD  | DESCRIPTION |
|---|---|---|
| /students/:id  |  GET | student 한명 정보 |
| /students  |  POST | student 추가 |
| /students/:id  |  PUT | student 수정 |
| /teachers/:teacher_id/students  |  GET | teacher의 student 전체 정보 |
| /teachers/:teacher_id/students  |  POST | teacher의 student 추가 - 전체 정보로 |
| /teachers/:teacher_id/students/:student_id | POST | teacher의 student 추가 - 학생 id 값으로 |
| /teachers/:teacher_id/students/student_id  |  DELETE | teacher의 student 삭제 |
```
요청
"school": "한국초등학교",
"level": "1",
"class_name": "7",
"student_id": 1,
"name": "홍길동",
```
```
응답
{
  "_id": "5986f9427848e702168e7fc9",
  "school": "한국초등학교",
  "level": 1,
  "class_name": "6-7",
  "student_id": 1,
  "name": "홍길동",
  "grade": [
    "5986f9427848e702168e7fc9",
    "5986f9427848e702168e7fc0"
  ]
 }
```

#### quiz

| ROUTE  | METHOD  | DESCRIPTION |
|---|---|---|
| /quizzes |  GET | quizzes 전체 정보 |
| /quizzes/:id  |  GET | quizzes 한 개 정보 |
| /quizzes  |  POST | quizzes 추가 |
| /quizzes/:id  | PUT | quizzes 수정 |
| /quizzes/:id |  DELETE | quizzes 삭제 |
```
{
  "quiz_number": 1,
  "questions": [
    {
      "question_number": 1,
      "answer":"첫번째"
    },
    {
      "question_number": 2,
      "answer":"두번째"
    }
  ]
}
```

#### school

| ROUTE  | METHOD  | DESCRIPTION |
|---|---|---|
| /schools |  GET | schools 전체 정보 |
| /schools/:id  |  GET | schools 한 개 정보 |
```
{
  "region1": "서울특별시",
  "region2": "서초구",
  "name": "서울교육대학교부설초등학교",
  "address": "서울특별시 서초구 서초동",
  "_id": "598b4797d9472101a5d4291c",
}
```