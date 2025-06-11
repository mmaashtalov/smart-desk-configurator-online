const fs = require('fs')
const path = require('path')
const { create } = require('xmlbuilder2')
const YAML = require('yamljs')

const dataDir = path.resolve(__dirname, '../seo-data')
const publicDir = path.resolve(__dirname, '../public')

// robots.txt
try {
  const robotsData = JSON.parse(fs.readFileSync(path.join(dataDir,'robots.json')))
  fs.writeFileSync(path.join(publicDir,'robots.txt'), robotsData.content || '')
} catch (e) {
  if (e.code !== 'ENOENT') console.error('Error processing robots.txt:', e);
  else fs.writeFileSync(path.join(publicDir,'robots.txt'), '');
}

// sitemap.xml
try {
  const sitemapData = JSON.parse(fs.readFileSync(path.join(dataDir,'sitemap.json')))
  const urlset = create({ version: '1.0' }).ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' })
  ;(sitemapData.urls||[]).forEach(u=>{
    const url = urlset.ele('url')
    url.ele('loc').txt(u.loc)
    if(u.lastmod) url.ele('lastmod').txt(u.lastmod)
    if(u.priority) url.ele('priority').txt(u.priority)
  })
  fs.writeFileSync(path.join(publicDir,'sitemap.xml'), urlset.end({ prettyPrint:true }))
} catch (e) {
  if (e.code !== 'ENOENT') console.error('Error processing sitemap.xml:', e);
  else {
    const urlset = create({ version: '1.0' }).ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' })
    fs.writeFileSync(path.join(publicDir,'sitemap.xml'), urlset.end({ prettyPrint:true }))
  }
}

// YML feed
try {
  const feedData = JSON.parse(fs.readFileSync(path.join(dataDir,'feed.json')))
  const yml = YAML.stringify(feedData, 4)
  fs.writeFileSync(path.join(publicDir,'feed.yml'), yml)
} catch (e) {
  if (e.code !== 'ENOENT') console.error('Error processing feed.yml:', e);
  else fs.writeFileSync(path.join(publicDir,'feed.yml'), '');
}

console.log('✅ SEO files generated') 