class Chrome{

    constructor(options){
        this.chrome = $('#'+options.selector);
        this.saveBtn = null;
        this.closeBtn = null;
        this.inputBox = null;
        this.focusFlag = false;

        this.addressURL = null;
        this.iframeBody = null;

        this.tabList = new Array(); //실제로 저장되는 데이터
        
        this.init(options);
        
    }

    init(options){
        console.log("chrome INIT 호출");
        this.exitBtn = this.chrome.find('#exitBtn');
        this.closeBtn = this.chrome.find('#closeBtn');
        this.resizeBtn = this.chrome.find('#resizeBtn');

        this.content = this.chrome.find(".content");

        this.addressURL = this.chrome.find('#browser_address');
        this.iframeBody = this.chrome.find('#browserFrame');

        if(options.tabList != undefined && options.tabList.length != 0) this.tabList = options.tabList;
        console.log(this.tabList);
        //todoList 데이터 받아서 새로 만들어주는 함수
        //this.makeTodoList();
        this.initEvent();
        this.selectBrowser(this.tabList[0].id);
    }

    initEvent(){
        var _this = this;
        this.chrome.draggable({
            handle : '.top'
        });
        this.exitBtn.on('click', function(){ _this.closeProgram(); })
        this.closeBtn.on('click', function(){ _this.closeProgram(); })
        this.resizeBtn.on('click', function(){ _this.reSizeProgram(); })   
        this.addressURL.on('keyup', function(e){
            if(e.keyCode == 13){
                let url = _this.addressURL.val().trim();
                if(url.length == 0) return;
                else{
                    _this.goBrowser(url);
                }
                //alert(this.addressURL.val().trim().length);
            }
        })
    }

    closeProgram(){
        //숨기기
        this.chrome.stop().slideToggle();
    }

    resizeProgram(){
        console.log("resize 호출");
    }

    selectBrowser(number){

        console.log("selectBrowser 호출");
        console.log(this.tabList);
        let title = this.tabList[number].title;
        let url = this.tabList[number].url;
        
        console.log(url);
        console.log(title);

        let t_title = this.chrome.find('.tabTitle');
        
        console.log(t_title);

        t_title[number].innerHTML = title;
        
        this.addressURL.val(url);
    }

    goBrowser(url){
        this.iframeBody.attr('src', url);
        alert(this.iframeBody.contents());
    }
}

class Tab{
    constructor(options){
        this.tab = $('#'+options.selector);
        
        this.addressURL = null;
        this.iframeBody = null;
        this.tabTitle = null;
        this.selected = false;
        this.tabList = new Array(); //실제로 저장되는 데이터
        this.tabId = null;

        this.init(options);
        
    }

    init(options){
        this.tabTitle = options.title;
        this.selected = options.selected;
        this.addressURL = options.addressURL;
        this.tabId = options.tabId;
        this.initEvent();
        this.makeTab(options);

    }

    initEvent(){

    }

    makeTab(options){
        let tab = `
        <div class="browserTabBox active" id="tab_${this.tabId}">
            <p class="tabTitle">${this.tabTitle}</p>
            <p class="tabCloseBtn">X</p>
        </div>
        `;
        let iframe = `<iframe src="${this.addressURL}" style="border: none; display : none;" id="iframe_${this.tabId}">
                        현재 사용중인 브라우저는 Iframe 요소를 지원하지 않습니다.
                      </iframe>`;
        
    }
}