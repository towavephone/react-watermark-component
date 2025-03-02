export default function getWaterMarkCanvas(text, options) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const canvasWidth = options.chunkWidth
  const canvasHeight = options.chunkHeight
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  ctx.textAlign = options.textAlign
  ctx.textBaseline = options.textBaseline
  ctx.globalAlpha = options.globalAlpha
  ctx.font = options.font

  ctx.translate(canvasWidth / 2, canvasHeight / 2)
  ctx.rotate(options.rotateAngle)

  ctx.translate(-canvasWidth / 2 * 1.2, -canvasHeight / 2 * 1.2)
  ctx.fillStyle = options.fillStyle

  const waterMarkText = []
  const chunkWidth = options.chunkWidth
  const chunkHeight = options.chunkHeight
  const horizontalChunkCount = Math.ceil(canvasWidth / chunkWidth) + 1
  const verticalChunkCount = Math.ceil(canvasHeight / chunkHeight) + 1

  for (let j = 0, initY = chunkHeight / 2, indent = 0; j <= verticalChunkCount; j += 1) {
    indent = parseInt(j % 2)

    for (let i = 0, initX = chunkWidth / 2; i <= horizontalChunkCount; i += 1) {
      waterMarkText.push({
        text,
        x: i * chunkWidth + indent * initX,
        y: j * chunkHeight + initY
      })
    }
  }

  waterMarkText.forEach((item) => {
    ctx.fillText(item.text, item.x, item.y)
  })

  return ctx.canvas.toDataURL()
}
