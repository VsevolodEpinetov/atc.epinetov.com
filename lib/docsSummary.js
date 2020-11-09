import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark'
import html from 'remark-html'

const docsDirectory = path.join(process.cwd(), 'data/docs')

export function getAllDocsIds() {
  const fileNames = fs.readdirSync(docsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName
      }
    }
  })
}

export function getAllSummaryDocsIds() {
  const docsNames = fs.readdirSync(docsDirectory)
  var fileNames = [];
  docsNames.forEach(docName => {
    const pathToFolder = path.join(docsDirectory, docName)
    const fullPath = path.join(pathToFolder, `summary.md`)
    if (fs.existsSync(fullPath)) fileNames.push(docName)
  })

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName
      }
    }
  })
}


export async function getDocSummaryData(id) {
  const pathToFolder = path.join(docsDirectory, id)
  const fullPath = path.join(pathToFolder, `summary.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  var contentHtml = processedContent.toString()

  // Parse document structure
  const structure = contentHtml.split('<h3>')
    .filter((a, id) => id > 0 && a)
    .map(partFull => {
      let subheaders = [];
      partFull.split('<h4>')
        .map((part, subheaderID) =>
          subheaderID > 0 && subheaders.push(part.split('</h4>')[0])
        )
      return {
        'name': `${partFull.split('</h3>')[0]}`,
        'subheaders': subheaders
      }
    })

  contentHtml = contentHtml.split('<h3>')
    .map((partFull, headerID) =>
      partFull.split('<h4>')
        .map((part, subheaderID) =>
          subheaderID > 0 ? `<a href='#${headerID - 1}-${subheaderID - 1}'><h4 id='${headerID - 1}-${subheaderID - 1}'>${part}` :
            headerID > 0 ? `<a href='#${headerID - 1}'><h3 id='${headerID - 1}'>${part}` : part
        ).join('')
    ).join('')
    .replace(/<\/h3>/g, '</h3></a>')
    .replace(/<\/h4>/g, '</h4></a>');

  return {
    id,
    contentHtml,
    structure,
    ...matterResult.data
  }
}
