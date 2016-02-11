//전역변수
/*var user_zodiac='1985';
var user_name='우상욱';
var user_zodi='소';*/

var user_zodiac;
var user_name;
var user_zodi;

//메시지 처리함수
function out_message(msg){
	if(!msg) msg='잘못된 접근입니다.';
	//alert(msg);
	var html = msg;
	html +='<img id="outof_message" src="./image/cross-octagon.png">';
	$('.floaty').empty();
	$('.floaty').append(html);
	$('.floaty').show('speed');
	$('#outof_message').click(function(){
		outof_message();
	});
}
function outof_message(){
	$('.floaty').hide(1000);
}


//로딩처리
 $(document).ready(function() {
  $('#load')
    .insertBefore('#detail')
    .ajaxStart(function() {
      $(this).show();
    }).ajaxStop(function() {
      $(this).hide();
    });
});

//이벤트 처리
$(document).ready(function(){	
	//alert('test');
	//handleRequest('sampleQuery');
	have_info();
	$('#start').click(function(){
		get_data();
	});
	$('#user_input').click(function(){
		cheak_input();
	});
	
	$('.comebackhome').click(function(){
		index_Cheack();
	});

	$('#comehome').click(function(){
		index_Cheack();
	});
	$('#modify_now').click(function(){
		change_user();
	});	

	index_Cheack();
	
});

//index화면 처리를 위해(사용자 정보가 있느냐 없느냐)
function index_Cheack(){	
	var zodiac = user_name;	
	if (zodiac==null)
	{
		not_info();
	}
	else
	{		
		have_info();
	}
}

//수정된 사용자 정보 저장
function change_user(){	
	var name = $('#name_in2').val();
	var year = $('#year_in2').val();
	if (!name||!year){ out_message('입력을 해주세요'); return false;}	//널값 검사	
	if (year.length!=4||!isNumber(year)){ out_message('생년의 형식이 잘못되었습니다.ex)1985'); return false;}//년도인지 검사(자릿수로 4자리가 아니면)
	samename(name);
	infomation_set(name,year);
	/*user_up(name,year);
	modify();*/
	//get_data();
}

//수정되는 값이 현재 아이디랑 다른가 판단
function samename(new_name){
	var old_name = user_name;
	if (old_name==user_name){
		//이름이 같으므로 업데이트 함수 호출
	}
	else{
		//return false;
		//다른 이름이므로 삭제후 재 등록
	}
}



//초기 화면에서 사용자 입력값을 받아서 검사
function cheak_input(){;
	var name = $('#name_in').val();
	var year = $('#year_in').val();	
	if (!name||!year){ out_message('입력을 해주세요'); return false;}	//널값 검사	
	if (year.length!=4||!isNumber(year)){ out_message('생년의 형식이 잘못되었습니다.ex)1985'); return false;}//년도인지 검사(자릿수로 4자리가 아니면)	
	
	infomation_set(name,year);
	//디비로 보내어서 등록.

	get_data();
}

//숫자인지검사
function isNumber(input) {
    var chars = "0123456789";
    return containsCharsOnly(input,chars);
}

function containsCharsOnly(input,chars) {    
	for (var inx = 0; inx < input.length; inx++) {
       if (chars.indexOf(input.charAt(inx)) == -1){
			return false;
	   }
    }
    return true;
}


//사용자 정보 전역변수에 넣기
function infomation_set(name,year){
	user_name = name;
	user_zodiac = year;
	print_zodiac();
}

//현재 있는 사용자 정보 빈값에 입력하기
function infomation_setting(){
	var name = user_name;
	var year = user_zodiac;	
	$('#name_in2').val(name);
	$('#year_in2').val(year);
}


//음악 듣기 test sample function
function listen(src){
	new Media('./midia/'+src).play();
}
function print_voice(obj){
	if(!obj.getAttribute('value')){return false;}	//검증
	var luck = obj.getAttribute('value');
	var src = obj.getAttribute('title');
	show_detail(luck,src);
}

//전역변수에 사용자의 띠를 넣어 준다.
function print_zodiac(){
	//alert(user_zodiac);
	var year = user_zodiac;
	year = (year-4)%12;	
	var zodiac_han;
	switch (year)
	{
		case 0:
			zodiac_han ='쥐';
			break;
		case 1:
			zodiac_han = '소';
			break;
		case 2:
			zodiac_han ='호랑이';
			break;
		case 3:
			zodiac_han ='토끼';
			break;
		case 4:
			zodiac_han ='용';
			break;
		case 5:
			zodiac_han ='뱀';
			break;
		case 6:
			zodiac_han ='말';
			break;
		case 7:
			zodiac_han ='양';
			break;
		case 8:
			zodiac_han ='원숭이';
			break;
		case 9:
			zodiac_han ='닭';
			break;
		case 10:
			zodiac_han ='개';
			break;
		case 11:
			zodiac_han ='돼지';
			break;		
	}
	user_zodi = zodiac_han;
}
//////////////////////////////화면 처리/////////////////////////////

//사용자 정보 있다.
function have_info(){
	$('#have_user').show();
	$('#not_user').hide();
	$('#change_user').hide();
	$('#choice_user').hide();
	$('#show_user').hide();
	$('#show_about').hide();
	//infomation_set();
}

//사용자 정보 없다
function not_info(){
	$('#have_user').hide();
	$('#not_user').show();
	$('#change_user').hide();
	$('#choice_user').hide();
	$('#show_user').hide();
	$('#show_about').hide();
}

//사용자 정보 수정
function change_info(){
	$('#have_user').hide();
	$('#not_user').hide();
	$('#change_user').show();
	$('#choice_user').hide();
	$('#show_user').hide();
	$('#show_about').hide();
	infomation_setting();
}

//사용자 운세 선택
function choice_forturn(){
	$('#have_user').hide();
	$('#not_user').hide();
	$('#change_user').hide();
	$('#choice_user').show();
	$('#show_user').hide();
	$('#show_about').hide();
}

//사용자 운세 출력
function show_fortune(){
	$('#have_user').hide();
	$('#not_user').hide();
	$('#change_user').hide();
	$('#choice_user').hide();
	$('#show_user').show();
	$('#show_about').hide();
}

//회사 정보 출력
function show_company(){
	$('#have_user').hide();
	$('#not_user').hide();
	$('#change_user').hide();
	$('#choice_user').hide();
	$('#show_user').hide();
	$('#show_about').show();
}

//보여주는 div 초기화 함수
function cleare_show(){
	$('#show_today').empty();
	$('#rcvData').empty();
	$('#detail').empty();
	$('#detail2').empty();	
	$('#detail_more').empty();
	$('#detail_manu').empty();
	$('#rcvData_more').empty();
	
}