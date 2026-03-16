async function downloadVideo() {

  const url = document.getElementById("videoUrl").value
  const format = document.getElementById("format").value
  const quality = document.getElementById("quality").value
  const playlist = document.getElementById("playlist").checked
  const status = document.getElementById("status")

  if (!url) {
    status.innerText = "Paste a link first"
    return
  }

  status.innerText = "Processing..."

  const response = await fetch("/download", {

    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      url,
      format,
      quality,
      playlist
    })

  })

  const data = await response.json()

  if (data.downloadUrl) {
    window.location.href = data.downloadUrl
    status.innerText = "Download started"
  } else {
    status.innerText = "Download failed"
  }

}
