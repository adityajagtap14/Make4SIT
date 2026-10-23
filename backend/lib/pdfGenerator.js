import puppeteer from 'puppeteer';
import { buildReportHTML } from './reportTemplate.js';

let browserInstance = null;

async function getBrowserInstance() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
  }
  return browserInstance;
}

export async function closeBrowser() {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
}

export async function generatePDF(data) {
  const browser = await getBrowserInstance();
  const page = await browser.newPage();
  
  try {
    const html = buildReportHTML(data);
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // The PDF screenshots show a footer: "Dept of CSE, SITK                      Page | X" with a thick top border.
    const dept = data.department || 'CSE';
    
    const footerTemplate = `
      <div style="width: 100%; font-size: 10pt; font-family: 'Times New Roman', serif; padding: 0 1in; display: flex; justify-content: space-between; align-items: center;">
        <div style="border-top: 3px solid #1e3a8a; width: 100%; display: flex; justify-content: space-between; padding-top: 5px;">
          <span>Dept of ${dept}, SITK</span>
          <span>Page | <span class="pageNumber"></span></span>
        </div>
      </div>
    `;

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1in',
        bottom: '1in',
        left: '0.5in',
        right: '0.5in',
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>', // We have our own headers in the HTML
      footerTemplate: footerTemplate,
    });

    return pdfBuffer;
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  } finally {
    await page.close(); // Only close the page, keep browser alive!
  }
}

export async function generateDocumentPDF(htmlContent, title = 'Document') {
  const browser = await getBrowserInstance();
  const page = await browser.newPage();

  try {
    const fullHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @page {
          size: A4;
          margin: 15mm 20mm;
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          color: #000;
          background: #fff;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .page-break {
          page-break-after: always;
        }
        .avoid-break {
          page-break-inside: avoid;
        }
      </style>
    </head>
    <body class="p-0 m-0">
      ${htmlContent}
    </body>
    </html>`;

    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '12mm',
        bottom: '12mm',
        left: '15mm',
        right: '15mm',
      },
    });

    return pdfBuffer;
  } catch (error) {
    console.error('Document PDF Generation Error:', error);
    throw error;
  } finally {
    await page.close();
  }
}

