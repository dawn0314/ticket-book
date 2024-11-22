# Web Ticket Book

![TicketBook](./public/logo.png)

공연 티켓을 수집하고 정리할 수 있는 티켓북을 웹으로 구현한 프로젝트 입니다.

## 페이지 구성
|             |             |
| ----------- | ----------- | 
| **Home**    | **Ticket List** |                                                                                         
| <img src="https://github.com/user-attachments/assets/0809e1ac-0154-4bd5-b9e5-b25abd712844" width="400px"> | <img src="https://github.com/dawn0314/ticket-book/assets/135945770/c5c0aceb-2595-44c4-82e5-cdaffa4f75bd" width="400px"> |
| **Create Ticket** | **Ticket Detail** | 
| <img src="https://github.com/dawn0314/ticket-book/assets/135945770/b905648b-6965-4aeb-9c4e-e92425ab84f7" width="400px"> | <img src="https://github.com/dawn0314/ticket-book/assets/135945770/56e0f824-1e94-4b32-b5aa-1cc8a5edce7c" width="400px"> |

## Skill Stacks

- <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
- <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black">
- <img src="https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&logoColor=61DAFB">
- <img src="https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34">
- <img src="https://img.shields.io/badge/material ui-007FFF?style=for-the-badge&logo=mui&logoColor=black">
- <img src="https://img.shields.io/badge/spotify-1DB954?style=for-the-badge&logo=spotify&logoColor=black">

## 시작하기

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

- 회원가입 또는 구글 로그인으로 사이트 가입

### 티켓 추가

- 사진을 첨부하고 메인 사진을 선택 가능
- 공연에 대한 정보 입력 가능
- 노래를 검색하여 공연 셋리스트 추가 가능
- 리뷰 쓰기

### 티켓 보기

- 티켓 데이터는 firebase에 저장되어 기록됨
- 티켓 클릭하여 디테일 볼 수 있음
- 티켓 삭제 가
