const express = require('express');
const expressSitemapXml = require('express-sitemap-xml')
const dnsPrefetchControl = require('dns-prefetch-control')
const fs = require('fs')
const app = express();
const path = require('path')
const ViewEngine = require('./engine/render.js');

function getUrls(){
	return [
		{
  			url: '/',
	  		lastMod: new Date('2021-09-01').toISOString(), // optional (specify `true` for today's date)
	  		changeFreq: 'weekly', // optional
	  		// priority: 1,
		}
	];
}

// app.set('env', 'production')
// app.set('cache', true)

ViewEngine(app);

app.use(expressSitemapXml(getUrls, 'https://my-topup.store'))
app.use(dnsPrefetchControl({ allow: true }))

app.use(express.static(path.join(__dirname, 'public')))

console.log(app.get('env'))

const route = function Route(url, viewPath, data = {}){
	app.get(url, (req,res) => res.render(viewPath));
}

route('/', 'index', {name: 'bambank'});

route('/terms-of-services', 'term-of-services/index');

route('/contact', 'contact/index')

route('/services/social-media-engagement', 'services/sme')


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));