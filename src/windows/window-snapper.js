const isCloseTo = (a, b, snapThreshold) => {
  return Math.abs(a - b) <= snapThreshold
}

const snapLeftCheck = (windowBounds, screenBounds, snapThreshold) => {
  if (isCloseTo(windowBounds.x, screenBounds.x, snapThreshold)) {
    return {
      x: screenBounds.x,
      shouldSnap: true
    }
  }
  return {}
}

const snapRightCheck = (windowBounds, screenBounds, snapThreshold) => {
  const rightWindowEdge = windowBounds.x + windowBounds.width
  const rightScreenEdge = screenBounds.x + screenBounds.width
  if (isCloseTo(rightWindowEdge, rightScreenEdge, snapThreshold)) {
    return {
      x: rightScreenEdge - windowBounds.width,
      shouldSnap: true
    }
  }
  return {}
}

const snapTopCheck = (windowBounds, screenBounds, snapThreshold) => {
  if (isCloseTo(windowBounds.y, screenBounds.y, snapThreshold)) {
    return {
      y: screenBounds.y,
      shouldSnap: true
    }
  }
  return {}
}

const snapBottomCheck = (windowBounds, screenBounds, snapThreshold) => {
  const bottomWindowEdge = windowBounds.y + windowBounds.height
  const bottomScreenEdge = screenBounds.y + screenBounds.height
  if (isCloseTo(bottomWindowEdge, bottomScreenEdge, snapThreshold)) {
    return {
      y: bottomScreenEdge - windowBounds.height,
      shouldSnap: true
    }
  }
  return {}
}

module.exports = (windowBounds, screenBounds, snapThreshold) => {
  if (snapThreshold <= 0) {
    return { x: windowBounds.x, y: windowBounds.y, shouldSnap: false }
  }

  return {
    x: windowBounds.x,
    y: windowBounds.y,
    shouldSnap: false,
    ...snapLeftCheck(windowBounds, screenBounds, snapThreshold),
    ...snapRightCheck(windowBounds, screenBounds, snapThreshold),
    ...snapTopCheck(windowBounds, screenBounds, snapThreshold),
    ...snapBottomCheck(windowBounds, screenBounds, snapThreshold)
  }
}
