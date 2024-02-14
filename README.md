#  Huge HTML to PDF

## Concept

Huge HTML to PDF is a converter designed to print large volumes of materials from the web to PDF without causing browser memory leaks.

## Challenges with Standard Printing

Traditionally, invoking `window.print()` allows rendering HTML templates for printing through the browser's default print dialog. However, attempting to print over 500 pages can lead to memory leaks in the browser, resulting in crashes.

## Solution

To address this issue and enable printing of over 1,000 pages from the web, Huge HTML to PDF was developed. Instead of attempting to generate a large PDF in one go, the process is divided into manageable units to prevent performance issues and failures due to resource constraints.

## Key Features

- **Memory Leak Prevention**: By dividing the printing process into smaller units, the likelihood of browser memory leaks is significantly reduced.
- **Progress Visualization**: Users can monitor the progress of PDF generation, ensuring transparency and awareness of the ongoing task.

## How It Works

1. **Task Segmentation**: The printing process is divided into smaller units, each containing a maximum number of pages.
2. **Progress Tracking**: Users are provided with real-time updates on the progress of PDF generation.

## Benefits

- **Scalability**: Allows printing of large volumes of materials without compromising browser performance.
- **User-Friendly**: Provides clear progress indicators and error handling mechanisms for a smooth user experience.
- **Reliability**: Minimizes the risk of crashes and errors associated with printing large documents from the web.

With Huge HTML to PDF, printing massive amounts of content from the web to PDF is now achievable without the fear of browser crashes or performance issues.

## Project setup

```
npm install
```

## Compiles and hot-reloads for development

```
npm run serve
```

## Demo

Clicking the button below will trigger the generation and download of PDFs, divided into units based on the preset maximum page count per PDF.

You can track the progress of the current PDF generation in comparison to the total pages to be generated.

![Demo Image](https://github.com/baker-1ee/htmlToPdf/assets/67363545/5ca0e792-0dc4-42bb-9573-56c18064b06b)

## Result

The PDFs are generated and divided as shown below:

![Result Image](https://github.com/baker-1ee/htmlToPdf/assets/67363545/2f389acc-e871-4a12-b335-61283584e755)

Opening one of the files, you'll see pages generated up to the preset maximum page count per PDF:

![PDF Page Result Image](https://github.com/baker-1ee/htmlToPdf/assets/67363545/2f337699-569a-49ac-bb5f-316447bb4241)

