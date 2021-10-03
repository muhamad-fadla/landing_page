(function(window, s, $){


	$(s).ready(function(){


		new gridjs.Grid({
		  columns: ['#', 'Nama Layanan', 'Kategori', 'Harga', 'Harga Reseller'],
		  data: [
		  	['no data','no data','no data','no data','no data']
		  ],
		  search: true,
		  sort: true,
		}).render(s.getElementById("servicesTable"));
	});

})(window, document, jQuery);