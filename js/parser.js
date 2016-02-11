function get_data(){
	choice_forturn();
	cleare_show();
	var url ='http://www.ekgib.com/rss/S1N27.xml';	//이건되는데 정보가 너무 없다.ㅡㅡ
	var zod = (user_zodiac-4)%12;	

	$.get(url,function(data){		
		$(data).find('item').each(function(index){			
			if (index==zod)
			{
				var $item;			
				if($(this).find('title'))	//title값이 있다면
				{
					$item = $(this).find('title');
					parsing_title($item);					
				}
				if ($(this).find('description'))	//descripttion값이 있다면
				{
					$item = $(this).find('description');
					parsing_description($item,zod);					
				}
			}
		});
		
	});
}

function parsing_title($title){
	var title = $title.text();
}

function parsing_description($description,num){
	print_index();
	print_img(num);
	//alert('tt');
	var description = $description.text();
	var array_data = description.split(':');	//split
	for (var i=1;i<array_data.length ; i++)
	{
		if (i==(array_data.length-1))
		{
			var list = array_data[i];
			print_luck(list,i);
		}
		else 
		{
			var list = array_data[i];
			var end = list.length;
			var start = (end - 3);
			list = list.slice(0,start);
			print_luck(list,i);
		}		
	}	
}

function print_index(){
	var today = get_date();
	var html = '<span class="graytitle">';
	html += today;
	html += '</span>';
	$('#show_today').append(html);
}

//show 화면의 띠별 그림 출력
function print_img(num){	
	var html = '<img src="./image/show/zodiac_'+num+'.gif">';
	html += '<span id="userspan">'+user_name+'</span><span id="userspan2">('+user_zodiac+')</span>';
	//html += +user_zodiac+'년 '+user_name+' '+user_zodi+'띠';
	$('#rcvData').append(html);
}

//show 화면의 띠별 운세 출력
function print_luck(luck,i){
	var title = set_voice(luck);	//음성의 src받아오기
	if (title){var html = '<li class="menu"><p class="text'+i+'" value="'+luck+'" title="'+title+'">';}
	else {var html = '<li class="menu"><p class="text'+i+'" value="'+luck+'">';}
	html += '빵상';
	html += '</p></li>';	
	if (i<3){
		$('#detail').append(html);	
	}
	else{
	$('#detail2').append(html);	
	}
	fortune_event(i);	
}

//만들어진 p에 클릭 이벤트를 주기 위해서
function fortune_event(i){
	$('.text'+i+'').click(function(){
		print_voice(this);
	});
}



//사용자의 선택후의 화면 제어
function show_detail(luck,src){
	show_fortune();
	cleare_show();
	print_front();
	var zod = (user_zodiac-4)%12;
	/*var html = '<p>';
	html += '<img src="./image/show/zodiac_'+zod+'.gif">';
	html += '</p>';*/
	var html = luck;	
	$('#detail_more').append(html);	
	if(src!=null){
		var html ="<li><a id='re_listen' title ='"+src+"' href='#'>다시듣기</a></li><li><a href='#' id='show_back'>뒤로</a></li>";
		$('#detail_manu').append(html);			
		add_event();
		listen(src);
	}	
}

function add_event(){
	$('#show_back').click(function(){
		get_data();
	});
	$('#re_listen').click(function(){
		listen(this.title);
	});
}

function print_front(){
	var today = get_date();	
	/*var html = user_name+'너의 ';
	html += today+'운세'*/
	var html = '우주신이 알려주는<br>';
	html += today+' '+user_name;
	html += '의 운세';
	$('#rcvData_more').append(html);
}

//get today_date
function get_date(){
	var arrDate = new Array();
	var dt = new Date();
	var date = dt.getDate();	//getdate
	var month = dt.getMonth()+1;	//getmonty
	var year = dt.getFullYear();	//getyear
	var today = year+'년 '+month+'월 '+date+'일';
	return today;
}






