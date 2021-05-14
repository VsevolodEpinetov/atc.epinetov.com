import fs from 'fs';
import path from 'path';

const aipDirectory = path.join(process.cwd(), 'data')

export function getAllAIPData() {
  // Get file names under /posts
  const data = fs.readFileSync(`${aipDirectory}/aip.json`);
  const aipList = JSON.parse(data);
  let allAIPData = [];
  let availableAIPList = [];
  let possibleAIPTypes = ["full", "STAR", "SID"];

  for (const aeroportICAOCode in aipList) {
    possibleAIPTypes.forEach(type => {
      if (aipList[aeroportICAOCode].availableTypes[type]) {
        //let link = `https://storage.googleapis.com/atc.epinetov.com/public/aip/${aeroportICAOCode}/${aeroportICAOCode}_${type}.pdf`;
        availableAIPList.push({
          type: type,
          link: `https://storage.googleapis.com/atc.epinetov.com/public/aip/${aeroportICAOCode}/${aeroportICAOCode}_${type}.pdf`
        })
      }
    })
    allAIPData.push({
      "aeroportICAOCode": aeroportICAOCode,
      "availableAIPList": availableAIPList,
      "aeroportInfo": {
        "name": aipList[aeroportICAOCode].name,
        "country": aipList[aeroportICAOCode].country
      },
      "availableAIPTypes": aipList[aeroportICAOCode].availableTypes
    })
  }
  console.log(allAIPData)
  /*const allAIPData = aipList.map(aeroportICAOCode => {

    var availableAIPList = [];

    aeroportAvailableAIP.forEach(fileName => {
      if (fileName !== 'info.json') {
        var link = `https://storage.googleapis.com/atc.epinetov.com/public/aip/${aeroportICAOCode}/${fileName}`;

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
  })*/

  return allAIPData;
}
