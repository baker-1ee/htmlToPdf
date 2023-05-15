# html-to-pdf
html 배열을 pdf 로 변환하는 기능을 구현하였다.

특히, html이 여러건일 때, 안정적으로 pdf를 생성할 수 있는 방법에 대하여 고민하였다.

한번에 많은 page 의 pdf 를 생성하면, 성능 부하 문제로 인해 생성에 실패하기 때문에 Chunk size 를 사전에 설정하여
pdf 하나에 최대 page 갯수를 제한하여 분할 생성하도록 하였다.

또한, Chunk 단위의 pdf가 생성될때마다 진행률을 가시적으로 업데이트하여 사용자가 작업 진행 상태를 알 수 있도록 하였다.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Demo
아래와 같이 convert 버튼을 클릭하면, 사전에 설정한 chunk size 단위로 pdf 가 분할 생성 및 다운로드 된다.

진행률도 확인할 수 있으며, pdf 가 chunk size 단위로 생성 완료될 때마다 진행률이 업데이트 된다.

<img width="1443" alt="image" src="https://user-images.githubusercontent.com/67363545/236681871-9fe81ee0-0575-4189-9c97-8fb7babb4881.png">

## Result
생성 완료된 pdf 를 하나 열어보면 아래와 같이 여러 페이지로 chunk size 만큼 페이지가 생성되어있다.

<img width="1456" alt="image" src="https://user-images.githubusercontent.com/67363545/236682155-ae470150-239e-4c82-81d1-557e1884a03c.png">
