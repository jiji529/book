window.addEventListener("load", () => {
    //list.jsp가 사용 중인 cart_add.js로 이동한 부분.
   /*  document.querySelectorAll(".cart").forEach(item => {
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
    }); */

    const calc_saleprice = () => {

        const itemprice_nodes = document.querySelectorAll(".itemprice");  

        //-----전체합계 변경
        if(itemprice_nodes.length > 1){
        //querySelectorAll : 배열이 아님 -> 배열로 바꾸기
        const itemprice_array = Array.prototype.slice.call(itemprice_nodes); 
        //reduce() : 배열 안 요소들 합계낼 때 사용할 수 있는 함수 
        const saleprice = itemprice_array.reduce((prev, curr) => prev + parseInt(curr.dataset.itemprice), 0);
        /* const saleprice = itemprice_array.reduce((prev, curr) => {
            prev + parseInt(curr.dataset.itemprice)
        }, 0); //<- 0은 계산 전 초기값. */
        document.getElementById('saleprice').textContent = saleprice + "원";
    } else {
            document.getElementById('saleprice').textContent = "0원";
        }
    }

    document.querySelectorAll(".cart_update").forEach(item => {
        item.addEventListener("click", e => {

            const tr = e.target.closest("tr");
            const input = tr.querySelector("input[name='amount']");

            //ajax으로 도서번호, 수량을 주소에 담아서 서버로 보내주기.
            fetch(`/cart/update/${tr.dataset.bookid}/${input.value}`, {
                    method: "GET"
            })
            .then(resp => resp.text())
            .then(result => {
                if(result == "OK") {
                    alert("변경 되었습니다.");

                    // 변경 아이콘 및 데이터셋 업데이트
                    const icon = tr.querySelector("i");

                    input.dataset.value = input.value;
                    icon.classList.add("hide");


                    //-----주문금액 업데이트
                    //수량 변경 시 단가, 주문금액도 변경되도록 하기.
                    const price = tr.querySelector(".price").dataset.price;
                    //수량*가격 = 총합계
                    const itemprice = input.value * price;

                    tr.querySelector('.itemprice').dataset.itemprice = itemprice;
                    tr.querySelector('.itemprice').textContent = itemprice + "원";

                    calc_saleprice();

                }
            });
        });
    });

    document.querySelectorAll('.cart_delete').forEach(item => {
        item.addEventListener("click", e => {
            //console.log(e.target);

            //삭제 버튼을 감싸고 있는 tr태그의 data-bookid를 찾기 위함.
            const tr = e.target.closest("tr");
            const bookid = tr.dataset.bookid;

            fetch("/cart/delete/" + bookid)
            .then(resp => resp.text())
            .then(result => {
                if(result == "OK") 
                    //DOM에서 해당 도서를 삭제하는 기능.
                    tr.remove();
                    calc_saleprice();
            });
        });
    });

    //체크박스 전체 선택 기능
    document.querySelector('#check_all').addEventListener("change", e => {
        document.querySelectorAll('.check_item').forEach(item => {

            //전체선택 박스(e.target)를 눌렀을 때 나머지 버튼들도 모두 선택되도록
            item.checked = e.target.checked;
        });
    });

    document.getElementById('check_delete').addEventListener('click', e => {

        //checked 속성이 있을 떄
        const list = [];
        
        document.querySelectorAll('.check_item:checked').forEach(item => {
            const bookid = item.closest('tr').dataset.bookid;

            list.push(parseInt(bookid));
        });

        //체크 안 하고 삭제 버튼을 누르는 경우
        if(list.length < 1) { 
            alert("삭제를 원하시는 상품을 먼저 선택해 주세요.");
            return;
        }

        fetch("/cart/delete_check", {
            method: "POST",
            //js 값이나 객체를 json 문자열로 반환
            body: JSON.stringify(list),
            headers: {
                //보내려고 하는 데이터 타입이 'json'이라고 하는 부분 -> mime타입: application/json
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.text())
        .then(result => {
            if(result == "OK") {
                document.querySelectorAll('.check_item:checked').forEach(item => {
                    item.closest('tr').remove();
                });
            }
            calc_saleprice();


        });
    });

    
    document.getElementById('update_all').addEventListener('click' , e => {
        const list = [];
        
        document.querySelectorAll('input[name="amount"]').forEach(item => {
            const tr = item.closest('tr');
            
            /* //기존 값과 변경값이 같을 때는 list에 값을 넣지 않아도 됨.
            if(item.value == item.dataset.value)
                //return -> foreach문을 벗어남.
                return; */
            if(item.value != item.dataset.value)    {
                //bookid와 value값을 객체{}로 묶어서 배열에 넣기
                list.push({
                    bookid: parseInt(tr.dataset.bookid),
                    amount: parseInt(item.value)
                });
            }

        });
        
        if(list.length < 1) {
            alert('변경할 내용이 없습니다.');
            return;
        }
        
        fetch("/cart/update_all", {
            method: "POST",
            body: JSON.stringify(list),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.text())
        .then(result => {
            if(result == "OK") {

                list.forEach(item => {
                    //tr태그
                    const tr = document.querySelector(`tr[data-bookid="${item.bookid}"]`);
                    const input = tr.querySelector('input[name="amount"]');
                    const icon = tr.querySelector("i");

                    //기존값인 data-value를 변경
                    input.dataset.value = input.value;
                    //수정된 값 표시하는 체크표시 모두 삭제
                    icon.classList.add("hide");

                    //수량 일괄 변경 시 주문금액, 주문금액(합계) 업데이트
                    const price = tr.querySelector(".price").dataset.price;
                    //수량*가격 = 총합계
                    const itemprice = input.value * price;

                    tr.querySelector('.itemprice').dataset.itemprice = itemprice;
                    tr.querySelector('.itemprice').textContent = itemprice + "원";

                });
                calc_saleprice();


                alert("변경 되었습니다.");
                return;
            }
        });
    });
    
    /* //내가 만든거
    document.querySelectorAll('input[name="amount"]').forEach( item => {
        item.addEventListener('change', e => {
            e.target.setAttribute('change_value');

            console.log(e.target);
            console.log(e.target.value);
    })}) */

    //수정 시 값 변한 부분 체크표시 나타내는 기능.
    document.querySelectorAll('input[name="amount"]').forEach(item => {
        item.addEventListener('change', e => {
            const tr = e.target.closest('tr');
            const icon = tr.querySelector('i');

            //e.target.dataset.value : 초기값 -> 변경했다가 다시 초기값으로 변경했을 때 체크표시 사라지도록 하기 위함.
            if(e.target.dataset.value != e.target.value)
                icon.classList.remove('hide');
            else 
                icon.classList.add('hide');
        })
    });

});