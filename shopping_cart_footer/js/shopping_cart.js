$(document).ready(function() {

	var countEachItemPrice = function(priceReal, priceOld, quantity, objPriceReal, objPriceOld){
		var priceRealNow = (priceReal * quantity);
		var priceOldNow = (priceOld * quantity);

		objPriceReal.attr('price-real-now', priceRealNow);

		var priceRealNowDot = addDots(priceReal * quantity);
		var priceOldNowDot = addDots(priceOld * quantity);
		objPriceReal.text(priceRealNowDot +"đ");
		objPriceOld.text(priceOldNowDot +"đ");

		totalPrice();
	}

	var addDots = function(nStr){
	    nStr += '';
	    let x = nStr.split('.');
	    let x1 = x[0];
	    let x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + '.' + '$2');
	    }
	    return x1 + x2;
	};

	var getElementEachItem = function(obj){
		objPriceReal = obj.parents('.item').find('.priceReal');
		objPriceOld = obj.parents('.item').find('.priceOld');
		getPriceReal = objPriceReal.attr('rel');
		getPriceOld  = objPriceOld.attr('rel');
	}

	var totalPrice = function(){
		var getSumObj = $('.pnl .sum span');
		var numTotal = 0;

		$('.item .priceReal').each(function(index){
			numTotal += parseInt($(this).attr('price-real-now'));
		});
		getSumObj.attr('rel', numTotal);
		getSumObj.text(addDots(numTotal) + "đ");
	}

	var countItems = function(obj){
		var numberProducts = 2;
		var countItems = 0;
		$(obj).each(function(index){
			countItems += 1;
		});

		if(countItems < 4){
			$('.pnl .prods span').remove();
			var arrDataCodes = [];
			var arrUrlImages = [];
			$(obj).each(function(index){
				var getDateCode = $(this).attr('data-code');
				var getUrlImage = $(this).find('figure img').attr('src');

				arrDataCodes.push(getDateCode);
				arrUrlImages.push(getUrlImage);
			});

			$('.pnl .prods figure').remove();

			var listImageProducts = [];
			$.each(arrDataCodes, function(index, value){
				var arrDoms = $('<figure data-code="'+ value +'"><img src="'+ arrUrlImages[index] +'" width="36" height="36"></figure>');
				listImageProducts.push(arrDoms);
			});
			$('.pnl .prods').append(listImageProducts);
			

			return false;
		}
		else if(countItems === 4){
			numberProducts = 2;
		}
		else if(countItems > 4){
			numberProducts = (countItems - 2);
		}

		$('.pnl .prods span b').text("+" +numberProducts);
	}

	$('.item .del').click(function(){
		$(this).parents('.item').remove();
		var numberProduct = 0;
		$('.dragpnl .item').each(function(index){
			numberProduct += 1;
		});
		$('.pnl .txt b').text(numberProduct);
		totalPrice();
	});

	// Start button decrease, increase quantity product
	$('.numShow .minus').click(function(){
		var objMyself = $(this).parent('.numShow').children('input');
		var getVal = parseInt(objMyself.val().trim());
		if(getVal <= 1){
			return false;
		}

		getVal -= 1;
		objMyself.val(getVal);
		objMyself.attr('value', getVal);

		getElementEachItem($(this));
		countEachItemPrice(getPriceReal, getPriceOld, getVal, objPriceReal, objPriceOld);
	});

	$('.numShow .plus').click(function(){
		var objMyself = $(this).parent('.numShow').children('input');
		var getVal = parseInt(objMyself.val().trim());
		
		getVal += 1;
		objMyself.val(getVal);
		objMyself.attr('value', getVal);

		getElementEachItem($(this));
		countEachItemPrice(getPriceReal, getPriceOld, getVal, objPriceReal, objPriceOld);
	});

	$('.numShow input').keydown(function(e){
		if(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode === 8 || e.keyCode === 27) {
			var getVal = parseInt($(this).val().trim());

			$(this).val(getVal);
			$(this).attr('value', getVal);

			getElementEachItem($(this));
			countEachItemPrice(getPriceReal, getPriceOld, getVal, objPriceReal, objPriceOld);
		}
		else{
			return false;
		}
	});

	$('.numShow input').keyup(function(e){
		var getVal = parseInt($(this).val().trim());
		var valDefault = 1;
		if(!$.isNumeric(getVal)){
			$(this).val(valDefault);
			$(this).attr('value', valDefault);

			getElementEachItem($(this));
			countEachItemPrice(getPriceReal, getPriceOld, valDefault, objPriceReal, objPriceOld);
		}
	});

	$('.numShow input').focusout(function(e){
		var getVal = parseInt($(this).val().trim());

		getElementEachItem($(this));
		countEachItemPrice(getPriceReal, getPriceOld, getVal, objPriceReal, objPriceOld);
	});
	// End button decrease, increase quantity product

	$('#cartview .dragbar').click(function(){

		if($('.dragpnl').is(":visible")){
			countItems($('.dragpnl .item'));

			$('#cartview').removeClass('opening').addClass('closing');
			$('.dragpnl').slideUp();
			$('#cartviewovl').removeClass('opening');

			$('.pnl .txt').addClass('hiden');
			$('.pnl .prods').removeClass('hiden');
		}
		else{
			$('#cartview').removeClass('closing').addClass('opening');
			$('.dragpnl').slideDown();
			$('#cartviewovl').addClass('opening');

			$('.pnl .txt').removeClass('hiden');
			$('.pnl .prods').addClass('hiden');
		}
	});

	$('#cartviewovl').click(function(){
		countItems($('.dragpnl .item'));

		$(this).removeClass('opening');
		$('#cartview').removeClass('opening').addClass('closing');
		$('.dragpnl').slideUp();
		$('#cartviewovl').removeClass('opening');

		$('.pnl .txt').addClass('hiden');
		$('.pnl .prods').removeClass('hiden');
	});

});

