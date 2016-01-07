$.ajax({
	url: '/ceshi',
	type: 'GET',
	dataType: 'json',
	data: {name: 'div', sex : '1', bridth: '2015-11-20'},
	success: function(data){
		console.log(data);
	}
})
