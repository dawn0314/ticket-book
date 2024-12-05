# Web Ticket Book

![TicketBook](./public/logo.png)

공연 티켓을 수집하고 정리할 수 있는 웹 기반 티켓북입니다.

티켓 정보를 관리하고 셋리스트를 추가하며, 공연에 대한 기억을 간직할 수 있습니다.

## 페이지 구성

|                                                                                                                         |                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Home**                                                                                                                | **Ticket List**                                                                                                         |
| <img src="https://github.com/user-attachments/assets/0809e1ac-0154-4bd5-b9e5-b25abd712844" width="400px">               | <img src="https://github.com/dawn0314/ticket-book/assets/135945770/c5c0aceb-2595-44c4-82e5-cdaffa4f75bd" width="400px"> |
| **Create Ticket**                                                                                                       | **Ticket Detail**                                                                                                       |
| <img src="https://github.com/dawn0314/ticket-book/assets/135945770/b905648b-6965-4aeb-9c4e-e92425ab84f7" width="400px"> | <img src="https://github.com/dawn0314/ticket-book/assets/135945770/56e0f824-1e94-4b32-b5aa-1cc8a5edce7c" width="400px"> |

## Skill Stacks

- <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
- <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black">
- <img src="https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&logoColor=61DAFB">
- <img src="https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34">
- <img src="https://img.shields.io/badge/material ui-007FFF?style=for-the-badge&logo=mui&logoColor=black">
- <img src="https://img.shields.io/badge/spotify-1DB954?style=for-the-badge&logo=spotify&logoColor=black">

## 시작하기

### Demo

https://ticket-book-5e5fd.web.app/

### local installation

```
$ git clone https://github.com/dawn0314/ticket-book.git
$ cd ticket-book
$ npm install
$ npm run dev
```

http://localhost:3000 에서 실행됩니다.

## 주요 기능

### 가입 및 로그인

- 이메일 회원가입 또는 Google 계정을 사용한 간편 로그인

### 티켓 추가

- 사진 업로드 및 메인 사진 선택 기능
- 공연 정보(날짜, 장소 등) 입력
- Spotift API를 통해 아티스트를 검색하여 공연의 셋리스트 추가 기능
- 개인 리뷰 작성

### 티켓 보기

- Firebase에 저장된 티켓 정보를 불러와 볼 수 있음
- 티켓 클릭 시 티켓의 상세 정보 페이지로 이동
- 필요 시 티켓 삭제 가능
