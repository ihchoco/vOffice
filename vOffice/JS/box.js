// var superTrashBin = new Array(); //휴지통 배열
// DOC 프로그램 실행


function Box(options){
    // BOX 기본정보 초기값 셋팅
    this.box = null;
    this.width = null;
    this.height = null;
    this.text = null;
    this.x = null;
    this.y = null;
    this.backgroundColor = null;
    this.color = null;
    this.borderColor = null;
    this.title = null; //아이콘 이름
    this.type = null; //icon , program
    this.menuItems = null;
    this.selectorId = null;
    this.size = null;
    this.content = null;
    this.date = null;
    this.selfFlag = null;

    //BOX 기능을 위한 초기값 셋팅
    this.moveToTrashBinBtn = null;
    this.copyFileBtn = null;
    this.showInfoBtn = null;
    this.runProgramBtn = null;

    // //console.log(options);
    this.optionSet(options);
    //HTML DOM을 먼저 동적생성하고 붙여줘야 정상동작 한다.
    this.makeBox(); //HTML DOM 만들기
    this.init(options);
}

Box.prototype.optionSet = function(options){
    this.selectorId = options.selectorId;
    this.width = options.width;
    this.height = options.height;
    this.text = options.text;
    this.x = options.x;
    this.y = options.y;
    this.backgroundColor = options.backgroundColor;
    this.color = options.color;
    this.borderColor = options.borderColor;
    this.title = options.title;
    this.type = options.type;
    this.size = options.size;
    this.content = options.content;
    this.date = options.date;
    this.selfFlag = options.selfFlag;

    //showInfo 붙이기
    this.menuItems = [
        {
            'id' : 'fileOpen',
            'txt' : '파일 열기'
        },
        {
            'id' : 'copyFileBtn',
            'txt' : '파일 복사하기'
        },
        {
            'id' : 'trashBinBtn',
            'txt' : '휴지통으로 이동하기'
        },
        {
            'id' : 'showInfoBtn',
            'txt' : '속 성'
        }
    ];
}

Box.prototype.init = function(options){
    console.log("BOX init 호출");
    // BOX 기본정보 셋팅
    this.box = $("#"+options.selectorId);
    // //console.log(this.box);
    // BOX 기능버튼 설정
    this.runProgramBtn = this.box.find("#fileOpen");
    this.moveToTrashBinBtn = this.box.find("#trashBinBtn");
    this.copyFileBtn = this.box.find("#copyFileBtn");
    this.showInfoBtn = this.box.find("#showInfoBtn");

    
    this.initEvent();
}

Box.prototype.makeBox = function(){
    // option으로 받은 정보를 이용해서 icon을 만들어서 붙여주는곳
    // //console.log("makeBox 호출");
    
    let box = $(`<div id='${this.selectorId}' class='box'></div>`);
    let iconImage = $(`<div class='iconImage'><img src='../Image/file.png' alt='파일 아이콘'></div>`);
    let titleText = $(`<span class="boxTitle">${this.title}.${this.type}</span>`);
    box.append(iconImage);
    box.append(titleText);

    
    let infoBoxContainer = $('<div class="infoBoxContainer"></div>');
    let infoBox = $(`<div id='info_${this.selectorId}' class='infoBox'></div>`);
    for(var i = 0; i < this.menuItems.length; i++){
        infoBox.append(`<div class='info' id='${this.menuItems[i].id}'>${this.menuItems[i].txt}</div>`);
    }
    infoBoxContainer.append(infoBox);

    //만든 Box에 infoBox 붙이기
    box.append(infoBoxContainer);
    $('.palette').append(box);
    
}

Box.prototype.initEvent = function(){
    var _this = this;
    // //console.log("initEvent 호출");
    //console.log(this);
    
    // box 클릭 이벤트 연결
    this.box.on('click', function(){
        _this.clickBox();
        _this.toggleInfoBox();
        return false;
    })
    
    // box drag 이벤트 연결
    // this.box.draggable();
    
    //console.log(this.moveToTrashBinBtn);
    // 휴지통 이동버튼 기능 연결
    this.moveToTrashBinBtn.on('click', function(){
        _this.moveToTrashBin();
        $('.infoBox').removeClass('show');
    })

    this.runProgramBtn.on('click', function(){
        console.log("여기 클릭");
        _this.runProgram();
        $('.infoBox').removeClass('show');
        
    })

}

