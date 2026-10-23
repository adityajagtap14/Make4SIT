import express from 'express';
import cors from 'cors';
import { generatePDF, generateDocumentPDF, closeBrowser } from './lib/pdfGenerator.js';


const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
}));

app.use(express.json({ limit: '5mb' }));

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// Health check for cloud deployment readiness probes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/generate-pdf', async (req, res) => {
  const data = req.body;

  // ---- Validation ----
  if (!data.studentName || !data.usn) {
    return res.status(400).json({
      error: 'Missing required fields: studentName and usn are mandatory.',
    });
  }

  console.log(`[PDF] Generating report for ${data.usn} — Dept: ${data.department || 'N/A'}`);
  const startTime = Date.now();

  try {
    const pdfBuffer = await generatePDF(data);

    const elapsed = Date.now() - startTime;
    console.log(`[PDF] Generated in ${elapsed}ms for ${data.usn}`);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Report_${data.usn}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('[PDF] Generation failed:', error);
    res.status(500).json({ error: 'PDF generation failed. Please try again.' });
  }
});

app.post('/api/generate-doc-pdf', async (req, res) => {
  const { html, title = 'SIT_Document' } = req.body;

  if (!html) {
    return res.status(400).json({ error: 'html content is required.' });
  }

  const startTime = Date.now();
  console.log(`[DOC-PDF] Generating PDF for "${title}"`);

  try {
    const pdfBuffer = await generateDocumentPDF(html, title);
    const elapsed = Date.now() - startTime;
    console.log(`[DOC-PDF] Generated in ${elapsed}ms for "${title}"`);

    const sanitizedTitle = title.replace(/[^a-zA-Z0-9_-]/g, '_');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedTitle}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('[DOC-PDF] Generation failed:', error);
    res.status(500).json({ error: 'Document PDF generation failed.' });
  }
});


// ---------------------------------------------------------------------------
// Server Start & Graceful Shutdown
// ---------------------------------------------------------------------------

const server = app.listen(PORT, () => {
  console.log(`✅ Make4SIT Backend running on http://localhost:${PORT}`);
});

const shutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  await closeBrowser();
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
