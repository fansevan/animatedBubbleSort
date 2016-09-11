$(document).ready(function(){
	resetNumberForSort();
});

var randIntArr = []; // массив для целых чисел

function randomInteger(min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}

function isInteger(num) {
  return (num ^ 0) === num;
}

function resetNumberForSort() {
  $('.number-after-sort').each(function(index, element) {		
		$(element).css({left: 40 + (index * 100)});
		$(element).html("-");
	});
}

function generateNumbers() {		 
	var minInteger = +document.getElementById('minNumber').value;
	var maxInteger = +document.getElementById('maxNumber').value;

	if (minInteger >= maxInteger || 
		  !isInteger(minInteger) || 
		  !isInteger(maxInteger) ||
		  		minInteger < -99 || 
		  		 minInteger > 99 || 
		  		maxInteger < -99 || 
		  		maxInteger > 99) {
		alert("Введите корректный диапазон ЦЕЛЫХ чисел [-99, 99], где \"min\" не может быть больше или равно \"max\"");
		document.getElementById("sortButton").disabled = true;
		return;
	}	

	// Сброс произведенных изменений
	document.getElementById("sortButton").disabled = false;
	document.getElementById("sortStatusText").innerHTML = "Сортировка еще не началась";
	randIntArr = [];
	resetNumberForSort();

	// Генерация чисел и запись их в массив и в div'ы
	var rand;
	$('.number-before-sort').each(function(index, element) {
		rand = randomInteger(minInteger, maxInteger);
		randIntArr.push(rand);
	    $(element).html(rand);
	});	
}

function sortNumbers() {	
	document.getElementById("sortButton").disabled = true;
	document.getElementById("generateButton").disabled = true;
	document.getElementById("sortStatusText").innerHTML = "Сортировка в процессе...";
	
	$('.number-after-sort').each(function(index, element) {		
	    $(element).html(randIntArr[index]);
	});

	var listForSort = $(".number-after-sort");

	var length = randIntArr.length;
	var delay = 700; // Скорость сортировки в милисекундах

    for (var i = 0; i < length - 1; i++) {
    	// Анонимные self-invoked функции необходимы для корректной работы setTimeout
    	(function(i) {    		
    		for (var j = 0; j < (length - 1 - i); j++) { 
	    		(function(j) {	
	    			// setTimeout необходим из-за анимации элементов, 
	    			// необходимо ждать ее завершения перед новой итерацией цикла
	    			setTimeout(function() {		    	
	    			 	$(listForSort[j]).css("backgroundColor", "blue");
	    			 	$(listForSort[j + 1]).css("backgroundColor", "blue");

		    			if (randIntArr[j] > randIntArr[j + 1]) { 
					    	var temp = randIntArr[j];                
			                randIntArr[j] = randIntArr[j + 1];
							randIntArr[j + 1] = temp;

					    	var tempObj = listForSort[j];
						    [].splice.call(listForSort, j, 1, listForSort[j + 1]);
						    [].splice.call(listForSort, j + 1, 1, tempObj);	

					    	var tempLeft = listForSort[j].style.left;
						    $(listForSort[j]).animate({	left: listForSort[j + 1].style.left }, delay);
						    $(listForSort[j + 1]).animate({ left: tempLeft }, delay);   						        
		            	}

		            	if (j == length - 2 - i)
	            			listForSort.css("backgroundColor", "red");

		            	if (i == length - 2) {
		            		document.getElementById("sortStatusText").innerHTML = "Сортировка завершена!";
		            		document.getElementById("generateButton").disabled = false;
		            	}
				    }, delay * j + ((length - 1) * i * delay));
	    		})(j);    		
		    }			    
    	})(i);    	    
    }                                 	
}