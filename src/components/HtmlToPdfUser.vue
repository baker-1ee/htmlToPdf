<template>
  <div>
    <h1>Huge HTML array to PDF Converter</h1>
    <button @click="convertToPdf" :disabled="isInProgress">Convert</button>
    <div ref="pdfContent">
      <sample-vue-component
          v-for="(item, index) in items"
          :key="item.id"
          :title="item.title"
          :ref="addRef(index)"
          v-show="false"
      />
    </div>
    <div>
      <p>{{progressPercentage}}% complete</p>
      <progress :value="progressPercentage" max="100"></progress>
    </div>
  </div>
</template>

<script>
import SampleVueComponent from './SampleVueComponent.vue';
import {HtmlToPdfDownloader} from "@/components/htmlToPdfDownloader";

export default {
  name: 'HtmlToPdfUser',
  components: {
    SampleVueComponent,
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
      this.items.push({id: i, title: `Sample Title ${i}`})
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
          'result',
          10,
          (progress) => {this.progressPercentage = Math.floor(progress)}
      );

      this.isInProgress = false;
    },
  }
}
</script>
