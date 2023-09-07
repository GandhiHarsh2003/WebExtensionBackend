const express = require('express');
const fetch = require('node-fetch');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); 

// Handle the document extraction logic
app.post('/extract-document', async (req, res) => {
  const selectedFile = req.body.selectedFile;
  const data = new FormData();
  data.append("file", selectedFile);
  data.append("filename", selectedFile.name);
  data.append("page", "1");

  const options = {
    method: "POST",
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "docwire-doctotext.p.rapidapi.com",
    },
    body: data,
  };

  try {
    const response = await fetch("https://docwire-doctotext.p.rapidapi.com/extract_text", options);
    const result = await response.text();
    res.json({ result }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
