<template>
  <div ref="targetTemplate" class="statement">
    <div class="statement-header">
      <img src="../assets/logo.png" width="80" height="100" alt="Logo" class="logo">
      <h1>{{title}} 거래명세서</h1>
      <p class="statement-date">거래일자: 2023년 5월 1일</p>
    </div>
    <div class="statement-body">
      <div class="statement-section">
        <h2>상품정보</h2>
        <table>
          <thead>
          <tr>
            <th>상품명</th>
            <th>단가</th>
            <th>수량</th>
            <th>금액</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>티셔츠</td>
            <td>20,000원</td>
            <td>3개</td>
            <td>60,000원</td>
          </tr>
          <tr>
            <td>청바지</td>
            <td>30,000원</td>
            <td>2개</td>
            <td>60,000원</td>
          </tr>
          <tr>
            <td>청바지</td>
            <td>30,000원</td>
            <td>2개</td>
            <td>60,000원</td>
          </tr>
          <tr>
            <td>청바지</td>
            <td>30,000원</td>
            <td>2개</td>
            <td>60,000원</td>
          </tr>
          <tr>
            <td>청바지</td>
            <td>30,000원</td>
            <td>2개</td>
            <td>60,000원</td>
          </tr>
          <tr>
            <td>청바지</td>
            <td>30,000원</td>
            <td>2개</td>
            <td>60,000원</td>
          </tr>
          <tr>
            <td>청바지</td>
            <td>30,000원</td>
            <td>2개</td>
            <td>60,000원</td>
          </tr>
          <tr>
            <td>청바지</td>
            <td>30,000원</td>
            <td>2개</td>
            <td>60,000원</td>
          </tr>
          <tr>
            <td>청바지</td>
            <td>30,000원</td>
            <td>2개</td>
            <td>60,000원</td>
          </tr>
          <tr>
            <td>청바지</td>
            <td>30,000원</td>
            <td>2개</td>
            <td>60,000원</td>
          </tr>
          <tr>
            <td>청바지</td>
            <td>30,000원</td>
            <td>2개</td>
            <td>60,000원</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="statement-section">
        <h2>결제 정보</h2>
        <p>결제금액: 120,000원</p>
        <p>결제방법: 신용카드</p>
        <p>카드번호: **** **** **** 1234</p>
      </div>
    </div>
    <div class="statement-footer">
      <p>문의: 02-123-4567</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceBill",
  props: {
    title: {
      type: String,
    },
  }
}
</script>

<style scoped>
.statement {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  max-width: 600px;
}
.logo {
  max-width: 150px;
}
.statement-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.statement-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  flex-grow: 1;
}
.statement-date {
  margin: 0;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th, td {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
th {
  background-color: #eee;
}
.statement-section {
  margin-bottom: 40px;
}
.statement-section h2 {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: bold;
}
.statement-footer {
  margin-top: 40px;
  text-align: center;
}
</style>