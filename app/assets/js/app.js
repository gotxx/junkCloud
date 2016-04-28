
var selectApp = {
	init: function() {
		this.selectForm = $('#select-form');
		this.select = $('#select-inch');
		this.options = this.select.find('option');
		this.select.html(this.sortElements(this.options));
		this.select.val(this.options.first().text());

	},
	cloneSortElements: function(colection) {
		return colection.clone().sort(function(a, b) {
			return +$(a).text() > +$(b).text();
		});
	},
	sortElements: function(colection) {
		return colection.sort(function(a, b) {
			return +$(a).text() > +$(b).text();
		});
	}

};

$(function() {
	console.log(selectApp);
	selectApp.init();
});