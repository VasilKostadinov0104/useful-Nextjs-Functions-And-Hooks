import { useWindowSize } from './useWindowSize'
const mobileWidth = 640

export default function DesktopOnlyWrapper({
  children,
  customWidth = mobileWidth,
}) {
  const size = useWindowSize()

  if (size.width <= customWidth) {
    return null
  }
  return children
}
