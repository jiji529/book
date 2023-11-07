class ValidateForm {
    //constructor() -> 생성자 생성. jsp파일의 new와 함께 사용되는 함수.
    constructor(options) {
        this.tags = options.tags;
        console.log("옵션객체 형태 확인용 : " + this.tags);
        //등록 버튼이 있는 곳의 부모를 찾을 수 있도록 하기 위함.
        this.form = document.querySelector(options.selector).closest("form");

        //텍스트로 되어 있는 부분을 객체로 만들어주기 위함
        for(const item of this.tags) {                          //배열 tags 순회방법
            item.tag = this.form.elements[item.tag];    //custid = this.form.elements["custid"]
            console.log("elements 함수 사용하면? : " + item.tag);

            if(item.eq)
                item.eq = this.form.elements[item.eq];
        }

        document.querySelector(options.selector).addEventListener("click", e => {
    
            for(const item of this.tags)		                 //배열 tags 순회방법. item : tags 배열에 있는 객체 한 줄 한 줄 
                //함수 valid(x) 불러오는 부분.
                if(!this.valid(item)) return;                   //return; -> form.submit();으로 넘어가지 않는 기능.
        
            this.form.submit();            //서버에 값을 보내겠다는 의미.
        });

    }

    valid(x) {
        //checkId(비밀번호=비밀번호확인) 값 콘솔에서 확인하기.
        console.log(checkId);
        console.log(x.checkId);

        //tag배열에 item.condition이 있는데 그 값이 false인 것 표현 -> item.condition 자체가 false인 것과 구분하기.
        //eval -> 자바스크립트에서 스트링을 파라미터로 받으면 전역변수 checkId를 가져와서 실행가능하도록 함.
        if(x.condition !== undefined && !eval(x.condition)) {
            alert(x.msg);
            x.tag.focus();
            return false;
        }
        
        //item.eq가 있는 객체를({}) 찾고, && 해당 item의 입력값(value)과 eq(-> form.passwd)의 입력값(value)이 같지 않을 때  
        if(x.eq && (x.tag.value !== x.eq.value)) { 
            alert(x.msg);
            x.tag.focus(); 
            return false;
        }
        
        
        if(!x.tag.value) { 	// '', 0, undefined, null -> false , value : 사용자가 입력한 값
            alert(x.msg);
            x.tag.focus();	//커서를 이동시켜줌.
            return false;			
        }
        
        return true;
        
    }
}



