<template>
  <div>
    <h1>HTML to PDF Converter</h1>
    <button @click="convertToPdf">Convert</button>
    <div ref="pdfContent">
      <sample-vue-component
          v-for="(item, index) in items"
          :key="item.id"
          :title="item.title"
          v-show="true"
          :ref="addRef(index)"
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
      items: [
        { id: 1, title: 'Sample Title 1' },
        { id: 2, title: 'Sample Title 2' },
        { id: 3, title: 'Sample Title 3' },
      ],
      targetRefs: [],
    };
  },
  methods: {
    addRef(index) {
      return (el) => {
        this.targetRefs[index] = el.$refs.targetTemplate;
      };
    },
    convertToPdf() {
      console.log(this.targetRefs);
      HtmlToPdfDownloader.htmlsToPdf('test.pdf', this.targetRefs);
    },
  }
}
</script>
