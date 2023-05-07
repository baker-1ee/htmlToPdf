import html2pdf from 'html2pdf.js';

export class HtmlToPdfDownloader {

    defaultOption = ''; // pdf 생성을 위한 option

    /**
     * HTML To PDF 를 위한 생성자
     * @param filename 생성할 pdf 파일명 (e.g. output)
     * @param paperFormat 종이 포맷 (e.g. 'a4', 'a3', ...)
     */
    constructor(paperFormat) {
        this.defaultOption = {
            margin: 0,
            // filename: filename,
            image: {type: 'jpg', quality: 1},
            html2canvas: {
                useCORS: true,
                scrollY: 0,
                scale: 2,
                dpi: 300,
                letterRendering: true,
                allowTraint: false,
                ignoreElements: function (element) {
                    if (element.id === 'pdf-ignore-area') {
                        return true;
                    }
                },
            },
            jspdf: {orientation: 'landscape', unit: 'mm', format: paperFormat, compressPDF: true},
        };
    }

    /**
     * html element 단건을 pdf 로 생성하여 다운로드
     * @param element html element
     * @param filename pdf 파일명
     * @returns {Promise<*>}
     */
    async htmlToPdf(element, filename) {
        const opt = {...this.defaultOption, filename : `${filename}.pdf`};
        return html2pdf().set(opt).from(element).save();
    }

    /**
     * html element 배열을 여러 페이지의 pdf 로 생성하여 다운로드
     * @param elements html element array
     * @param filename pdf 파일명
     * @returns {Promise<*>}
     */
    async htmlsToPdf(elements, filename) {
        const opt = {...this.defaultOption, filename: `${filename}.pdf`};
        let pdf = null;
        for (let i = 0; i < elements.length; i++) {
            // html 이 화면에 보이지 않는 상태로 pdf 생성하면, 빈 페이지로 생성되기 때문에 html 복사 후 style 만 변경 한 뒤 pdf 생성
            const clone = elements[i].cloneNode(true);
            clone.style.display = "block";
            if (pdf == null) {
                // pdf 첫 페이지
                pdf = html2pdf().set(opt).from(clone).toPdf();
            } else {
                // pdf 두번째 페이지부터는 기존 pdf 에 이어붙임
                pdf = pdf.get('pdf')
                    .then((pdf) => pdf.addPage())
                    .from(clone).toContainer().toCanvas().toPdf();
            }
            // 메모리 누수를 방지하기 위해 복사한 clone element 는 제거
            clone.remove();
        }
        return pdf.save().then(() => {
            console.log(`${filename} 생성 완료`);
        });
    }

    /**
     * chunk Size 단위로 html element 배열을 N건의 pdf 로 생성하여 다운로드
     * 한번에 대량의 page 를 하나의 pdf 파일로 생성하면 성능 문제로 pdf 생성이 되지 않는 현상을 해결하기 위해 chunk 단위로 pdf 를 분리하여 생성
     * pdf 파일명은 뒤에 인덱스가 추가되어 생성됨
     * @param elements html element array
     * @param filename pdf 파일명
     * @param chunkSize pdf 파일당 최대 page 제한
     * @returns {Promise<void>}
     */
    async htmlsToPdfByChunk(elements, filename, chunkSize) {
        const start = performance.now();
        // elements 배열을 chunkSize 만큼 잘라서 분할된 배열 생성
        const chunks = [];
        for (let i = 0; i < elements.length; i += chunkSize) {
            const chunk = elements.slice(i, i + chunkSize);
            chunks.push(chunk);
        }

        // 분할된 배열에 대해서 htmlsToPdf 함수 호출
        const pdfPromises = chunks.map(async (chunk, index) => {
            await this.htmlsToPdf(chunk, `${filename}${index}`);
        });

        await Promise.all(pdfPromises);

        const end = performance.now();
        console.log(`htmlsToPdfByChunk 수행 시간: ${end - start}ms`);
    }

}