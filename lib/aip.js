import fs from 'fs';
import path from 'path';

const aipDirectory = path.join(process.cwd(), 'public/aip')

export function getAllAIPData() {
  // Get file names under /posts
  const aeroportsICAOCodes = fs.readdirSync(aipDirectory)

  const allAIPData = aeroportsICAOCodes.map(aeroportICAOCode => {
    const aeroportAvailableAIP = fs.readdirSync(`${aipDirectory}/${aeroportICAOCode}`)

    var availableAIPList = [];

    aeroportAvailableAIP.forEach(fileName => {
      if (fileName !== 'info.json') {
        var link = `/aip/${aeroportICAOCode}/${fileName}`;

        var type = 'Full'
        var typeFromFile = fileName.split('_')[1];
        switch (typeFromFile) {
          case 'STAR.pdf':
            type = 'STAR';
            break;
          case 'SID.pdf':
            type = 'SID';
            break;
        }

        availableAIPList.push({
          type: type,
          link: link
        })
      }
    });

    const aeroportRawData = fs.readFileSync(`${aipDirectory}/${aeroportICAOCode}/info.json`, 'utf8')
    var aeroportInfo = JSON.parse(aeroportRawData);

    // Combine the data with the id
    return {
      aeroportICAOCode,
      availableAIPList,
      aeroportInfo
    }
  })

  return allAIPData;
}
