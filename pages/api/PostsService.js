import axios from "axios"
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')

const sleep = ms => new Promise(res => setTimeout(res, ms));

export default class PostService {
  static async getAll(page = 1, numberOfPosts = 4) {
    const response = await axios.get(`https://rss.app/feeds/_TJquZIzaredTQXmR.xml`);
    const xml = response.data;
    const parseString = require('xml2js').parseString;
    let json;
    parseString(xml, function (err, result) {
      json = result;
    });

    //console.log(json);

    const posts = json.rss.channel[0].item;
    let res=[];

    require('dayjs/locale/ru')
    dayjs.extend(customParseFormat)

    posts.splice(0, numberOfPosts).forEach((p) => {
      res.push({
        source: 'tg',
        channel: p['dc:creator'].join(''),
        title: p.title.join('').slice(0, 80) + '...',
        body: p.description.join(''),
        //date: dayjs(p.pubDate.join('')).locale('ru').format('HH:mm, DD MMM')
        date: dayjs(p.pubDate.join('')).locale('ru').format('HH:mm')
      })
    })
    
    return res;
  }
}