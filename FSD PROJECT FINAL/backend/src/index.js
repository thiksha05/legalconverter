const express = require('express');
const helmet = require('helmet');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb'); // Import MongoDB client

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const jargonDictionary = {
  // Your jargon dictionary...
  "Adjournment": "To suspend the case and postpone it until a future time or place.",
  "Alimony": "The legal obligation of a person to provide their spouse with financial support after a divorce or separation.",
  "Bench": "The seat of the judge, or the judiciary as a whole.",
  "Custody": "The care, control, and maintenance of a child or a person's property or the location of a prisoner.",
  "Decree": "The judicial decision of the court and judge.",
  "Deposition": "An out-of-court oral testimony of a witness used as written evidence.",
  "Exhibit": "A document or object shown to the court as evidence.",
  "Final Judgment": "The ultimate, final decision on the case.",
  "Grounds": "The reasons the case was brought into the court.",
  "Hearing": "A trial to determine if a person should be charged with a felony.",
  "Motion": "A request for a court decision based on legal arguments.",
  "Objection": "A lawyer's protest about the legality of a statement made in court.",
  "Overruled": "When a judge disagrees with a lawyer's objection.",
  "Order": "An official, written direction from a court or judge.",
  "Parole": "The release of a prisoner before the completion of a sentence based on good behavior.",
  "Party": "The person(s) involved in a proceeding.",
  "Plea Bargain": "A negotiation where the defendant agrees to plead guilty to a lesser charge.",
  "Pretrial": "A proceeding before the official trial to clarify facts and points of law.",
  "Rebuttal": "A statement or evidence used to counter the opponent's evidence.",
  "Rule/Ruling": "A declaration or order made by a judge.",
  "Statutes": "An enactment made by a legislature.",
  "Subpoena": "A request for a non-defendant to appear in court.",
  "Summons": "A court order requesting someone to appear in court.",
  "Sustained": "When a judge agrees with an objection.",
  "Withdrawn": "When a question or remark is retracted in court."
};

const convertToPlainLanguage = (text) => {
  let plainText = text;
  for (const [jargon, plain] of Object.entries(jargonDictionary)) {
    const regex = new RegExp(`\\b${jargon}\\b`, 'gi');
    plainText = plainText.replace(regex, plain);
  }
  return plainText;
};

// MongoDB connection URL
const url = 'mongodb+srv://thiksha05:thiksha123@cluster0.1pc1sah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Database Name
const dbName = 'Jargon';

// Function to insert data into MongoDB
const insertDataIntoDB = async (data) => {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB server
    await client.connect();

    const db = client.db(dbName);

    // Collection Name
    const collection = db.collection('pdf_texts');

    // Insert the data into the collection
    await collection.insertOne(data);

    console.log('Data inserted into MongoDB successfully');
  } catch (err) {
    console.error('Error inserting data into MongoDB:', err);
  } finally {
    // Close the client
    await client.close();
  }
};

app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    fs.unlinkSync(filePath);

    const plainText = convertToPlainLanguage(data.text);

    // Insert the converted text into MongoDB
    await insertDataIntoDB({ text: plainText });

    res.json({ text: plainText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the file.' });
  }
});
// Additional endpoint to fetch data from MongoDB
app.get('/texts', async (req, res) => {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB server
    await client.connect();

    const db = client.db(dbName);

    // Collection Name
    const collection = db.collection('pdf_texts');

    // Fetch all documents in the collection
    const texts = await collection.find().toArray();

    res.json(texts);
  } catch (err) {
    console.error('Error fetching data from MongoDB:', err);
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  } finally {
    // Close the client
    await client.close();
  }
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
