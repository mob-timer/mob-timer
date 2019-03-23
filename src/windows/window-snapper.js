const snapCheck = (windowBounds, screenBounds, snapThreshold) => {
  if (snapThreshold <= 0) {
    throw new Error('Not supported, not supposed to call window-snapper if threshold <= 0!')
  }

  const noSnap = { ...windowBounds, shouldSnap: false }
  const isWithinThreshold = setupThresholdCheck(snapThreshold)

  return {
    ...noSnap,
    ...snapLeftCheck(windowBounds, screenBounds, isWithinThreshold),
    ...snapRightCheck(windowBounds, screenBounds, isWithinThreshold),
    ...snapTopCheck(windowBounds, screenBounds, isWithinThreshold),
    ...snapBottomCheck(windowBounds, screenBounds, isWithinThreshold)
  }
}

const setupThresholdCheck = snapThreshold => (a, b) => {
  return Math.abs(a - b) <= snapThreshold
}

const snapLeftCheck = (windowBounds, screenBounds, isWithinThreshold) => {
  if (isWithinThreshold(windowBounds.x, screenBounds.x)) {
    return {
      x: screenBounds.x,
      shouldSnap: true
    }
  }
  return {}
}

const snapRightCheck = (windowBounds, screenBounds, isWithinThreshold) => {
  const rightWindowEdge = windowBounds.x + windowBounds.width
  const rightScreenEdge = screenBounds.x + screenBounds.width
  if (isWithinThreshold(rightWindowEdge, rightScreenEdge)) {
    return {
      x: rightScreenEdge - windowBounds.width,
      shouldSnap: true
    }
  }
  return {}
}

const snapTopCheck = (windowBounds, screenBounds, isWithinThreshold) => {
  if (isWithinThreshold(windowBounds.y, screenBounds.y)) {
    return {
      y: screenBounds.y,
      shouldSnap: true
    }
  }
  return {}
}

const snapBottomCheck = (windowBounds, screenBounds, isWithinThreshold) => {
  const bottomWindowEdge = windowBounds.y + windowBounds.height
  const bottomScreenEdge = screenBounds.y + screenBounds.height
  if (isWithinThreshold(bottomWindowEdge, bottomScreenEdge)) {
    return {
      y: bottomScreenEdge - windowBounds.height,
      shouldSnap: true
    }
  }
  return {}
}

module.exports = snapCheck
