// api/proxy.js
const fetch = require('node-fetch');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzZ_qE0xcv6Mw_73VT7zA6V6qnuxPnA420IVb0ANTt8cuIUoU6WyeJ9roZvLUpt-oyR/exec", {
      method: "POST",
      headers: {
        "Content-Type": req.headers['content-type'] || 'application/json',
      },
      body: req.body
    });

    const data = await response.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).send(data);

  } catch (err) {
    console.error("Error en proxy:", err);
    res.status(500).json({ error: "Error al reenviar la solicitud." });
  }
}
