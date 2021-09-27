const express = require('express');
const expressSitemapXml = require('express-sitemap-xml')
const dnsPrefetchControl = require('dns-prefetch-control')

const app = express();
const path = require('path')

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

app.use(expressSitemapXml(getUrls, 'https://my-topup.store'))
app.use(dnsPrefetchControl({ allow: true }))

app.use(express.static(path.join(__dirname, 'public')))


var IS_PRUDUCTION = true;

app.get('/', (req, res) => {

	res.sendFile(path.join(__dirname, `views/index${IS_PRUDUCTION ? '.min' : ''}.html`));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));