export const videoPlayerInit = () => {
  const videoPlayer = document.querySelector('.video-player')
  const videoButtonPlay = document.querySelector('.video-button__play')
  const videoProgress = document.querySelector('.video-progress')
  const videoButtonStop = document.querySelector('.video-button__stop')
  const videoTimePassed = document.querySelector('.video-time__passed')
  const videoTimeTotal = document.querySelector('.video-time__total')
  const videoVolume = document.querySelector('.video-volume')

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause')
      videoButtonPlay.classList.add('fa-play')
    } else {
      videoButtonPlay.classList.remove('fa-play')
      videoButtonPlay.classList.add('fa-pause')
    }
  }

  const togglePlay = () => {
    if (videoPlayer.paused) {
      toggleIcon()
      videoPlayer.play()
    } else {
      videoPlayer.pause()
    }

    toggleIcon()
  }

  const stopPlay = () => {
    videoPlayer.pause()
    videoPlayer.currentTime = 0
  }

  const addZero = n => n < 10 ? '0' + n : n

  videoPlayer.addEventListener('click', togglePlay)
  videoButtonPlay.addEventListener('click', togglePlay)

  videoTimePassed.addEventListener('play', toggleIcon)
  videoTimePassed.addEventListener('pause', toggleIcon)

  videoButtonStop.addEventListener('click', stopPlay)

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime
    const duration = videoPlayer.duration
    videoProgress.value = (currentTime / duration) * 100

    const minutePassed = Math.floor(currentTime / 60)
    const secondsPassed = Math.floor(currentTime % 60)

    const minuteTotal = Math.floor(duration / 60)
    const secondsTotal = Math.floor(duration % 60)

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`
  })

  videoProgress.addEventListener('change', () => {
    const duration = videoPlayer.duration
    const value = videoProgress.value

    videoPlayer.currentTime = (value * duration) / 100
  })

  videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100
  })
}
