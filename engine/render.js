const fs = require('fs');
const cheerio = require('cheerio');

let template = `<!DOCTYPE html><html lang="id"><head> <script async src="https://www.googletagmanager.com/gtag/js?id=G-SV6EXBTFVH"></script> <script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-SV6EXBTFVH');</script> </head><body></body></html>`;

let options = {
	cache: true
}

let storage = {
	cached: {},
}


let Component = ($, $template) => {

	$('head').remove('head');

	$('x-include').each(function(i){

		let raw = fs.readFileSync("./../views/" + $(this).attr('to') + '.htm').toString();

		$component = cheerio.load(raw);

		$template('head').prepend($component('head').html());

		$component('head').remove();

		$component('slot').replaceWith($(this).html());
		$(this).replaceWith($component.html())

	});

	if($('x-include').length != 0){
		Component($, $template);
	}

	return $;

}


const Engine = (filepath, opts, callback) => {

	if(typeof storage['cached'][filepath] == "string" && options.cache == true){
		return callback(null, storage['cached'][filepath]);
	}

	console.log(filepath)

	fs.readFile(filepath, (err, raw) => {
		if(err) callback(err);

		let $ = cheerio.load(raw.toString());

		let $template = cheerio.load(template);

		$template('head').prepend($('head').html());
		$('head').remove();

		let response = Component($, $template);

		$template('body').append(response.html());

		let html = $template.html();
		if(options.cache == true){
			storage['cached'][filepath] = html
		}

		return callback(null, html)
	})
}


module.exports = function Render(app){
	app.set('views', './views');
	app.set('view engine', 'htm');

	app.engine('htm', Engine);
}