import { NextResponse } from 'next/server';
import PDFParser from 'pdf2json';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", (err, data) => {
      console.error(err);
    });
    
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
        if (!pdfData.formImage || !pdfData.formImage.Pages) {
          console.error("Error: Unable to access PDF pages");
          return NextResponse.json({ error: "Error processing PDF" }, { status: 500 });
        }
      
        const text = pdfData.formImage?.Pages?.[0]?.Texts?.map(textObj => textObj.R[0]).join('');
        return NextResponse.json({ text });
      });

    pdfParser.parseBuffer(buffer);
  } catch (error) {
    console.error('Server-side error:', error);
    return NextResponse.json({ message: 'Error processing PDF', error: error.message }, { status: 500 });
  }
}
