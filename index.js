const express = require('express');
const expressSitemapXml = require('express-sitemap-xml')
const dnsPrefetchControl = require('dns-prefetch-control')
const fs = require('fs')
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

const route = function route(path_url){
	return path.join(__dirname, `views/${path_url}.${IS_PRUDUCTION ? 'min.' : ''}html`)
}


var IS_PRUDUCTION = false;

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, `views/index${IS_PRUDUCTION ? '.min' : ''}.html`));
});

app.get('/services/:dir/:sub',(req,res) => {
	if(fs.existsSync(route('services/'+req.params.dir.toLowerCase() + '/' + req.params.sub.toLowerCase()))){
		res.sendFile(route('services/'+req.params.dir.toLowerCase() + '/' + req.params.sub.toLowerCase()));
	}else{
		res.send('not found')
	}
})

app.get('/***', (req,res) => res.send('ok'))

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));