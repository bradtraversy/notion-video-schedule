const videosEl = document.querySelector('#videos')
const loadingEl = document.querySelector('#loading')
let loading = false

const getVideosFromBackend = async () => {
  loading = true
  const res = await fetch('http://localhost:5000/videos')
  const data = await res.json()
  loading = false
  return data
}

const addVideosToDom = async () => {
  const videos = await getVideosFromBackend()

  if (!loading) {
    loadingEl.innerHTML = ''
  }

  videos.forEach((video) => {
    const div = document.createElement('div')
    div.className = 'video'
    div.innerHTML = `
      <h3>${video.title}</h3>
      <ul>
        <li><strong>Release Date: </strong> ${video.date}</li>
        <li><strong>Description: </strong> ${video.description}</li>
      </ul>
      <div class="tags">${video.tags}</div>
    `
    videosEl.appendChild(div)
  })
}

addVideosToDom()
