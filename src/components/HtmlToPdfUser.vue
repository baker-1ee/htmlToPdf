<template>
  <div>
    <h1>Huge HTML array to PDF Converter</h1>
    <button @click="convertToPdf" :disabled="isInProgress">Convert</button>
    <div>
      <p>{{progressPercentage}}% complete</p>
      <progress :value="progressPercentage" max="100"></progress>
    </div>
    <br/>
    <div ref="pdfContent">
      <invoice-bill
          v-for="(item, index) in items"
          :key="item.id"
          :title="item.title"
          :ref="addRef(index)"
          v-show="false"
      />
    </div>
  </div>
</template>

<script>
import {HtmlToPdfDownloader} from "@/components/htmlToPdfDownloader";
import InvoiceBill from "@/components/InvoiceBill.vue";

export default {
  name: 'HtmlToPdfUser',
  components: {
    InvoiceBill,
  },
  data() {
    return {
      htmlToPdfDownloader: {},
      items: [],
      targetRefs: [],
      // 진행률
      isInProgress: false,
      progressPercentage: 0,
    };
  },
  created() {
    this.htmlToPdfDownloader = new HtmlToPdfDownloader('a4');
    // target html array 구성을 위한 binding data 초기 셋팅
    for (let i=0; i<100; i++) {
      this.items.push({id: i, title: `${i} 번째 `})
    }
  },
  methods: {
    addRef(index) {
      return (el) => {
        if (el?.$refs) {
          this.targetRefs[index] = el.$refs.targetTemplate;
        }
      };
    },
    // pdf 생성 버튼 클릭 event handler
    async convertToPdf() {
      this.progressPercentage = 1;
      this.isInProgress = true;

      await this.htmlToPdfDownloader.htmlsToPdfByChunk(
          this.targetRefs,
          'invoiceBill',
          30,
          (progress) => {this.progressPercentage = Math.floor(progress)}
      );

      this.isInProgress = false;
    },
  }
}
</script>
