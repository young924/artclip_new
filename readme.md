# Art Clip

art clip 2021

## Backend

- [ ] 카카오톡 로그인
- [ ] image model comments array에서 삭제
- [ ] image model like 변경
- [x] image 삭제하면 creator의 user 모델 image에서도 삭제
- [ ] 댓글 삭제 확인 팝업
- [ ] join checkbox
- [ ] upload checkbox
- [ ] 30일 사진을 업로드 안하면 계정 삭제 ->
  - [x] 1. 업로드 할때마다 UserSchema의 lastUpload 갱신
  - [x] 2. userRefresh.js에 일정 기간동안 업로드 안한 유저 목록 찾아내서 콘솔에 출력
  - [ ] 3. userRefresh.js에서 업로드 안한 유저 삭제
  - [ ] 4. userRefresh.js에 5분마다 이미지 삭제 4. 5분에서 30일로 변경

### bonus

- [ ] 팔로우 구현 수정 (api 사용)

## CSS

- [ ] header 수정
- [ ] 폰트
- [ ] default avatar 파일 보내주기

### Login

- [ ] Input box 그라데이션
- [ ] 가로 길이 줄이고 사진 넣기
- [ ] social Login 버튼 수정 (알아서 원하는대로)

### Join

- [ ] login과 같은 포맷으로

### userDetail

- [ ] 전반적 크게 수정 (좌우 여백 만들고)

### editProfile

- [ ] upload같이 수정
