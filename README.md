# html-to-pdf
html 배열을 pdf 로 변환하는 기능을 구현하였다.

특히, html이 여러건일 때, 안정적으로 pdf를 생성할 수 있는 방법에 대하여 고민하였다.

한번에 많은 page 의 pdf 를 생성하면, 성능 부하 문제로 인해 생성에 실패하기 때문에 작업 단위를 사전에 설정하여
pdf 하나에 최대 page 갯수를 제한하여 분할 생성하도록 하였다.

또한, pdf 가 생성될때마다 진행률을 가시적으로 업데이트하여 사용자가 작업 진행 상태를 알 수 있도록 하였다.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Demo
아래와 같이 버튼을 클릭하면, 사전에 설정한 pdf max page 단위로 pdf 가 분할 생성 및 다운로드 된다.

전체 생성 page 대비 현재 생성 page 를 진행률로 확인할 수 있다.

<img width="1441" alt="image" src="https://github.com/baker-1ee/htmlToPdf/assets/67363545/5ca0e792-0dc4-42bb-9573-56c18064b06b">


## Result

아래와 같이 분할 생성되었다.

<img width="712" alt="image" src="https://github.com/baker-1ee/htmlToPdf/assets/67363545/2f389acc-e871-4a12-b335-61283584e755">



파일 하나를 열어보면 아래와 같이 사전에 설정한 pdf max page 만큼 page 가 생성되었다.

<img width="1243" alt="image" src="https://github.com/baker-1ee/htmlToPdf/assets/67363545/2f337699-569a-49ac-bb5f-316447bb4241">
