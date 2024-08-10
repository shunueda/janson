import { readdirSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { EOL } from 'node:os'
import { generateContent } from '../util/generateContent'

const TEST_DIR = 'test'
const CONSTANTS_DIR = 'constants'
const README_FILE = 'README.md'

console.log(`Generating ${README_FILE}...`)

const contents = await Promise.all(
  readdirSync(TEST_DIR, {
    recursive: true,
    withFileTypes: true
  })
    .filter(it => it.isFile())
    .filter(it => !it.parentPath.includes(CONSTANTS_DIR))
    .map(it => {
      const filename = `${it.parentPath}/${it.name}`
      return {
        filename: `### ${filename}`,
        buffer: readFile(filename, 'utf-8')
      }
    })
    .map(async ({ filename, buffer }) => {
      return `${filename}${EOL}${await buffer}`
    })
)

const prompt = `
  I am creating a NPM library.
  Using the content from the files provided below, create a comprehensive ${README_FILE} in Markdown format.
  Keep it simple and focus on the main features of the library.
  Do not include any extra characters like backticks; just output raw markdown text that can be easily copied and pasted. 
  The content for the files is provided below:
  
  ${contents.join(`${EOL}${EOL}`)}
  
  Please generate the ${README_FILE} according to the guidelines above.
`

console.log(`
  Generating ${README_FILE} with the following prompt:
  ${prompt}
`)

writeFileSync(README_FILE, await generateContent(prompt))

console.log(`${README_FILE} generated successfully!`)
