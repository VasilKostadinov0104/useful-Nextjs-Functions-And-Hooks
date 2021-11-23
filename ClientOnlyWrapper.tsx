import { useEffect, useState } from 'react'

export default function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <div id="CLIENT_WRAPPER" {...delegated}>
      {children}
    </div>
  )
}
