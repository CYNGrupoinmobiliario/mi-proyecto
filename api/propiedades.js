const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  // Pega aquí tu token de EasyBroker (o mejor: usa una ENV var)
 const EASYBROKER_TOKEN = process.env.EASYBROKER_TOKEN;
  const authHeader = 'Basic ' + Buffer.from(EASYBROKER_TOKEN).toString('base64');

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  try {
    const response = await fetch('https://api.easybroker.com/v1/properties', {
      headers: { Authorization: authHeader },
    });
    const json = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(json.data);
  } catch (err) {
    console.error('❌ Error proxy EasyBroker:', err);
    return res.status(500).json({ error: 'No se pudo obtener propiedades' });
  }
};
