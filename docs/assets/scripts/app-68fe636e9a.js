!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=o(n(1)),r=o(n(2)),a=o(n(5)),s=(new i.default,new r.default);new a.default(s)},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(){function e(){o(this,e),this.topNav=$(".topNav"),this.events()}return i(e,[{key:"events",value:function(){this.topNav.click(this.infoToggle.bind(this))}},{key:"infoToggle",value:function(e){$(".appDetails").toggleClass("visible"),e.stopPropagation(),$(document).click(function(){$(".appDetails").removeClass("visible"),$(document).off()})}}]),e}();t.default=r},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=o(n(3)),s=o(n(4)),u=function(){function e(){i(this,e),this.currentPoemData={},this.gUrl="https://content.guardianapis.com/search?show-fields=body&q=",this.gKey="&api-key=2c7e590d-dde8-498a-b351-b008c42edf52",this.poemBody=$(".poemBody"),this.poemControls=new s.default(this),this.shareLinks=new a.default}return r(e,[{key:"createPoem",value:function(e){var t=this,n=[];this.poemBody.empty();for(var o=0;o<10;o++)n.push(Math.floor(Math.random()*e.content.length));n.forEach(function(n){t.poemBody.append($("<li class='poemLine'>").append($("<span class='poemLineText'>").html(e.content[n])).append($("<div class='poemLineRefresh'>").html("<i class='material-icons md-18'>&#xE86A;</i>")))}),this.poemControls.newPoem(e),this.shareLinks.newPoem(),$(".articleLink").attr("href",e.link)}},{key:"parseData",value:function(e,t){var n=e.response.results,o=Math.floor(Math.random()*n.length),i=n[o].fields.body,r=n[o].webUrl,a=i.replace(/\<br\>/g,".").replace(/<(?:.|\n)*?>/gm,"").replace(/\&apos/g,"'").replace(/\&amp/g," and ").replace(/\u201C|\u201D|!|\(|\)|\[|\]|;|:|\"|\/|,|\.com|\&quot|\.|\?|–|\u2013 |\&|\u2022|\||@/g,".").split(".").map(function(e){var t=e.trim();if(t.length>2&&t.length<90&&"Photograph"!=t&&"'*"!=t)return t.charAt(0).toUpperCase()+t.slice(1)}).filter(function(e){return e});this.currentPoemData={title:t,link:r,content:a},this.createPoem(this.currentPoemData)}},{key:"newPoem",value:function(e){var t=this;$("h1").text(e),$("ul").empty().append("<div class='loadingDiv'>Loading<span>.</span><span>.</span><span>.</span></div>");var n=e.replace(/ /g," AND ");$.getJSON(t.gUrl+n+t.gKey,function(o){Number(o.response.total)>0?t.parseData(o,e):(n=n.replace(/ AND /g," OR "),$.getJSON(t.gUrl+n+t.gKey,function(n){Number(n.response.total)>0?t.parseData(n,e):$(".loadingDiv").html("No results, try again x")}))})}}]),e}();t.default=u},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(){function e(){o(this,e),this.shareLink=$(".shareLink i"),this.poemContents={},this.events()}return i(e,[{key:"events",value:function(){this.shareLink.click(this.sendWhatsAppPoem.bind(this))}},{key:"newPoem",value:function(){this.poemContents=$(".poemLineText")}},{key:"whatsAppPoemLink",value:function(){var e=$("#poemTitle h1").text().toUpperCase()+"\n\n";return this.poemContents.each(function(){e+=this.textContent+"\n"}),"whatsapp://send?text="+encodeURI(e+"\nMake your own autopoem at jarodhargreav.es/autopoetry")}},{key:"sendWhatsAppPoem",value:function(){var e=this;this.shareLink.parent().attr("href",e.whatsAppPoemLink())}}]),e}();t.default=r},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(){function e(t){o(this,e),this.poem=t,this.poemData={},this.poemEdit=$("#poemEdit"),this.poemEditIcon=$("#poemEdit .material-icons"),this.poemContainer=$("#poemContainer"),this.poemLinesRefresh=$(),this.wholePoemRefresh=$("#wholePoemRefresh"),this.editModeActive=!1,this.events()}return i(e,[{key:"events",value:function(){var e=this;this.poemEdit.off().click(this.editMode.bind(this)),this.poemLinesRefresh.off().click(function(){e.refreshLine(this)}),this.wholePoemRefresh.off().click(this.refreshPoem.bind(this))}},{key:"newPoem",value:function(e){this.poemData=e,this.poemLinesRefresh=$(".poemLineRefresh"),this.events()}},{key:"editMode",value:function(){!0===this.editModeActive?(this.poemEditIcon.text("mode_edit"),this.poemContainer.removeClass("editMode"),this.editModeActive=!1):(this.poemEditIcon.text("done"),this.poemContainer.addClass("editMode"),this.editModeActive=!0)}},{key:"refreshLine",value:function(e){var t=this.poemData.content[Math.floor(Math.random()*this.poemData.content.length)];$(e).prev().text(t)}},{key:"refreshPoem",value:function(){this.editMode(),this.poem.newPoem(this.poemData.title)}}]),e}();t.default=r},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(){function e(t){o(this,e),this.poem=t,this.inputButton=$("#inputSubmit"),this.inputText=$("#inputText"),this.events(this.firstWordSearch),this.inputText.focus()}return i(e,[{key:"events",value:function(e){var t=this;this.inputButton.off().click(e.bind(this)),this.inputText.off().keypress(function(n){13==n.which&&e.call(t)})}},{key:"newWordSearch",value:function(){""!=this.inputText.val()?(this.poem.newPoem(this.inputText.val()),this.inputText.val("").removeClass("inputMobile").parent().removeClass("poemFormExpanded"),this.inputButton.blur(),$(".editMode").removeClass("editMode"),$("#poemEdit .material-icons").text("mode_edit")):this.inputText.addClass("inputMobile").focus().parent().addClass("poemFormExpanded")}},{key:"firstWordSearch",value:function(){""!=this.inputText.val()?($(".container").removeClass("hidden"),$(".poemForm").removeClass("poemFormInit").addClass("poemFormBottom"),this.events(this.newWordSearch),this.newWordSearch()):this.inputText.focus()}}]),e}();t.default=r}]);