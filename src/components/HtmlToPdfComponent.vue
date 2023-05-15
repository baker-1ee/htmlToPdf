<template>
  <div class="container">
    <div>
      <h1 class="title">Huge HTML array to PDF Converter</h1>
      <!-- 변환 버튼 -->
      <button class="convert-button" @click="convertToPdf" :disabled="isInProgress">PDF 변환 및 다운로드</button>
      
      <!-- 진행률 컴포넌트 -->
      <div class="progress-wrapper">
        <el-progress :percentage="percentage" :format="format" type="circle"></el-progress>
      </div>
      <br/>

      <!-- 안내 메시지 -->
      <div class="message-box">
        <div class="message-content">
          동일한 양식의 HTML 페이지에 원하는 만큼 데이터 바인딩 후 PDF 생성이 가능합니다.<br>
          PDF 로 변환할 HTML 의 복잡도에 따라 다르겠지만, 1000 page 의 PDF 생성도 거뜬히 합니다.<br>
          다만, 1개의 PDF 파일의 최대 page 수 변수를 조절해가면서 최적의 성능을 찾아보셔야 합니다.<br>
          기본은 최대 page 수를 {{this.pdfMaxPageCount}} 으로 설정해두었습니다.<br>
          {{this.pdfMaxPageCount}} 장이 넘어가면 pdf 를 분리해서 다운로드합니다.<br>
        </div>
      </div>

      <!-- PDF 로 변환할 대상 컴포넌트 -->
      <invoice-bill
          v-for="(item, index) in items"
          :key="item.id"
          :item="item"
          :ref="`invoiceBillRef${index}`"
          v-show="false"
      />

    </div>
  </div>
</template>

<script>
import {HtmlToPdfConverter} from "@/components/htmlToPdfConverter";
import InvoiceBill from "@/components/InvoiceBill.vue";

export default {
  name: 'HtmlToPdfUser',
  components: {
    InvoiceBill,
  },
  data() {
    return {
      // 전체 데이터 배열
      totalItems: [],

      // pdf 1개 파일의 최대 페이지 수 
      pdfMaxPageCount: 100,

      // HTML 동적 렌더링을 위한 대상 배열 
      items: [],

      // el-progress 관련 변수
      isInProgress: false,
      completedCount: 0,
    };
  },
  computed: {
    percentage() {
      return (this.completedCount / this.totalItems.length) * 100;
    },
    
  },
  created() {
    // 전체 데이터 셋팅
    for (let i=0; i<1000; i++) {
      this.totalItems.push({title: `${i}번째 인보이스 `})
    }
  },
  methods: {
    
    /** pdf 생성 버튼 클릭 event handler */
    async convertToPdf() {
      // 시작
      this.isInProgress = true;
      this.completedCount = 0;
      // html to pdf converter 생성
      const htmlToPdfConverter = new HtmlToPdfConverter('a4', 'portrait');
      // DOM Memory leak 방지를 위해 전체 데이터 배열을 pdfMaxPageCount 단위로 slicing
      const slicedItems = [];
      for (let i = 0; i < this.totalItems.length; i += this.pdfMaxPageCount) {
        slicedItems.push(this.totalItems.slice(i, i + this.pdfMaxPageCount));
      }
      
      for (let i= 0; i < this.totalItems.length / this.pdfMaxPageCount; i++) {
        // 동적 렌더링
        this.items = slicedItems[i];
        await this.$nextTick(); // 렌더링 완료될 때까지 대기하기 위함

        // pdf 변환할 대상 html element array 가져오기 
        const htmlElements = Object.keys(this.$refs).filter((key) => key.startsWith('invoiceBillRef')).map((key)=>this.$refs[key][0].$refs.pdfArea)

        // pdf 변환 후 다운로드
        await htmlToPdfConverter.htmlsToPdf(htmlElements, `인보이스${i === 0 ? '' : i}`, () => {this.completedCount++});
      }
      // 끝
      this.isInProgress = false;
    },
    // 진행률 표시 포맷
    format() {
      return `${this.completedCount} / ${this.totalItems.length}`;
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #17171b;
}

.convert-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.convert-button:hover {
  background-color: #45a049;
}

.progress-wrapper {
  margin-top: 20px;
}

.message-box {
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 4px;
  margin-top: 20px;
}

.message-content {
  font-size: 16px;
  color: #333;
  text-align: left;
  line-height: 2;
}
</style>
