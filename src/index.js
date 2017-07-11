import { Observable } from 'rxjs'

const usedColors = []

const areEqualColors = (c1, c2) => c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2]

const isUsedColor = (color) => usedColors.some(areEqualColors)

const getRandomColorComponent = () => Math.floor(Math.random() * (255 + 1));

const formatColorForCss = (color) => `rgb(${color.join(', ')})`

const getRandomColor = () => {
  // given we need only 10 unique random colors, we can afford
  // to retry on collisions until we find an unused color.
  let color
  do {
    color = [
      getRandomColorComponent(),
      getRandomColorComponent(),
      getRandomColorComponent()
    ]
  } while (isUsedColor(color))
  usedColors.push(color)
  return color
}

const setBackgroundColor = (colorStr) => {
  const bodyEl = document.getElementsByTagName('body')
  if (bodyEl && bodyEl.length > 0) {
    bodyEl[0].style.backgroundColor = colorStr
  }
}

const changeColor = () => {
  document.addEventListener('DOMContentLoaded', () => {
    Observable
      .interval(1000)           // emits every 1s
      .take(10)                 // but we only care about the first 10 emissions
      .map(getRandomColor)      // generates a color
      .map(formatColorForCss)   // formats color [r, g, b] into "rgb(r, g, b)" for styling purposes
      .subscribe(
        setBackgroundColor,       // sets the background color
        err => console.log(err),  // handles errors
      )
  })
}

export default changeColor
