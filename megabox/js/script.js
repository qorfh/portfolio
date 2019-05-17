$(document).ready(function(){
	var dot = '';
	var rating='';
	var txt = '';
	var id;
	var name;
	var price;
	var age;
	var img;
	var date;
	var type;
	var html='';
	var spanTag='';

	
	var movies = [
			{ "id":1, "type":1, "name":"어벤져스: 엔드게임", "age":12, "img":"m_1", "date":"2019-4-23"},
            { "id":2, "type":1, "name":"나의 특별한 형제", "age":12, "img":"m_2"},
            { "id":3, "type":1, "name":"명탐정 피카츄", "age":"_all", "img":"m_3"},
            { "id":4, "type":1, "name":"(더빙) 뽀로로 극장판 보물섬 대모험", "age":"_all", "img":"m_4"},
            { "id":5, "type":2, "name":"어벤져스: 엔드게임", "age":12, "img":"m_1"},
            { "id":6, "type":2, "name":"[응원상영] 킹 오브 프리즘 -샤이니 세븐 스타즈- Ⅲ 레오x유우x알렉", "age":12, "img":"m_5"},
            { "id":7, "type":2, "name":"미스 스티븐스", "age":15, "img":"m_6"},
            { "id":8, "type":2, "name":"굿바이 마이 러브NK: 붉은 청춘", "age":15, "img":"m_7"},
            { "id":9, "type":3, "name":"[GET9] 플로리다 프로젝트", "age":12, "img":"m_8"},
            { "id":10, "type":3, "name":"명탐정 피카츄", "age":"_all", "img":"m_3"},
            { "id":11, "type":3, "name":"걸캅스", "age":15, "img":"m_9"},
            { "id":12, "type":3, "name":"라플라스의 마녀", "age":15, "img":"m_10"},
            { "id":13, "type":4, "name":"[라이브뷰잉] 아이돌 마스터 Side M 4th 스테이지 ~TR", "age":12, "img":"m_11"},
            { "id":14, "type":4, "name":"[오페라] 마술피리", "age":15, "img":"m_12"},
            { "id":15, "type":4, "name":"안도 타다오", "age":"_all", "img":"m_13"},
            { "id":16, "type":4, "name":"미스 스티븐스", "age":12, "img":"m_6"}
		];

	// slide dot추가
    $('.slides').each(function(){
        dot += "<a href='#'></a>";
    });

    $('.slide_dot').html(dot);

	activeDot($slideDot, 0);
	activeDot($eDot, 0);
    startTimer();
    eStartTimer();

     $('.eveSlides').each(function(i){
        $(this).css({ left : 100 * i +'%' });
    });

    
    // grand_opening scroll event
    var top = $('#grand_opening').offset().top;
	//console.log(top); //2322
	$(window).scroll(function(){
		var value = $(this).scrollTop();
		var x = value-top;
		//console.log(value+","+x);
		if(value > 1440){
			$('#grand_opening').css('background-position-y', x+"px");
		}
		
	})

	

	// 별점 hover
	$(document).on({
        mouseenter: function () {
				var index = $(this).index() + 1;
				var $this = $(this).parent().parent().children('ul');
				$(this).parent().children('span').removeClass('on');
				$(this).addClass('on').prevAll('span').addClass('on');

				$this.find('li').css({display:'none'});
				$this.find('li').eq(index).css({display:"block"});
        },
        mouseleave: function () {
				$(this).parent().children('span').removeClass('on');
				var $this = $(this).parent().parent().children('ul');
				$this.find('li').css({display:'none'});
				$this.find('li').eq(0).css({display:"block"});
        }
    }, ".starRev span");

    // movie list_title
	$(document).on('click', '.list_title .list_menu', function(e){
		e.preventDefault();
		$('.list_title li').removeClass('active');
		$(this).addClass('active');
		var index = $(this).index()+1;
		console.log($(this).index())
        setMovie(index);
	});
	setMovie(1);

	function setMovie(type){
		html = '';
		txt = '';
		for(var i in movies){
			console.log(i);
			if(movies[i].type == type){

				name = movies[i].name;
				id = movies[i].id;
				age = movies[i].age;
				img = movies[i].img;
				if(type == 1){
					spanTag =  `<span class="box_office_no">`+id+`</span>`
				} else{
					spanTag = '';
				}
				txt = 
					`<li class='movie'>
                        <figure>
                            <img src='img/`+img+`.jpg' alt="`+name+`">
                        </figure>
                        <figcaption>
                            <span class="ir_su movie_age`+age+`">`+age+`세관람가</span>
                            <a href="#" title=" `+name+` 영화 상세보기">`+name+`</a>
                            <button type="button" class="movie_btn detail">상세정보</button>
                            <button type="button" class="movie_btn reserv">예매하기</button>
                        </figcaption>`+spanTag+`
                        <div class="special_mark">
                            <i class="icon m2">m2</i>
                            <i class="icon boutique">boutique</i>
                        </div>
                        <div class="flip">
							<div class="starRev">
								<span class="starR">별점 1</span>
								<span class="starR">별점 2</span>
								<span class="starR">별점 3</span>
								<span class="starR">별점 4</span>
								<span class="starR">별점 5</span>
							</div>  
							<ul class="comment">
								<li>평점을 입력해주세요</li>
								<li>괜히 봤어요</li>
								<li>기대하진 말아요</li>
								<li>무난했어요</li>
								<li>기대해도 좋아요!</li>
								<li>너무 멋진 영화였어요!</li>
							</ul>
							<div class="heart"></div>
					  	</div>
					  	<input class="movie_id" type="hidden" value="`+id+`">
                    </li>`;
                html = html + txt;
			}
		}
		$(".movie_list").html(html);

		var movie_id;

        $(document).on('click', '.movie', function(){
        	movie_id = $(this).children(".movie_id")[0].value;
        	window.location = "detail.html?movie_id="+movie_id;
        });
	}

});

