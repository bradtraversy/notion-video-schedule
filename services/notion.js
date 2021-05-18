const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')

// Init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const database_id = process.env.NOTION_DATABASE_ID

module.exports = async function getVideos() {
  const payload = {
    path: `databases/${database_id}/query`,
    method: 'POST',
  }

  const { results } = await notion.request(payload)

  const videos = results.map((page) => {
    console.log(page.properties.Description.rich_text[0].text.content)

    return {
      id: page.id,
      title: page.properties.Name.title[0].text.content,
      date: page.properties.Date.date.start,
      tags: page.properties.Tags.rich_text[0].text.content,
      description: page.properties.Description.rich_text[0].text.content,
    }
  })

  return videos
}
