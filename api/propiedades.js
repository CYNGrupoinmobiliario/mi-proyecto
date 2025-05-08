import fetch from 'node-fetch';

export default async function handler(req, res) {
  const EASYBROKER_TOKEN = 'TU_EASYBROKER_ACCESS_TOKEN';
  const authHeader = 'Basic ' + Buffer.from(EASYBROKER_TOKEN).toString('base64');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  try {
    const respuesta = await fetch('https://api.easybroker.com/v1/properties', {
      headers: { Authorization: authHeader },
    });
    const json = await respuesta.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(json.data);
  } catch (error) {
    console.error('❌ Error proxy EasyBroker:', error);
    res.status(500).json({ error: 'No se pudo obtener propiedades' });
  }
}
