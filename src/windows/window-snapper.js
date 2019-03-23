const getEdges = bounds => {
  return {
    top: bounds.y,
    bottom: bounds.y + bounds.height,
    left: bounds.x,
    right: bounds.x + bounds.width
  }
}

const isCloseTo = (a, b, snapThreshold) => {
  return Math.abs(a - b) <= snapThreshold
}

const snapLeftCheck = (windowBounds, windowEdges, screenEdges, snapThreshold) => {
  if (isCloseTo(windowEdges.left, screenEdges.left, snapThreshold)) {
    return {
      x: screenEdges.left,
      shouldSnap: true
    }
  }
  return {}
}

const snapRightCheck = (windowBounds, windowEdges, screenEdges, snapThreshold) => {
  if (isCloseTo(windowEdges.right, screenEdges.right, snapThreshold)) {
    return {
      x: screenEdges.right - windowBounds.width,
      shouldSnap: true
    }
  }
  return {}
}

const snapTopCheck = (windowBounds, windowEdges, screenEdges, snapThreshold) => {
  if (isCloseTo(windowEdges.top, screenEdges.top, snapThreshold)) {
    return {
      y: screenEdges.top,
      shouldSnap: true
    }
  }
  return {}
}

const snapBottomCheck = (windowBounds, windowEdges, screenEdges, snapThreshold) => {
  if (isCloseTo(windowEdges.bottom, screenEdges.bottom, snapThreshold)) {
    return {
      y: screenEdges.bottom - windowBounds.height,
      shouldSnap: true
    }
  }
  return {}
}

module.exports = (windowBounds, screenBounds, snapThreshold) => {
  if (snapThreshold <= 0) {
    return { x: windowBounds.x, y: windowBounds.y, shouldSnap: false }
  }

  const windowEdges = getEdges(windowBounds)
  const screenEdges = getEdges(screenBounds)

  return {
    x: windowBounds.x,
    y: windowBounds.y,
    shouldSnap: false,
    ...snapLeftCheck(windowBounds, windowEdges, screenEdges, snapThreshold),
    ...snapRightCheck(windowBounds, windowEdges, screenEdges, snapThreshold),
    ...snapTopCheck(windowBounds, windowEdges, screenEdges, snapThreshold),
    ...snapBottomCheck(windowBounds, windowEdges, screenEdges, snapThreshold)
  }
}
