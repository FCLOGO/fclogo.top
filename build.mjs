import { copyFile, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const projectRoot = new URL('./', import.meta.url)
const outputRoot = new URL('./public/', projectRoot)
const outputAssets = new URL('./assets/', outputRoot)

const files = [
  ['index.html', 'index.html'],
  ['styles.css', 'styles.css'],
  ['assets/fclogo.svg', 'assets/fclogo.svg'],
  ['assets/logo-share.png', 'assets/logo-share.png']
]

await rm(outputRoot, { recursive: true, force: true })
await mkdir(outputAssets, { recursive: true })

await Promise.all(
  files.map(([source, destination]) =>
    copyFile(new URL(source, projectRoot), new URL(destination, outputRoot))
  )
)

console.log(`Built static homepage at ${fileURLToPath(outputRoot)}`)
