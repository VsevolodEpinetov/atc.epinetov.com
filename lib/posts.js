import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark'
import html from 'remark-html'
import { serialize } from 'next-mdx-remote/serialize'

const postsDirectory = path.join(process.cwd(), 'data/posts')

export function getSortedPostsData() {
  // Get folders names under /posts
  const postsNames = fs.readdirSync(postsDirectory)

  const allPostsData = postsNames.map(postName => {
    const id = postName

    // Read markdown file as string
    const pathToPostFolder = path.join(postsDirectory, postName);
    const pathToFullPost = path.join(pathToPostFolder, 'post.mdx')
    const fileContents = fs.readFileSync(pathToFullPost, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort docs by date (why tho)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostsIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName
      }
    }
  })
}

/*export async function getPostData(id) {
  const pathToFolder = path.join(postsDirectory, id)
  const fullPath = path.join(pathToFolder, `post.md`)
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
          subheaderID > 0 ? `<a href='#${headerID - 1}-${subheaderID - 1}' onclick="copyURI(event)"><h4 id='${headerID - 1}-${subheaderID - 1}'>${part}` :
            headerID > 0 ? `<a href='#${headerID - 1}'><h3 id='${headerID - 1}' onclick="copyURI(event)">${part}` : part
        ).join('')
    ).join('')
    .replace(/<\/h3>/g, '</h3></a>')
    .replace(/<\/h4>/g, '</h4></a>');

  // JS for copying URLs
  contentHtml += (`
    <div id="message-success">Ссылка скопирована!</div>
    <div id="message-error">Не удалось скопировать ссылку :(</div>
      <script>  
      function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
      }  
      function copyURI(e) {
        e.preventDefault(); 
        try {
          copyToClipboard(window.location.href.split('#')[0] + '#' + e.target.getAttribute('id'))
          var successMessage = document.getElementById("message-success");
          successMessage.className = "show";
          setTimeout(function(){ successMessage.className = successMessage.className.replace("show", ""); }, 3000);
        } catch (error) {
          console.log(error)
          var errorMessage = document.getElementById("message-error");
          errorMessage.className = "show";
          setTimeout(function(){ errorMessage.className = errorMessage.className.replace("show", ""); }, 3000);
        }
      }
    </script>`);

  // JS for toasts

  const contentMDX = await serialize(matterResult.content)
  
  
  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    contentMDX,
    structure,
    ...matterResult.data
  }
}*/


export async function getPostData(id) {
  const pathToFolder = path.join(postsDirectory, id)
  const fullPath = path.join(pathToFolder, `post.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { content, data } = matter(fileContents)
  const contentMDX = await serialize(content)

  const headingLines = content
  .split('\r\n')
  .filter((line) => {
    return line.match(/^####*\s/);
  })

  const listOfHeaders = headingLines.map((raw) => {
    const text = raw.replace(/^####*\s/, '');
    // I only care about h3 and h4.
    // If I wanted more levels, I'd need to count the
    // number of #s.
    const level = raw.slice(0, 4) === '####' ? 1 : 0;

    return { text, level };
  });

  let structure = [];
  let currentHeaderID = -1;
  listOfHeaders.forEach(header => {
    if (header.level === 0) {
      structure.push({
        name: header.text,
        subheaders: []
      })
      currentHeaderID++;
    } else {
      structure[currentHeaderID].subheaders.push(header.text)
    }
  })

  //console.log(structure)

  let headerID = -1;
  let subheaderID;
  let temp = [];
  content
  .split('\r\n')
  .forEach(line => {
    let tempLine = line;
    if (line.slice(0, 4) === '####') {
      subheaderID++;
      tempLine = tempLine.replace('####', `<a href='#${headerID}-${subheaderID}' onclick="copyURI(event)"><h4 id='${headerID}-${subheaderID}'>`)
      tempLine += '</h4></a>';
    } else {
      if (line.slice(0, 3) === '###') {
        headerID++;
        subheaderID = -1;
        tempLine = tempLine.replace('###', `<a href='#${headerID}'><h3 id='${headerID}' onclick="copyURI(event)">`)
        tempLine += '</h3></a>';
      }
    }
    temp.push(tempLine);
  });

  let contentWithLinks = temp.join('\r\n');

  const contentWithLinksInHeaders = await serialize(contentWithLinks);


  //console.log(contentWithLinksInHeaders);

  /*console.log(serialize(content))

  console.log(structure);

  const contentWithAddedLinks = content.toString().split('<h3>')
    .map((partFull, headerID) =>
      partFull.split('<h4>')
        .map((part, subheaderID) =>
          subheaderID > 0 ? `<a href='#${headerID - 1}-${subheaderID - 1}' onclick="copyURI(event)"><h4 id='${headerID - 1}-${subheaderID - 1}'>${part}` :
            headerID > 0 ? `<a href='#${headerID - 1}'><h3 id='${headerID - 1}' onclick="copyURI(event)">${part}` : part
        ).join('')
    ).join('')
    .replace(/<\/h3>/g, '</h3></a>')
    .replace(/<\/h4>/g, '</h4></a>');

  const contentMDX = await serialize(contentWithAddedLinks)

  console.log(contentMDX)*/

  return {
    id,
    contentMDX,
    data,
    structure,
    contentWithLinksInHeaders
  }
}