// 객체 기능연결 모음
Box.prototype.clickBox = function(){
    console.log("clickBox 호출");
    this.box.toggleClass('click');
    
}

Box.prototype.toggleInfoBox = function(){
    //console.log("toggleInfoBox 호출");
    $('.infoBox').removeClass('show');
    $('.box').removeClass('click');
    this.box.find(`#info_${this.selectorId}`).toggleClass('show');
}

Box.prototype.moveToTrashBin = function(){
    // let trashBinFlag = confirm("휴지통으로 파일 이동");
    // if(trashBinFlag){
        console.log("moveToTrashBin 호출-box");
        superTrashBin.push(this);
        //console.log(superTrashBin);
        trashBin.refresh();
        this.box.remove();
        console.log(this);
        console.log(this.selectorId);

        console.log(app.fileList);
        //여기서 바탕화면에 있는 박스 저장하는 부분 삭제처리를 위한 로직
        app.fileList = app.fileList.filter(box =>
            box.selectorId != this.selectorId    
        )
        app.saveAllFile();
    // }
}

Box.prototype.runProgram = function(){
    //console.log("!!!! newProgram 실행");
    //console.log(this.box);
    new Program({
        selectorId : `program_${this.type}_${this.selectorId}`,
        title : this.title,
        type : this.type,
        content : this.content,
        originObj : this,
        size : this.size,
        date : this.date,
        selfFlag : 1
    });
}

//Palette 전체 배경화면
function Palette(options){
    this.palette = null;
    this.showFlag = false;
    this.init(options);
}

Palette.prototype.init = function(options){
    //console.log("palette init 호출");

    this.palette = $(`.${options.selectorId}`);
    //console.log(this.palette);
    this.initEvent();
}

Palette.prototype.initEvent = function(){
    //console.log("palette initEvent 호출");
    var _this = this;
    this.palette.on('click', function(e){  
        console.log("right");
        _this.showFlag = true;
        _this.toggleMenu(e);
        _this.clickPalette();
    })
    this.palette.on('contextmenu', function(e){
        console.log("left"); //여기서 배경화면 우클릭시 설정탭 메뉴 호출하는걸로 변경
        _this.showFlag = false;
        _this.toggleMenu(e);
        _this.clickPalette();
    })
}

Palette.prototype.toggleMenu = function(e){
    console.log(this.showFlag);
    console.log(e.clientX);
    console.log(e.clientY);
    if(!this.showFlag){
        $("#backgroundMenuBox").css({
            'display' : 'block',
            'left' : e.clientX - 10,
            'top' : e.clientY - 55
        });
    }else{
        $("#backgroundMenuBox").css({
            'display' : 'none'
        });
    }
}

Palette.prototype.clickPalette = function(){
    //console.log("clickPalette 호출");
    $('.infoBox').removeClass('show');
    // $('#calculator').removeClass('focus');
}

// program(실행화면 만들기)
function Program(options){
    //console.log("program 생성자 호출");
    this.program = null; //실행할 프로그램 화면
    this.width = null;
    this.height = null;
    this.text = null;
    this.x = null;
    this.y = null;
    this.backgroundColor = null;
    this.color = null;
    this.borderColor = null;
    this.menuItems = null;
    this.selectorId = null;
    this.date = null;
    this.originObj = null; //핵심 객체(부모)
    this.selfFlag = 1; //0. 그냥 프로그램 실행 , 1. 텍스트 파일로 오픈한 경우

    //content에 들어갈 내용
    this.title = null; //아이콘 이름
    this.content = null;
    this.type = null; //icon , program
    this.size = null;

    //Program 버튼 셋팅
    this.saveBtn = null;
    this.closeBtn = null;

    this.optionSet(options);
    this.makeProgram(); //HTML DOM 만들기
    this.init(options);
    
}

