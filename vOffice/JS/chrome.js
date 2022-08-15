class Chrome{

    constructor(options){
        // this.chrome = $('#'+options.selector);
        this.chrome = null;
        this.saveBtn = null;
        this.closeBtn = null;
        this.inputBox = null;
        this.focusFlag = false;
        this.selectorId = null;

        this.addressURL = null;
        this.iframeBody = null;
        this.tabBody = null;
        this.selectTabId = null;
        this.tabList = new Array(); //실제로 저장되는 데이터

        this.currentTab = null;
        this.tabPlusBtn = null;
        
        this.goBackBtn = null;
        this.goForwardBtn = null;
        this.goRefreshBtn = null;
        this.goHomeBtn = null;

        this.homeURL = "https://www.google.com/webhp?igu=1";

        this.resizeFlag = false;
        
        this.makeChrome(options);
        this.init(options);
        this.moveChromePosition(options.browserPosition);
        
    }

    init(options){
        console.log("chrome INIT 호출");
        this.chrome = $('#'+options.selector);
        console.log(this.chrome);
        this.selectorId = options.selector;
        console.log(this.selectorId);

        this.exitBtn = this.chrome.find('#exitBtn');
        this.closeBtn = this.chrome.find('#closeBtn');
        this.resizeBtn = this.chrome.find('#resizeBtn');

        this.addressURL = this.chrome.find('#browser_address');
        this.selectTabId = 0;

        this.iframeBody = this.chrome.find('#chromeIframeBox');
        this.tabBody = this.chrome.find('#targetTabBox');

        this.tabPlusBtn = this.chrome.find('#tabPlusBtn');

        this.goBackBtn = this.chrome.find('#goBackBtn');
        this.goForwardBtn = this.chrome.find('#goForwardBtn');
        this.goRefreshBtn = this.chrome.find('#goRefreshBtn');
        this.goHomeBtn = this.chrome.find('#goHomeBtn');

        this.selectTabId = this.getOnlyTabId();

        this.tabList.push(new Tab({
            chrome : this,
            addressURL : this.homeURL,
            tabTitle : 'Chrome',
            tabId : this.selectTabId
        }))

        this.currentTab = this.tabList[0];
        this.changeAddressUrl(this.homeURL);

        this.initEvent();

    }

    initEvent(){
        var _this = this;
        this.chrome.draggable({
            handle : '.top'
        });
        this.exitBtn.on('click', function(){ _this.closeProgram(); })
        this.closeBtn.on('click', function(){ _this.hideProgram(); })
        this.resizeBtn.on('click', function(){ _this.reSizeProgram(); })  
        this.tabPlusBtn.on('click', function(){ 
            console.log("tabPlusBtn 클릭");
            _this.addTab(); 
        }) 

        // 뒤로가기, 앞으로가기, 새로고침, 홈버튼 기능 추가
        this.goBackBtn.on('click', function(){
            console.log("goBackBtn 호출");
            _this.goBack();
        })
        this.goForwardBtn.on('click', function(){
            console.log("goForwardBtn 호출");
        })
        this.goRefreshBtn.on('click', function(){
            console.log("goRefreshBtn 호출");
            _this.redirectHome();
        })
        this.goHomeBtn.on('click', function(){
            console.log("goHomeBtn 호출");
            _this.redirectHome();
        })

        this.addressURL.on('keyup', function(e){
            if(e.keyCode == 13){
                console.log("tab KEYUP");
                let url = _this.addressURL.val().trim();
                if(url.length == 0) return;
                else{
                    _this.goBrowser(url);
                    // alert(_this.addressURL.val().trim().length);
                }
            }
        })
    }

    goBack(){
        console.log("goBack 호출");
        console.log(this.currentTab);
        console.log(this.currentTab.iframeBody.get(0).contentWindow);
        // this.currentTab.iframeBody.get(0).contentWindow.history.go(-1);
    }

    redirectHome(){
        console.log("redirectHOME 호출");
        this.currentTab.iframeBody.attr('src', this.currentTab.addressURL);
    }

    goBrowser(url){
        this.addressURL.val(url);
        console.log(this.currentTab);
        this.currentTab.iframeBody.attr('src', url);
        this.currentTab.addressURL = url;
    }

    getBrowserURL(){
        console.log("getBrowserURL 호출");
        // let id = this.currentTab.tabId;
        // let url = document.getElementById('iframe_'+id).contentWindow.location.href;
        // console.log(url);
    }
    reSizeProgram(){
        console.log("reSizeProgram 실행");
        if(!this.resizeFlag){
            this.chrome.animate({
                "width" : "100%",
                "height" : "102%",
                "left"  : 0,
                "top" : "0"
            });
            this.resizeFlag = true;
        }else{
            this.chrome.animate({
                "width" : "800",
                "height" : "600",
                "left"  : this.chrome.offset().left
            });

            this.resizeFlag = false;
        }
        
    }

    moveChromePosition(position){
        this.chrome.css({
            "left" : position,
            "top" : position / 4
        })
    }

    makeChrome(options){
        let dom = `
        <div class="chrome" id="${options.selector}">
            <div class="top">
                <div class="btns">
                    <span id="exitBtn"></span>
                    <span id="closeBtn"></span>
                    <span id="resizeBtn"></span>
                </div>
                <div class="tabs" id="chromeTabBox">
                    <div id="targetTabBox">

                    </div>
                    <!-- <div class="browserTabBox active" id="mainTabTitle">
                        <p class="tabTitle">google chrome</p>
                        <p class="tabCloseBtn">X</p>
                    </div> -->
                    <!-- <div class="browserTabBox">
                        <p class="tabTitle">업무용 메모PC</p>
                        <p class="tabCloseBtn">X</p>
                    </div> -->
                    <div class="tabPlusBtn">
                        <i class="fa fa-plus" id="tabPlusBtn"></i>
                    </div>
                </div>
            </div>
            <div class="addressBar">
                <div class="btns">
                    <span id="goBackBtn"><i class="fa fa-arrow-left"></i></span>
                    <span id="goForwardBtn"><i class="fa fa-arrow-right"></i></span>
                    <span id="goRefreshBtn"><i class="fa fa-repeat"></i></span>
                    <span id="goHomeBtn"><i class="fa fa-home"></i></span>
                </div>
                <div class="addressBox">
                    <input type="text" placeholder="URL 입력 주소창" id="browser_address">
                </div>
            </div>

            <div class="content" id="chromeIframeBox">
                <!-- <iframe src="https://www.google.com/webhp?igu=1" style="border: none;" id="browserFrame">
                    현재 사용중인 브라우저는 Iframe 요소를 지원하지 않습니다.
                </iframe>
                <iframe src="https://www.google.com/webhp?igu=1" style="border: none; display : none;" id="browserFrame2">
                    현재 사용중인 브라우저는 Iframe 요소를 지원하지 않습니다.
                </iframe> -->

            </div>
        </div>
        `;
        $('.palette').append(dom);
    }

    addTab(){
        console.log("addTab 호출");
        this.selectTabId = this.getOnlyTabId();

        let homeURL = this.homeURL;
        this.tabList.push(new Tab({
            chrome : this,
            addressURL : homeURL,
            tabTitle : 'Chrome',
            tabId : this.selectTabId
        }))

        this.changeTab(this.selectTabId);
        changeAddressUrl(homeURL);


    }

    changeTab(id){
        console.log("changeTab 호출 : "+id);

        this.tabList.forEach(tab =>{
            if(tab.tabId == id){
                tab.clicked();
                this.currnetTab = tab;
                this.addressURL.val(tab.addressURL);
            }else{
                tab.unClicked();
            }
        })
    }

    changeLastTab(tab){
        console.log("changeLastTab 호출");
        console.log(tab);
        console.log(this.tabList);
        this.tabList = this.tabList.filter(x => 
            tab.tabId !=  x.tabId
        );
        this.changeTab(this.tabList[(this.tabList.length - 1)].tabId);
    }

    changeAddressUrl(url){
        this.addressURL.val(url);
    }


    getOnlyTabId(){
        return `${Date.now()}`;
    }

    closeProgram(){
        this.chrome.remove();
    }

    hideProgram(){
        //숨기기
        this.chrome.stop().slideToggle();
    }

    resizeProgram(){
        console.log("resize 호출");
    }

    

}

