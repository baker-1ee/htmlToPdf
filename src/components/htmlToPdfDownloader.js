import html2pdf from 'html2pdf.js';


export class HtmlToPdfDownloader {

    static htmlToPdf(filename, element) {
        console.log(filename);
        console.log(element);

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
            jspdf: {orientation: 'landscape', unit: 'mm', format: 'a3', compressPDF: true},
        };

        html2pdf().set(opt).from(element).save();
    }


    static htmlsToPdf(filename, elements) {
        console.log(filename);
        console.log(elements);

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
        let pdf = html2pdf().set(opt).from(elements[0]).toPdf();
        for (let i = 1; i < elements.length; i++) {
            pdf = pdf
                .get('pdf')
                .then((pdf) => {
                    pdf.addPage();
                })
                .from(elements[i])
                .toContainer()
                .toCanvas()
                .toPdf();
        }
        pdf.save();
    }
}