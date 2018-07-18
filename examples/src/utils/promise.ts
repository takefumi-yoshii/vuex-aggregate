export function wait(duration = 100) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
