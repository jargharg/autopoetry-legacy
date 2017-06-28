var gUrl = "http://content.guardianapis.com/search?show-fields=body&q=",
gKey = "&api-key=2c7e590d-dde8-498a-b351-b008c42edf52",
wordSearch = "hello";

$(document).ready(function(){
	getData();

	// Event listeners
	$("#submitNewWord").click(newPoem); // Submit button pressed
	$("#newWordText").keypress(function(e){
        if (e.which == 13) newPoem(); // Enter key pressed
    });
})

function newPoem(){
	wordSearch = $("#newWordText").val();
	$("#newWordText").val("");
	getData();
}

function getData(){
	$.getJSON(gUrl+wordSearch+gKey, function(data){
		parseData(data);
	});
}

function parseData(data) {
	if (Number(data.response.total) > 0){
		var results = data.response.results,
		article = Math.floor(Math.random()*results.length),
		content = results[article].fields.body,
		articleLink = results[article].webUrl;

		var textContent = content.replace(/<(?:.|\n)*?>/gm, '')
		.split(/\.|!|\(|\)|;|:|\"|,|\.|\?|-|\u2022|\||\“|\”/);

		textContent.forEach(function(str, ind){
			str = str.trim();
			textContent[ind] = str;
			//get rid of long sections, sentences with @, numbers too?
			if (str.length < 3 || str.length > 100) {
				textContent.splice(ind,1);
			} else {
				textContent[ind] = str.charAt(0).toUpperCase() + str.slice(1);
			}
		});

		createPoem(textContent, articleLink);
	}
}


function createPoem(content, articleLink){
	var randomArray = [];
	var $poemBody = $("ul");
	$poemBody.empty();
	for(var i=0; i<10; i++) {
		randomArray.push(Math.floor(Math.random()*content.length))
	}

	randomArray.forEach(function(x){
	$poemBody.append(
		$("<li />").html(content[x])
		);
	});

	$("h1").text(wordSearch);
	$(".articleLink a").attr("href", articleLink);
}