Program.prototype.optionSet = function(options){
    this.selectorId = options.selectorId;
    this.width = options.width;
    this.height = options.height;
    this.text = options.text;
    this.x = options.x;
    this.y = options.y;
    this.backgroundColor = options.backgroundColor;
    this.color = options.color;
    this.borderColor = options.borderColor;
    this.date = options.date;
    this.originObj = options.originObj; //부모 객체

    this.title = options.title;
    this.content = options.content;
    this.type = options.type;
    this.size = options.size;
    this.selfFlag = options.selfFlag;

    //console.log("====프로그램=====");
    //console.log(this.originalObjectId);
}

Program.prototype.makeProgram = function(){
    // option으로 받은 정보를 이용해서 icon을 만들어서 붙여주는곳
    //console.log("makeBox 호출");

    let program = $(`<div id='${this.selectorId}' class='notepad viewer'></div>`);
    let top = $(`<div class='top'><span>${this.title}</span><span id='closeBtn'>X</span></div>`);
    let content = $(`<div class='content' contenteditable="true">${this.content}</div>`);
    let bottom = $(`<div class='bottom'></div>`);
    let bottomSpan = $(`<span>length : <span class='length'>${this.size}</span> / </span><span>last-date : ${this.date}</span>`);

    //let bottom = $(`<div class='bottom><span>length : ${this.size}byte </span>
    //<span>last-date : ${this.date}</span></div>`);

    program.append(top);
    program.append(content);
    program.append(bottom);
    
    bottom.append(bottomSpan);

    program.append(bottom);
    
    //console.log(top);
    //console.log(content);
    //console.log(bottom);
    //console.log(bottomSpan);
    //console.log("palete");
    //console.log($('.palette'));
    //Palette에 만든 DOM 붙이기
    $('.palette').append(program);

}

Program.prototype.init = function(options){
    this.program = $(`#${options.selectorId}`);
    this.contentBox = this.program.find(".content"); //입력할때 길이 구하기

    //console.log(this.box);
    // BOX 기능버튼 설정
    // this.saveBtn = this.box.find("#saveBtn"); 
    this.closeBtn = this.program.find("#closeBtn"); //클로즈 할때 자동으로 저장?
    //console.log("closeBtn");
    //console.log(this.closeBtn);
    this.initEvent();
}

Program.prototype.initEvent = function(options){
    var _this = this;
    
    //draggable 할수있게 해주자
    this.program.draggable({
        handle : '.top'
    });
    this.closeBtn.on('click', function(){
        _this.closeProgram();
    })
    this.contentBox.on('keyup', function(){
        _this.showContentLength();
    })
}

Program.prototype.showContentLength = function(){
    let length = this.contentBox.text().length;
    console.log(length);
    this.program.find('.length').text(length);
}


Program.prototype.closeProgram = function(){

    //console.log("closeProgram");
    // 제거하기전 정보를 다시 BOX객체에 던져주기
    //console.log(this.originObj);

    let content = this.program.find('.content').text();
    console.log(content);
    let date = new Date().toLocaleString();
    console.log(date);
    let legnth = this.program.find('.length').text().length;
    console.log(length);
    
    //원래 내용 vs 수정된 내용
    let originContent = this.originObj.content;
    let updateContent = content;

    //닫기 전 (수정된) 정보 전달하기 - 원래 파일한테 전달(주소 참조로 데이터 전달)
    this.originObj.content = content;
    this.originObj.date = date;
    this.originObj.size = length;
    ////console.log(this.orginOBj);
    //새로운 파일 바탕화면에 생성해주고 삭제
    this.program.remove(); //DOM에서 제거하기
    
    // if(originContent != updateContent){
        // ==다른이름으로 저장 기능==
        // let inputTitle = prompt("제목을 입력해주세요", "default");
        // new Box({
        //     selectorId : getOnlyId(),
        //     title : inputTitle,
        //     type : "txt",
        //     date : date,
        //     size : '2',
        //     content : content,
        //     selfFlag : 1
        // })
    // }else{
    // }

    
}


// 휴지통 만들기
// 이거 위에부터 다 클래스 ES6로 바꾸고 상속 개념사용해서 만들자


