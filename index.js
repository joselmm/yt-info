//http://localhost:3000/download?url=https://www.youtube.com/watch?v=mtPKna0K0G8
const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const cors = require('cors');

app.use(cors());

const port = process.env.PORT || 3000;

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