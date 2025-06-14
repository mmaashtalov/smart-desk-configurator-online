import React, { useState } from 'react'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ fallbackSrc = '/placeholder.svg', ...props }) => {
  const [src, setSrc] = useState(props.src)

  return (
    <img
      {...props}
      src={src}
      onError={() => setSrc(fallbackSrc)}
    />
  )
} 