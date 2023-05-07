import html2pdf from 'html2pdf.js';

export class HtmlToPdfDownloader {

    static htmlToPdf(filename, element) {

        const opt = {
            includeHiddenHtml: true,
            margin: 0,
            filename: filename,
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
            jspdf: {orientation: 'landscape', unit: 'mm', format: 'a3', compressPDF: true},
        };

        html2pdf().set(opt).from(element).save();
    }


    static async htmlsToPdf(filename, elements) {
        const opt = {
            margin: 0,
            filename: filename,
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
            jspdf: {orientation: 'landscape', unit: 'mm', format: 'a4', compressPDF: true},
        };
        const clone = elements[0].cloneNode(true);
        clone.style.display = "block";
        let pdf = html2pdf().set(opt).from(clone).toPdf();
        clone.remove();
        for (let i = 1; i < elements.length; i++) {
            const clone = elements[i].cloneNode(true);
            clone.style.display = "block";
            pdf = pdf
                .get('pdf')
                .then((pdf) => {
                    pdf.addPage();
                })
                .from(clone)
                .toContainer()
                .toCanvas()
                .toPdf();
            clone.remove();
        }
        return pdf.save().then(() => {
            console.log(`${filename} 생성 완료`);
        });
    }

    static async htmlsToPdfByChunk(filename, elements, chunkSize) {
        const start = performance.now();

        // elements 배열을 chunkSize 만큼 잘라서 분할된 배열 생성
        const chunks = [];
        for (let i = 0; i < elements.length; i += chunkSize) {
            const chunk = elements.slice(i, i + chunkSize);
            chunks.push(chunk);
        }

        // 분할된 배열에 대해서 htmlsToPdf 함수 호출
        const pdfPromises = chunks.map(async (chunk, index) => {
            const filenameWithIndex = filename.replace(/\.pdf$/, '') + index + '.pdf';
            await this.htmlsToPdf(filenameWithIndex, chunk);
        });
        await Promise.all(pdfPromises);

        const end = performance.now();
        console.log(`htmlsToPdfByChunk 수행 시간: ${end - start}ms`);
    }

}