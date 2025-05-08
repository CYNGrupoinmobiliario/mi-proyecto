const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Habilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const EASYBROKER_TOKEN = process.env.EASYBROKER_TOKEN;
    const authHeader = 'Basic ' + Buffer.from(EASYBROKER_TOKEN).toString('base64');
    const respuesta = await fetch('https://api.easybroker.com/v1/properties', {
      headers: { Authorization: authHeader },
    });
    const json = await respuesta.json();
    // Aquí aseguramos devolver el array completo:
    return res.status(200).json(json.data);
  } catch (error) {
    console.error('❌ Error proxy EasyBroker:', error);
    return res.status(500).json({ error: error.message });
  }
};

