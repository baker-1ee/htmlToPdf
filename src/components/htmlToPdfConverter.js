import html2pdf from 'html2pdf.js';

export class HtmlToPdfConverter {

    defaultOption = ''; // pdf 생성을 위한 option

    /**
     * HTML To PDF 를 위한 생성자
     * @param pdfFormat pdf 포맷 (e.g. 'a3', 'a4', ...)
     * @param pdfOrientation pdf 방향 (e.g. 'portrait' : 세로, 'landscape' : 가로)
     */
    constructor(pdfFormat, pdfOrientation) {
        this.defaultOption = {
            margin: 0,
            // filename: out.pdf,
            image: {type: 'jpg', quality: 0.98},
            html2canvas: {
                useCORS: true,
                allowTaint: true,
                scrollX: 0,
                scrollY: 0,
                scale: 1,
                dpi: 300,
                letterRendering: true,
                logging: false,
                ignoreElements: function (element) {
                    if (element.id === 'pdf-ignore-area') {
                        return true;
                    }
                },
            },
            jsPDF: {orientation: pdfOrientation, unit: 'mm', format: pdfFormat, compressPDF: true},
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
    async htmlsToPdf(elements, filename, callback) {
        const opt = {...this.defaultOption, filename: `${filename}.pdf`};
        let pdf = null;
        for (let i = 0; i < elements.length; i++) {
            // html 이 화면에 보이지 않는 상태로 pdf 생성하면, 빈 페이지로 생성되기 때문에 html 복사 후 style 만 변경 한 뒤 pdf 생성
            const clone = elements[i].cloneNode(true);
            clone.style.display = "block";
            if (pdf == null) {
                // pdf 첫 페이지
                pdf = html2pdf().set(opt).from(clone).toPdf();
                callback();
            } else {
                // pdf 두번째 페이지부터는 기존 pdf 에 이어붙임
                pdf = pdf.get('pdf')
                    .then((pdf) => {
                        pdf.addPage();
                        callback();
                    })
                    .from(clone)
                    .toContainer()
                    .toCanvas()
                    .toPdf();
            }
            // 메모리 누수를 방지하기 위해
            elements[i].remove();
            clone.remove();
        }
        return pdf.save().then(() => {
            pdf = null;
            console.log(`${filename} 생성 완료`);
        });
    }
}