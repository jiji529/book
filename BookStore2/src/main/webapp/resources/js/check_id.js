let checkId = false;

window.addEventListener("load", function () {
    const button = document.getElementById("check_id");
    const button_sync = document.getElementById("check_id_sync");

    document.querySelector("input[name='custid']").addEventListener("change", e => {
        checkId = false;
    });

    //[비동기] 중복확인
    button.addEventListener("click", () => {

        const id = document.querySelector("input[name='custid']").value;
        
        const xhr = new XMLHttpRequest();
        
        xhr.open("GET", `checkId/${id}`, true);
        
        //서버에 요청하기 전에 먼저 일이 끝나고 난 후에 할 일(onreadystatechange)을 정해주는 것.
        xhr.onreadystatechange = () => {
            console.log(xhr.readyState);
            
            if(xhr.readyState == xhr.DONE) {
                //정상적으로 일이 처리됐을 때(서버에 문서가 존재함:200)만 alert를 실행하도록 만든 부분.
                if(xhr.status == 200) {
                    //responseText -> rootController에서 지정해둠.
                    if(xhr.responseText === "OK") {
                        checkId = true;
                        alert("사용 가능한 아이디입니다.");
                    } else {
                        //다시 아이디 쓰는 경우 대비하기.
                        checkId = false;
                        alert("다른 사용자가 등록한 아이디입니다.");
                    }
                }
            }
        };

        //서버에 요청 보내기
        xhr.send();

    });

    //[동기] 중복확인
    button_sync.addEventListener("click", () => {
        const id = document.querySelector("input[name='custid']").value;

        const xhr = new XMLHttpRequest();

        xhr.open("GET", `checkId/${id}`, false);

        xhr.send();

        if(xhr.responseText === "OK") {
            checkId = true;
            alert("사용 가능한 아이디입니다.");
        } else {
            checkId = false;
            alert("다른 사용자가 등록한 아이디입니다.");
        }
    });
});