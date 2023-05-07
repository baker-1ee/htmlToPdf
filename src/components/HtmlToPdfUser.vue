<template>
  <div>
    <h1>HTML to PDF Converter</h1>
    <button @click="convertToPdf">Convert</button>
    <div ref="pdfContent">
      <sample-vue-component
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
import SampleVueComponent from './SampleVueComponent.vue';
import {HtmlToPdfDownloader} from "@/components/htmlToPdfDownloader";

export default {
  name: 'HtmlToPdfUser',
  components: {
    SampleVueComponent,
  },
  data() {
    return {
      items: [],
      targetRefs: [],
    };
  },
  created() {
    for (let i=0; i<120; i++) {
      this.items.push({id: i, title: `Sample Title ${i}`})
    }
  },
  methods: {
    addRef(index) {
      return (el) => {
        this.targetRefs[index] = el.$refs.targetTemplate;
      };
    },
    convertToPdf() {
      HtmlToPdfDownloader.htmlsToPdfByChunk('chunk.pdf', this.targetRefs, 100);
    },
  }
}
</script>
