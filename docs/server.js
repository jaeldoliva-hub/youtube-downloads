const express = require("express")
const ytDlp = require("yt-dlp-exec")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("downloads"))

app.post("/download", async (req, res) => {

  const { url, format, quality, playlist } = req.body

  const id = Date.now()

  let output = `downloads/${id}/%(title)s.%(ext)s`

  let options = {
    output: output
  }

  if (!playlist) {
    options.noPlaylist = true
  }

  if (format === "mp3") {

    options.extractAudio = true
    options.audioFormat = "mp3"

  } else {

    if (quality === "best") {
      options.format = "bestvideo+bestaudio"
    } else {
      options.format = `bestvideo[height<=${quality}]+bestaudio`
    }

  }

  try {

    await ytDlp(url, options)

    res.json({
      downloadUrl: `/`
    })

  } catch (err) {

    res.status(500).json({
      error: "Download failed"
    })

  }

})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})
