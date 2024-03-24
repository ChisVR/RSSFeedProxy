import Router from 'koa-router'
import RSS from 'rss'
import xml from 'xml'
import mysql from 'mysql2/promise'; // Import MySQL library

const config = require('../config');
const router = new Router({ prefix: '/community' })

const pool = mysql.createPool({
  host: config.SQL_IP,
  user: config.SQL_USER,
  password: config.SQL_PASS,
  database: config.SQL_DB
});


router.get('/nekosunevr', async (ctx, next) => {
  ctx.type = 'text/xml'
  try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute('SELECT * FROM rss_items_nekosunevr');
      connection.release();

      const nekosunevr = new RSS({
          title: 'Posts from @NekoSuneVR Community',
          feed_url: 'https://rss.nekosunevr.co.uk/community/nekosunevr',
          site_url: 'https://nekosunevr.co.uk',
          image_url: 'https://cdn.discordapp.com/avatars/100463282099326976/399b26c0afd5de84d5f58d1d62aef6b1.webp?size=1024&format=webp&width=0&height=256',
          managingEditor: 'NekoSuneVR',
          webMaster: 'NekoSuneVR',
          copyright: '2023 NekoSuneVR',
          language: 'en',
          ttl: '60',
      });

      rows.forEach(row => {
          nekosunevr.item({
              title: row.title,
              url: row.url,
              author: row.author,
              date: row.date,
              description: row.description
          });
      });

      ctx.body = await nekosunevr.xml();
  } catch (error) {
      console.error('Error fetching items:', error);
      ctx.status = 500;
      ctx.body = 'Internal Server Error';
  }
})

router.get('/nekosuneai', async (ctx, next) => {
  ctx.type = 'text/xml'
  try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute('SELECT * FROM rss_items_nekosuneai');
      connection.release();

      const nekosunevr = new RSS({
          title: 'Posts from @NekoSuneVR Community',
          feed_url: 'https://rss.nekosunevr.co.uk/community/nekosuneai',
          site_url: 'https://nekosunevr.co.uk',
          image_url: 'https://cdn.discordapp.com/icons/1194327273101340682/a2fbcab894e9ead394ce526fe6d57b5c.webp?size=1024&format=webp&width=0&height=256',
          managingEditor: 'NekoSuneVR',
          webMaster: 'NekoSuneVR',
          copyright: '2023 NekoSuneVR',
          language: 'en',
          ttl: '60',
      });

      rows.forEach(row => {
          nekosunevr.item({
              title: row.title,
              url: row.url,
              author: row.author,
              date: row.date,
              description: row.description
          });
      });

      ctx.body = await nekosunevr.xml();
  } catch (error) {
      console.error('Error fetching items:', error);
      ctx.status = 500;
      ctx.body = 'Internal Server Error';
  }
})

router.get('/alloyxuast', async (ctx, next) => {
  ctx.type = 'text/xml'
  try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute('SELECT * FROM rss_items_alloyxuast');
      connection.release();

      const nekosunevr = new RSS({
          title: 'Posts from @AlloyXuast Community',
          feed_url: 'https://rss.nekosunevr.co.uk/community/alloyxuast',
          site_url: 'https://alloyxuast.co.uk',
          image_url: 'https://cdn.discordapp.com/icons/718534469778145320/c45ee9bcee1bd19def30729b9d8560f0.webp?size=1024&format=webp&width=0&height=256',
          managingEditor: 'NekoSuneVR',
          webMaster: 'NekoSuneVR',
          copyright: '2023 NekoSuneVR',
          language: 'en',
          ttl: '60',
      });

      rows.forEach(row => {
          nekosunevr.item({
              title: row.title,
              url: row.url,
              author: row.author,
              date: row.date,
              description: row.description
          });
      });

      ctx.body = await nekosunevr.xml();
  } catch (error) {
      console.error('Error fetching items:', error);
      ctx.status = 500;
      ctx.body = 'Internal Server Error';
  }
})

export default router