var totalSlide = $('.slides').length;
var currentPage = 0;
var evePage = 0;
var timer, eTimer;
var $slideDot = $('.slide_dot');
var $eDot = $('.e_dot');

$(document).on('click','.next', function(){
	gotoSlide();
})
$(document).on('click','.prev', function(){
	currentPage--;
	currentPage = currentPage == -1 ? currentPage = totalSlide-1 : currentPage;
	$('.slides').removeClass('on').eq(currentPage).addClass('on');
	activeDot($slideDot,currentPage);
})

function gotoSlide(){
	currentPage++;
	currentPage = currentPage % totalSlide;
    $('.slides').removeClass('on').eq(currentPage).addClass('on');
    activeDot($slideDot,currentPage);
}

// dot 활성화 
function activeDot(element, index){
	element.find('a').removeClass('active').eq(index).addClass('active');
}


//event_slide
function eveSlide(){
	activeDot($eDot, evePage);
 	$('.eveSlide_img').animate({ left: -100 * evePage+'%' },300);
 	evePage ++;
 	evePage = evePage % $('.eveSlides').length;
}

// 타이머
function stopTimer(element){
    clearInterval(element);
}

function startTimer(){
    timer = setInterval(function(){
        gotoSlide()
    },3000);
};
function eStartTimer(){
	eTimer = setInterval(function(){
        eveSlide();
    },2000);
}

$(document).on('click','.controls a',function(){
	if( $(this).hasClass('auto')){
		$('.auto').removeClass('auto').addClass('pause');
		stopTimer(timer);
	} else {
		$('.pause').removeClass('pause').addClass('auto');
		startTimer();
	}
})



// dot 누른 화면으로 이동
$(document).on('click','.slide_dot a', function(){
	var index = $(this).index();
	$('.slides').removeClass('on').eq(index).addClass('on');
	activeDot($slideDot,index);
})
// e_dot 누른 화면으로 이동
$(document).on('click','.e_dot a', function(e){
	e.preventDefault();
	var index = $(this).index();
	$('.eveSlide_img').animate({ left: -100 * index+'%' },300);
	activeDot($eDot, index);
})

$(document).on('click','.e_controls a',function(e){
	e.preventDefault();
	if( $(this).hasClass('e_auto')){
		$('.e_auto').removeClass('e_auto').addClass('e_pause');
		stopTimer(eTimer);
	} else {
		$('.e_pause').removeClass('e_pause').addClass('e_auto');
		eStartTimer();
	}
})

// m-nav open/close
$(document).on('click', '.is-open', function(e){
	console.log('click')
	e.preventDefault();

	$('.m-nav').css({display:'block'});
	$('.m-nav').addClass('is-active');
})

$(document).on('click', '.is-close-menu', function(e){
	console.log('click')
	e.preventDefault();

	$('.m-nav').css({display:'none'});
	$('.m-nav').removeClass('is-active');
})


// notice_tab-menu
$(document).on('click', '.notice li', function(e){
	console.log('click')
	e.preventDefault();

	if( !$(this).hasClass('on') ){
		$('.notice li').removeClass('on');
		$(this).addClass('on');
	}
})