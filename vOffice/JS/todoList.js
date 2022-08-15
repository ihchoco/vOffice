class TodoList{

    constructor(options){
        this.todoList = $('#'+options.selector);
        this.saveBtn = null;
        this.closeBtn = null;
        this.inputBox = null;
        this.focusFlag = false;

        this.todoListArray = null; //실제로 저장되는 데이터
        this.init(options);

    }

    init(options){

        this.exitBtn = this.todoList.find('#exitBtn');
        this.closeBtn = this.todoList.find('#closeBtn');
        this.inputBox = this.todoList.find('#todoInput');
        this.saveBtn = this.todoList.find('#todoSaveButton');
        this.content = this.todoList.find(".content");

        this.todoListArray = options.todoListArray || new Array();

        //todoList 데이터 받아서 새로 만들어주는 함수
        this.makeTodoList();
        this.initEvent();
    }

    initEvent(){
        var _this = this;
        this.todoList.draggable({
            handle : '.top'
        });
        this.exitBtn.on('click', function(){ _this.closeProgram(); })
        this.closeBtn.on('click', function(){ _this.closeProgram(); })
        this.saveBtn.on('click', function(){

            _this.insertTodoList();

        })
    }
    insertTodoList(){
        console.log("saveTodoList 호출");
        let text = this.inputBox.val();
        if(text.trim().length == 0){
            return;
        }
        console.log(text);
        let dateTime = app.getCurentTimeNow();
        console.log(dateTime);
        let todo = {
            'text' : text,
            'date' : dateTime,
            'id' : this.todoGetOnlyId(),
            'action' : 'false'
        }
        console.log(todo);
        this.todoListArray.push(todo);
        console.log(this.todoListArray);
        this.inputBox.val('');
        this.makeTodoList();
    }

    todoGetOnlyId(){
        return `TODO_${Date.now()}`;
    }

    makeTodoList(){
        console.log(this.todoListArray);
        if(this.todoListArray.length == 0){
            console.log("투두리스트 데이터 없음");
            let todo = $('<div class = "all-row">');
            //let checkBox = $('<div class = "checkbox"><i class="fa fa-check"></i></div>');
            let text = $('<div class="noTodoContent">해야할 일이 없습니다. 새로 등록하여 주세요.</div>');
            todo.append(text);
            this.content.html('');
            this.content.append(todo);
        }else{
            console.log("투두리스트 데이터 있음");
            //일단 content 내용 초기화
            this.content.html('');

            this.todoListArray.forEach(todo =>{
                console.log(todo);
                let todoBox;
                if(todo.action == "true"){
                    todoBox = $(`<div class = "row active" onclick="todoList.activeTodo('${todo.id}')">`);
                }else if(todo.action == "false"){
                    todoBox = $(`<div class = "row" onclick="todoList.activeTodo('${todo.id}')">`);
                }
                let checkBox = $('<div class = "checkbox"><i class="fa fa-check"></i></div>');
                let textBox = $('<div class = "todo">'+todo.text+'</div>');
                let etcBox = $(`<div class = "etc">
                                    <div>${todo.date}</div>
                                    <div onclick="todoList.removeTodo('${todo.id}')"><i class="fa fa-times"></i></div>
                                </div>`);

                todoBox.append(checkBox);
                todoBox.append(textBox);
                todoBox.append(etcBox);
                console.log(todoBox);
                this.content.append(todoBox);
            });
        }

        app.saveAllWithParam("todoList", this.todoListArray);
    }

    enterKeyUp(){
        console.log("set Event enter KEY UP");
        if(window.event.keyCode == 13){
            this.insertTodoList();
        }
    }

    closeProgram(){
        //숨기기
        this.todoList.stop().slideToggle();
    }

    activeTodo(id){
        console.log("activeTodo 호출");
        console.log(id);
        console.log(this.todoListArray);
        // this.todoListArray.forEach(todo =>{
        //     if(todo.id = id) todo.action = true;    
        // })
        for(let i = 0; i < this.todoListArray.length; i++){
            if(this.todoListArray[i].id == id){
            console.log("this.todoListArray[i].action : "+this.todoListArray[i].action);
                if(this.todoListArray[i].action == "true"){
                    this.todoListArray[i].action = "false";
                } 
                else if(this.todoListArray[i].action == "false"){
                    this.todoListArray[i].action = "true";
                } 
            }
        }
        console.log(this.todoListArray);
        this.makeTodoList();
    }

    removeTodo(id){
        console.log("removeTODO 호출");
        console.log(id);
        console.log(this.todoListArray);
        this.todoListArray = this.todoListArray.filter(todo =>
            todo.id != id
        )
        console.log(this.todoListArray);
        this.makeTodoList();
    }

}