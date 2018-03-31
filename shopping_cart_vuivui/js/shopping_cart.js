$(document).ready(function() {

	$('.gender label').click(function(){
		$('.gender label').removeClass('chon');
		$(this).addClass('chon');
	});

	$('#getbill').click(function(){
		$('.billinfo').fadeToggle('easing');
	});

	$('.couponlink').click(function(){
		$('#discountinput').fadeToggle('easing');
	});

	$('.numShow .minus').click(function(){
		var objMyself = $(this).parent('.numShow').children('input');
		var getVal = parseInt(objMyself.val().trim());
		if(getVal <= 1){
			return false;
		}

		getVal -= 1;
		objMyself.val(getVal);
		objMyself.attr('value', getVal);
	});

	$('.numShow .plus').click(function(){
		var objMyself = $(this).parent('.numShow').children('input');
		var getVal = parseInt(objMyself.val().trim());
		
		getVal += 1;
		objMyself.val(getVal);
		objMyself.attr('value', getVal);
	});

	$('.numShow input').keydown(function(e){
		if(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode === 8 || e.keyCode === 27) {
			var getVal = parseInt($(this).val().trim());

			$(this).val(getVal);
			$(this).attr('value', getVal);
		}
		else{
			return false;
		}
	});

	$('.numShow input').keyup(function(e){
		var getVal = parseInt($(this).val().trim());

		if(!$.isNumeric(getVal)){
			$(this).val(1);
			$(this).attr('value', 1);
		}
	});

	$('.select-comm .lblShow').click(function(){
		var getThisEle = $(this).parents('.select-comm').find('.listItem');

		if(getThisEle.is(":visible")){
			getThisEle.fadeOut(1);
		}
		else{
			$('.select-comm').find('.listItem').fadeOut(1);
			getThisEle.fadeIn(1);
		}
	});

	$('.listItem a').click(function(){
		var getText = $(this).text();
		$(this).parents('.select-comm').find('.lblShow').text(getText);
		$('.select-comm').find('.listItem').fadeOut(1);
	});

	$('#dist').click(function(){
		$('#listdist').fadeToggle(1);
	});

	$('#listdist a').click(function(){
		var getText = $(this).text();
		$('#dist label').text(getText);
	});
});

