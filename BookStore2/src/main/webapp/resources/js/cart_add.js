window.addEventListener("load", () => {
    document.querySelectorAll(".cart").forEach(item => {
        item.addEventListener("click", e => {
            const target = e.target.closest("tr");
            const bookid = target.dataset.bookid;

            fetch(`/cart/add/${bookid}`, {
                method: "GET"
            })
            //then method 이용하여 정상 종료 시 할 일 지정
            //resp 도착하면 text 값을 뽑으라는 업무 설정.
            .then(resp => resp.text())
            //text 내용이 너무 길면 비동기적으로 불러옴. 
            //따라서 끝날 때를 알기 위한 업무 설정.
            .then(result => {
                if(result == "OK")
                    alert("장바구니에 담기 성공");
            });
        });
    });

});