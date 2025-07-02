import express from 'express';
import bodyParser from 'body-parser';

import { convertHtmlToPdf } from './utils/convert.js';

const app = express();

app.use(bodyParser.json());

app.get('/', (_, res) => {
  res.send('Welcome to the PDF Generator API');
});

app.get('/declaration', async (req, res) => {
  const document = await convertHtmlToPdf(req.body);

  res.setHeader('Content-Type', 'application/pdf');

  return res.send(document);
});

app.listen(3000, () => console.log('Templates api is running on port 3001'));