///////////////////////////////////////음성 데이터 분석 소스/////////////////////////////////
var very_good = 0;	//대길3
var good = 0;	//길14
var very_bed = 0;	//흉5
var so_good = 0;	//보통길14
var so_bed = 0;		//보통흉17
var undifind = 0;	//배수 대처5

//값을 초기화
function random(){	
	very_good = make_rand(2);
	good = make_rand(13);
	very_bed = make_rand(4);
	so_bed = make_rand(16);
	so_good = make_rand(13);
	undifind = make_rand(5);
}

//랜덤 생성
function make_rand(num){
	var result = Math.floor(Math.random() * num) + 1;
	return result;
}

//운세의 내용 파악하기
function set_voice(luck){
	random();	

	if(-1!=luck.indexOf("大吉")){
		very_good=very_good+1;
		if(very_good>3){very_good=1;}
		return 'very_good'+very_good+'.mp3';
	}
	if(-1!=luck.indexOf("吉")){
		good=good+1;
		if(good>14){good=1;}
		return 'good'+good+'.mp3';
	}
	if(-1!=luck.indexOf("凶")){
		very_bed=very_bed+1;
		if(very_bed>5){very_bed=1;}
		return 'very_bed'+very_bed+'.mp3';
	}
	if(check_so_bed('조심',luck)){return 'so_bed'+so_bed+'.mp3';}
	if(check_so_good('성공',luck)){return 'so_good'+so_good+'.mp3';}
	if(check_so_bed('불길',luck)){return 'so_bed'+so_bed+'.mp3';}
	if(check_so_good('능력',luck)){return 'so_good'+so_good+'.mp3';}	
	if(check_so_bed('불화',luck)){return 'so_bed'+so_bed+'.mp3';}
	if(check_so_good('이득',luck)){return 'so_good'+so_good+'.mp3';}
	if(check_so_bed('불리',luck)){return 'so_bed'+so_bed+'.mp3';}
	if(check_so_good('원만',luck)){return 'so_good'+so_good+'.mp3';}
	if(check_so_bed('문제',luck)){return 'so_bed'+so_bed+'.mp3';}
	if(check_so_good('화합',luck)){return 'so_good'+so_good+'.mp3';}	
	if(check_so_bed('손해',luck)){return 'so_bed'+so_bed+'.mp3';}	
	if(check_so_bed('유흥',luck)){return 'so_bed'+so_bed+'.mp3';}
	if(check_so_good('상승',luck)){return 'so_good'+so_good+'.mp3';}
	if(check_so_good('갈등',luck)){return 'so_good'+so_good+'.mp3';}
	if(check_so_good('단합',luck)){return 'so_good'+so_good+'.mp3';}	
	if(check_so_good('도움',luck)){return 'so_good'+so_good+'.mp3';}
	if(check_so_bed('투쟁',luck)){return 'so_bed'+so_bed+'.mp3';}
	if(check_so_bed('근심',luck)){return 'so_bed'+so_bed+'.mp3';}
	if(check_so_good('데이트',luck)){return 'so_good'+so_good+'.mp3';}
	if(check_so_good('합격',luck)){return 'so_good'+so_good+'.mp3';}
	if(check_so_good('해결',luck)){return 'so_good'+so_good+'.mp3';}
	if(check_so_bed('고민',luck)){return 'so_bed'+so_bed+'.mp3';}
	if(check_so_bed('지출',luck)){return 'so_bed'+so_bed+'.mp3';}	
	if(check_so_good('무난',luck)){return 'so_good'+so_good+'.mp3';}
	else {return 'unidentified'+undifind+'.mp3';}
	//else {return false}
	//return false;
}
//so_bed 확인
function check_so_bed(txt,luck){
	if(-1!=luck.indexOf(txt)){	
		so_bed=so_bed+1;
		if(so_bed>17){so_bed=1;}
		return true;		
	}
	return false;
}
//so_good 확인
function check_so_good(txt,luck){
	if(-1!=luck.indexOf(txt)){	
		so_good=so_good+1;
		if(so_good>14){so_good=1;}
		return true;		
	}
	return false;
}