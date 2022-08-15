class Calculator{
    constructor(options){
        this.calculator = $('#calculator');
        this.text = options.text;
        this.date = options.date;
        
        //content에 들어갈 내용
        this.title = options.title; //아이콘 이름
        this.content = options.content;
        this.type = options.type; //icon , program
        this.size = options.size;

        //Program 버튼 셋팅
        this.closeBtn = null;

        //계산기 전용
        this.content = this.calculator.find('.content');
        this.buttons = this.calculator.children('.bottom').find('span');
        this.leftNum = '';
        this.rightNum = '';
        this.inputNumberFlag = 'left';
        this.tempNum = '';
        this.showNum = '';
        this.operator = '';
        this.operatorFlag = false;
        
        this.focusFlag = false;
        
        //사이즈 조절 
        this.sizeFlag = false;

        this.init();
    }
    init(){
        this.exitBtn = this.calculator.find("#exitBtn");
        this.closeBtn = this.calculator.find("#closeBtn");
        this.initEvent();
    }
    initEvent(){
        var _this = this;
        //draggable 할수있게 해주자
        this.calculator.draggable({
            handle : '.top'
        });
        this.exitBtn.on('click', function(){
            _this.exitProgram();
        })
        this.closeBtn.on('click', function(){
            _this.closeProgram();
        })
        this.buttons.on('click', function(){
            _this.clickButton($(this)[0].outerText);
        })
        this.calculator.on('click', function(){
            _this.calculator.toggleClass('focus');
            _this.focusFlag = !_this.focusFlag;
            console.log(_this.focusFlag);
        })
        this.calculator.find("#resizeBtn").on('click', function(){
            if(_this.sizeFlag){
                _this.smallSize();
            }else{
                _this.fullSize();
            }
        })
        window.addEventListener('keydown', function(e){
            //console.log(e.key);
            if(_this.focusFlag){
                let code = e.keyCode;

                if((code>47 && code < 58) || e.ctrlKey || e.altKey || code == 8 || code == 9 || code ==46 || e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/' || e.key == 'Enter' || e.key == 'Escape' || e.key == '.'){
                    _this.clickButton(e.key);     
                    return;
                }
            }
        })

    }
    closeProgram(){
        //숨기기
        this.calculator.stop().slideToggle();
    }
    clickButton(param){
        let input = param;
        

        if(isNaN(input) && input != '.'){
            this.inputNotNumber(input);
        }else{
            //숫자가 들어올때
            if(this.inputNumberFlag == 'left'){
                this.leftNum += input;
            }else{
                if(this.operator == "") return;
                this.rightNum += input;
            }
        }
        this.showNumber();
    }
    showNumber(){
        console.log(this.leftNum + " " + this.operator+" "+this.rightNum +"");
        this.content.text(this.leftNum + " " + this.operator+" "+this.rightNum +"");
        if(this.leftNum == ''){
            this.content.text('0');
        }
    }
   

    inputNotNumber(input){
        // if(this.operator != '' && this.leftNum != ''){
        //     console.log("1");
        //     this.operator = input;
        //     return;
        // }else 
        if(this.leftNum == ''){
            return;
        }
        if(this.leftNum != '' && this.rightNum != ''){
            console.log("2");
            this.runCalculator();
        }
         //숫자가 아닌경우(연산자가 들어올때)
         switch (input){
            case '+' : this.operator = '+'; break;
            case '-' : this.operator = '-'; break;
            case 'x' : this.operator = '*'; break;
            case '*' : this.operator = '*'; break;
            case '÷' : this.operator = '÷'; break;
            case '/' : this.operator = '÷'; break;
            case 'C' : this.operator=''; this.leftNum=''; this.rightNum=''; this.inputNumberFlag = 'left'; return; 
            case 'Escape' : this.inputNumberFlag = 'left'; this.operator=''; this.leftNum=''; this.rightNum=''; return; 
            case '.' : return;
            case '+/-' : return;
            case '%' : return;
                // if(this.inputNumberFlag == 'left')
                //     this.leftNum += '.';
                // else
                //     this.rightNum += '.';
                break;
            // case '=' : this.runCalculator(); break;
        }
        if(this.input != '.') this.inputNumberFlag = 'right';
        if(input == 'C' || input == 'Escape') this.inputNumberFlag = 'left';
    }

    runCalculator(){
        console.log('runCAl');
        let number1 = Number(this.leftNum);
        let number2 = Number(this.rightNum);
        let answer = null;
        switch (this.operator){
            case '+' : answer = number1 + number2; console.log("+"); break;
            case '-' : answer = number1 - number2; console.log("-"); break;
            case '*' : answer = number1 * number2; console.log("x"); break;
            case '÷' : answer = number1 / number2; console.log("÷"); break;
            case 'C' : this.leftNum = ''; this.rightNum =''; this.operator ='';
            case '=' : this.runCalculator; break;
            break;
        }
        this.operator = '';
        this.inputNumberFlag = 'left';
        this.leftNum = answer;
        this.rightNum = '';
        this.content.text(answer);
    }

    fullSize(){
        console.log("fullsize 호출");
        this.calculator.animate({
            "width" : "45%",
            "left"  : this.calculator.offset().left - 100
        })
        this.sizeFlag = true;
    }

    smallSize(){
        console.log("smallsize 호출");
        this.calculator.animate({
            "width" : "25%",
            "left"  : this.calculator.offset().left + 100
        })
        this.sizeFlag = false;
    }

    exitProgram(){
        console.log("exitProgram 호출");
        this.leftNum = '';
        this.rightNum = '';
        this.inputNumberFlag = 'left';
        this.tempNum = '';
        this.showNum = '';
        this.operator = '';
        this.operatorFlag = false;
        
        this.focusFlag = false;
        this.calculator.removeClass('focus');

        //사이즈 조절 
        this.sizeFlag = false;

        this.content.text(0);


        this.calculator.css({
            "display" : "none",
            "top" : "10",
            "left" : "60%",
            "width" : "25%"
        });
    }
    
}