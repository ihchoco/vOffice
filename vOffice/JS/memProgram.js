class Notepad{
    constructor(options){
        this.notepad = $('#notepad');
        this.text = options.text;
        this.date = options.date;
        
        //content에 들어갈 내용
        this.title = options.title; //아이콘 이름
        this.content = options.content;
        this.type = options.type; //icon , program
        this.size = options.size;

        //Program 버튼 셋팅
        this.saveBtn = null;
        this.closeBtn = null;

        this.init();
    }
    init(){
        this.closeBtn = this.notepad.find("#closeBtn"); //클로즈 할때 자동으로 저장?
        this.contentBox = this.notepad.find(".content"); //입력할때 길이 구하기
        console.log(this.contentBox);
        this.initEvent();

        //memo 안에 내용 정리
        this.notepad.find('#notepad-title').text(this.title);
    }
    initEvent(){
        var _this = this;
        //draggable 할수있게 해주자
        this.notepad.draggable({
            handle : '.top'
        });
        this.notepad.on('click', function(){
            //alert("hi");
        })
        this.closeBtn.on('click', function(){
            _this.closeProgram();
        })
        this.contentBox.on('keyup', function(){
            _this.showContentLength();
        })
    }
    closeProgram(){
        let content = this.contentBox.text();
        let date = new Date().toLocaleString();
        if(content.trim().length != 0){
            let inputTitle = prompt("제목을 입력해주세요", "default");
            console.log(inputTitle);
            if(inputTitle == undefined){
                //내용 초기화
                this.notepad.find('.content').text('');
                this.notepad.find('.length').text('');
                this.notepad.stop().slideToggle();
                return;
            }
            let newFile = new Box({
                selectorId : getOnlyId(),
                title : inputTitle,
                type : "txt",
                date : date,
                size : '2',
                content : content,
                selfFlag : 1
            });

            app.putFile(newFile);
            app.saveAllFile();
        }

        //내용 초기화
        this.notepad.find('.content').text('');
        this.notepad.find('.length').text('');
        //this.notepad.find('.date').text(app.getCurentTimeNow());

        //숨기기
        this.notepad.stop().slideToggle();
    }
    showContentLength(){
        let length = this.contentBox.text().length;
        console.log(length);
        this.notepad.find('.length').text(length);
    }

}