class Tab{
    constructor(options){
        this.chrome = options.chrome;
        this.tab = null;
        
        this.addressURL = null;
        this.iframeBody = null;
        this.tabTitle = null;
        this.selected = false;
        this.tabList = new Array(); //실제로 저장되는 데이터
        this.tabId = null;
        this.tabTitleBtn = null;
        this.tabCloseBtn = null;

        this.init(options);
        
    }

    init(options){
        this.tabTitle = options.tabTitle;
        this.selected = options.selected;
        this.addressURL = options.addressURL;
        this.tabId = options.tabId;
        
        // 1. 먼저 DOM 생성
        this.makeTab(options);
        
        // 2. 변수에 할당
        this.initEvent(options);

    }

    initEvent(options){
        let _this = this;
        this.tab = $("#tab_"+options.tabId);
        this.iframeBody = $("#iframe_"+options.tabId);
        this.tabTitleBtn = this.tab.find('.tabTitle');
        this.tabCloseBtn = this.tab.find('.tabCloseBtn');

        this.tabTitleBtn.on('click', function(){
            console.log("tabTitleBtn 클릭");
            console.log(_this.tabId);
            // browser.changeTab(_this.tabId);
            _this.chrome.changeTab(_this.tabId);
        });

        this.tabCloseBtn.on('click', function(){
            console.log("tab Close Btn");
            _this.removeTab();
        })

        //내부 HTML 이동시 이벤트 감지
        // document.getElementById("iframe_"+options.tabId).onreadystatechange = this.catchIframeEvent;
        let iframe = document.getElementById("iframe_"+options.tabId);

        /* 
        여기부터 시작하자
        // 새로고침
        document.getElementById("map").contentDocument.location.reload();

        // 뒤로 가기
        document.getElementById("map").contentWindow.history.go(-1);
        */
  
    }

    catchIframeEvent(){
        console.log("catchIframeEVent호출");
        if (document.getElementById("iframe_"+this.tabId).document.readyState == "complete") {alert("Hello World!"); }

    }

    makeTab(options){
        console.log("makeBOX TAB 호출");
        let tab = `
        <div class="browserTabBox active" id="tab_${this.tabId}">
            <p class="tabTitle">${this.tabTitle}</p>
            <p class="tabCloseBtn">X</p>
        </div>
        `;

        let iframe = `<iframe src="${this.addressURL}" style="border: none;" id="iframe_${this.tabId}" onload="${this.chrome.getBrowserURL()}">
        현재 사용중인 브라우저는 Iframe 요소를 지원하지 않습니다.
        </iframe>`;
        console.log(this);
        console.log(this.chrome);

        this.chrome.tabBody.append(tab);
        this.chrome.iframeBody.append(iframe);
        
    }

    clicked(){
        //tab 선택
        this.tab.addClass('active');
        //Iframe visible
        this.iframeBody.css('display', 'block');
    }
    
    unClicked(){
        this.tab.removeClass('active');
        this.iframeBody.css('display', 'none');
    }

    removeTab(){
        console.log("removeTab 호출");
        // browser.changeLastTab(this);
        this.chrome.changeLastTab(this);
        this.tab.remove();
    }
}