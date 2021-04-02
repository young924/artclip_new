# Art Clip

art clip 2021

## Backend

- [x] 카카오톡 로그인
  - [x] 페이스북 로그인
  - [x] 네이버 로그인
  - [ ] 카카오톡, 네이버 API key 주기적으로 변경되는 이슈 해결
- [x] image model comments array에서 삭제
- [ ] image model like 변경
- [x] image 삭제하면 creator의 user 모델 image에서도 삭제
- [ ] 댓글 삭제 확인 팝업
- [x] join checkbox
- [x] upload checkbox
- [x] 30일 사진을 업로드 안하면 계정 삭제 ->
  - [x] 1. 업로드 할때마다 UserSchema의 lastUpload 갱신
  - [x] 2. userRefresh.js에 일정 기간동안 업로드 안한 유저 목록 찾아내서 콘솔에 출력
  - [x] 3. userRefresh.js에서 1분마다 3분 이상 업로드 안한 유저 삭제
  - [x] 4. userRefresh.js에 1분마다 3분 이상 업로드 안한 유저의 이미지 삭제
  - [x] 5. userRefresh.js에 1분마다 3분 이상 업로드 안한 유저의 댓글 삭제
  - [x] 6. 이미지 삭제 동의한 경우에만 삭제하는 것으로 변경
  - [x] 7. 1, 3분에서 1일, 30일로 변경
- [ ] 알람
- [ ] 메세지
- [x] 카카오톡 프로필 사진 안뜨는 현상 해결

### bonus

- [ ] 팔로우 구현 수정 (api 사용)

## CSS

- [x] header 수정
- [ ] 폰트
- [x] default avatar 파일 보내주기

### Login

- [x] Input box 그라데이션
- [x] 가로 길이 줄이고 사진 넣기
- [x] social Login 버튼 수정 (알아서 원하는대로)

### Join

- [x] login과 같은 포맷으로

### userDetail

- [ ] 전반적 크게 수정 (좌우 여백 만들고)

### editProfile

- [ ] upload같이 수정
