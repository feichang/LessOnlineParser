var input = ace.edit("input"),
	output = ace.edit("output"),
	log = ace.edit("log");
var lessCode = input.getSession().getValue();
var parser = less.Parser();

window.onload = function() {
	//ace初始化
	input.setTheme("ace/theme/twilight");
	output.setTheme("ace/theme/twilight");
	log.setTheme("ace/theme/twilight");
	var CssMode = require("ace/mode/css").Mode;
	//input.getSession().setMode(new CssMode());
	output.getSession().setMode(new CssMode());
	insertTestData();
};

function insertTestData(){
	input.gotoLine(1);
	input.getSession().setValue('.box-shadow (@x: 0, @y: 0, @blur: 1px, @alpha) {\n  @val: @x @y @blur rgba(0, 0, 0, @alpha);\n\n  box-shadow:         @val;\n  -webkit-box-shadow: @val;\n  -moz-box-shadow:    @val;\n}\n.box { @base: #f938ab;\n  color:        saturate(@base, 5%);\n  border-color: lighten(@base, 30%);\n  div { .box-shadow(0, 0, 5px, 0.4) }\n}');
}

function work(){
	try {
		parser.parse(input.getSession().getValue(), function(error, result){
			if(error == null){
				output.getSession().setValue(result.toCSS());
				log.getSession().setValue('');
			}
			else{
				log.getSession().setValue(error.message);
				output.getSession().setValue('');
			}
		});
	}
	catch (error){
		log.getSession().setValue(error.message);
		output.getSession().setValue('');
	}
}

var self = this;
//编译事件绑定
$('#very-parser').click(function(){
	work.call(self);
});