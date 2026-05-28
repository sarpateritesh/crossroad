import { useState } from 'react'

function MediaWithFallback({
  type = 'image',
  src,
  fallbackSrc,
  alt,
  className = '',
  poster,
  autoPlay = true,
  muted = true,
  loop = true,
  ...props
}) {
  const [mediaSrc, setMediaSrc] = useState(src)
  const [failed, setFailed] = useState(false)

  const onError = () => {
    if (fallbackSrc && mediaSrc !== fallbackSrc) {
      setMediaSrc(fallbackSrc)
      return
    }
    setFailed(true)
  }

  if (type === 'video') {
    if (failed) {
      return (
        <div className={`media-fallback flex items-center justify-center ${className}`}>
          <p className="text-xs tracking-[0.2em] uppercase text-zinc-300">Cinematic media unavailable</p>
        </div>
      )
    }

    return (
      <video
        className={className}
        src={mediaSrc}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        poster={poster}
        onError={onError}
      />
    )
  }

  if (failed) {
    return (
      <div className={`media-fallback flex items-center justify-center ${className}`}>
        <p className="text-xs tracking-[0.2em] uppercase text-zinc-300">Image unavailable</p>
      </div>
    )
  }

  return <img src={mediaSrc} alt={alt} loading="lazy" className={className} onError={onError} {...props} />
}

export default MediaWithFallback
