class BackgrondSetting{
    constructor(options){
        console.log("background cons")
        this.backgrond = $('#setBackgroundBox');
        this.imgBoxList = null;
        this.mainURL = null;
        this.mainBackgroundObj = null;

        //Program 버튼 셋팅
        this.saveBtn = null;
        this.closeBtn = null;
        this.init(options);
        

    }
    init(options){
        console.log("background init");
        //this.mainURL = $(".container").attr('src');
        this.mainURL = $('.container').css('background-image');
        this.mainBackgroundObj = $('.container');
        console.log("MAIN URL : "+this.mainURL);
        this.exitBtn = this.backgrond.find("#exitBtn"); //클로즈 할때 자동으로 저장?
        this.closeBtn = this.backgrond.find("#closeBtn"); //클로즈 할때 자동으로 저장?

        console.log(options.url);
        if(options.url.length != 0){
            this.changeMainImage(options.url);
        }

        this.initEvent();
    }
    initEvent(){

        console.log("background init evemnt");
        var _this = this;
        //draggable 할수있게 해주자
        
        //IMGBOX 가져오기
        // var imgBox = this.background.children(".content").children(".right").find(".bgImgBox");
        // var imgBox = this.background.find(".bgImgBox");
        console.log("===============");
        console.log(this.backgrond.children('.content').find('.bgImgBox'));
        this.imgBoxList = this.backgrond.children('.content').children('.right').find('.bgImgBox');
        console.log(this.imgBoxList);
        
        this.backgrond.draggable({
            handle : '.top'
        });
        this.exitBtn.on('click', function(){
            _this.exitProgram();
        })
        this.closeBtn.on('click', function(){
            _this.closeProgram();
        })

        this.imgBoxList.on('click', function(){
            console.log(this);
            let url = $(this).find('img').attr('src');
            _this.changeMainImage(url);
            
        })
    }
    exitProgram(){
        console.log("exitBtn");
        //숨기기
        this.backgrond.stop().slideToggle();
    }
    closeProgram(){
        console.log("closeProgram");
        //숨기기
        this.backgrond.stop().slideToggle();
    }
    changeMainImage(url){
        console.log("changeMainImage");
        console.log(url);
        this.mainBackgroundObj.css('background-image', 'url(' + url + ')');
        $('#realBackgroundBox').find('img').attr('src', url);
        
        app.saveAllWithParam("backgroundURL", url);
    }

}