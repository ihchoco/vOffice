let app = {
    fileList : new Array(), // 여기에 모든 파일을 담아서 관리한다.
    // boxObjList : new Array(), //여기에 바탕화면에 있는 모든 배열정보를 관리한다.
    init : function(){ //최초 수행할 함수 모두 등록
        
        let _this = this;
        window.oncontextmenu = function () {
            return false;
        };

        //BackgroundInfoBox 이벤트 등록
        $("#changeBackground").click(function(){
            // alert("change");
            $("#setBackgroundBox").css({
                'display' : 'block'
            })
        })
        $("#clearAllFile").click(function(){
            // alert("clearAllFile");
            //console.log("clearAllFile");
            //console.log(window.boxObjList);
            
            window.boxObjList.forEach(box =>
                box.moveToTrashBin()    
            )

        })
        $("#resetBtn").click(function(){
            // alert("clearAllFile");
            //console.log("clearAllFile");
            //console.log(window.boxObjList);
            
            _this.removeAllBoxList();
            _this.clearLocalStorage(); //저장된 데이터 모두삭제
            location.reload();
        })
        
    },
    getAllFile : function(param){
        //console.log("getAllFile 호출");
        let files = window.localStorage.getItem(param);
        // //console.log(files);
        if(files != undefined){
            let parseFiles = JSON.parse(files);
            this.fileList = parseFiles;
        }else{
            //console.log("저장된 값이 없습니다.")
        }
        //console.log(this.fileList);

        return this.fileList;
    },
    getFile : function(param){
        //console.log("getFile 호출");
        let files = window.localStorage.getItem(param);
        // //console.log(files);
        let parseFiles = '';
        if(files != undefined){
            parseFiles = JSON.parse(files);
        }else{
            //console.log("저장된 값이 없습니다.")
        }
        return parseFiles;
    },
    saveAllFile : function(){
        //console.log("saveAllFile");
        // 1. 저장전 기존에 저장되어 있던 모든 데이터 삭제
        //this.clearLocalStorage();
        localStorage.removeItem("files");
        // 2. 한번에 파일 리스트 데이터 저장하기
        let files = JSON.stringify(this.fileList);
        ////console.log(files);
        window.localStorage.setItem("files", files);
    },
    saveAllWithParam : function(fileName, arr){
        //console.log("saveAllWithParam");
        //1. 해당부분 기존저장 데이터 삭제
        localStorage.removeItem(fileName);
        let files = JSON.stringify(arr);
        ////console.log(files);
        //2. 새로운 데이터로 덮어씌우기
        //console.log(fileName);
        //console.log(arr);
        window.localStorage.setItem(fileName, files);
    },
    putFile : function(file){
        this.fileList.push(file);
    },
    deleteAllFile : function(){
        //console.log("deleteAllFile 삭제 호출");
        window.localStorage.removeItem("files");
    },
    clearLocalStorage : function(){
        //console.log("clearLocalStorage 호출");
        window.localStorage.clear();
    },
    getCurentTimeNow : function(){
        let date = new Date();
        let month = date.getMonth(); //몇월달인지 반환
        let today = date.getDate(); //기준일 반환 1-31
        let day = date.getDay(); //현지 요일 0-6
        let hour = date.getHours(); //현재 시간
        let minute = date.getMinutes();

        //console.log((month+1)+"월 "+today);
        let days = ["일", "월", "화", "수", "목", "금", "토"];
        //console.log(days[day]);

        $("#month-date").text((month+1)+"월 "+today);
        
        let convHour = (hour >= 12) ? hour - 12 : hour;
        let ampm =  (hour >= 12) ? "오후" : "오전";
        let convMinute = minute.toString().length == 1 ? "0"+minute : minute;

        //console.log(convHour);
        //console.log(ampm);
        $("#time").text(convHour+":"+convMinute);
        $("#am-pm").text(ampm);

        //setInterval(this.getTime, 1000*60);

        return (month+1)+"월 "+today;
    },
    getTime : function(){
        //console.log("getTime 호출");
        let date = new Date();
        let hour = date.getHours(); //현재 시간
        let minute = date.getMinutes();

        let convHour = (hour >= 12) ? hour - 12 : hour;
        let ampm =  (hour >= 12) ? "오후" : "오전";
        let convMinute = minute.toString().length == 1 ? "0"+minute : minute;

        $("#time").text(convHour+":"+convMinute);
        $("#am-pm").text(ampm);
    },
    removeAllBoxList : function(){ //바탕화면에 있는 모든 박스 지우기
        window.boxObjList.forEach(function(box){
            box.box.remove();
        })
    }
}