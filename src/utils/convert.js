import Docxtemplater from 'docxtemplater';
import pizzip from 'pizzip';
import fs from 'fs/promises';
import libreoffice from 'libreoffice-convert';

export async function convertHtmlToPdf(data) {
  const content = await fs.readFile(
    './templates/declaration.docx',
  );

  const zip = new pizzip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render(data);

  return new Promise((resolve, reject) => {
    const output = doc.getZip().generate({ type: 'nodebuffer' });

    libreoffice.convert(output, '.pdf', undefined, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}
