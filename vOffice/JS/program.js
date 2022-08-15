class Box{
    constructor(options){
        this.selectorId = options.selectorId;
        this.text = options.text;
        this.title = options.title;
        this.type = options.type;
        this.size = options.size;
        this.content = options.content;
        this.date = options.date;
    }

    setInfo(options){
        this.selectorId = options.selectorId;
        this.text = options.text;
        this.title = options.title;
        this.type = options.type;
        this.size = options.size;
        this.content = options.content;
        this.date = options.date;
    }

}