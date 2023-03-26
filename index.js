//http://localhost:3000/download?url=https://www.youtube.com/watch?v=mtPKna0K0G8
const express = require('express');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const app = express();
const cors = require('cors');

app.use(cors());

const port = process.env.PORT || 3000;

app.get('/buscarVideo/:keywords', async (req, res) => {
  const keywords = decodeURIComponent(req.params.keywords);

  try {
	const firstResultBatch = await ytsr(keywords, { suggestAutoComplete:true,pages: 1 });
	res.json(firstResultBatch)

  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/sugerenciasBusqueda/:consulta', async (req, res) => {
  const consulta = decodeURIComponent(req.params.consulta);

  try {
    // Obtener sugerencias de búsqueda de YouTube
    const resultados = await ytsr(consulta, { suggestAutoComplete: true });
    
    // Devolver las sugerencias de búsqueda en formato JSON
    res.json(resultados.suggestions);

  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/getInfoFromVideo', async (req, res) => {
  const videoUrl = decodeURIComponent(req.query.videoId);

  try {
    // Descargar información del video y formatos disponibles
    const info = await ytdl.getInfo(videoUrl);

    res.json(info);

  } catch (error) {
    res.status(500).send(error.message);
  }

});







app.listen(port, () => {
  console.log('Server is listening on port' + port);
});

