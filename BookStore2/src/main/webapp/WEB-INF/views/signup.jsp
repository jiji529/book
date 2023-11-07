<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<jsp:include page="header.jsp"></jsp:include>
<script>
	const msg3 = '${msg}';
</script>
<script src="${pageContext.request.contextPath}/resources/js/password_check_jquery.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/check_id.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/validate_form.js"></script>
</head>
<body>
	<div class="container">
		<div>
			<h3>회원가입</h3>
		</div>
		<form method="POST">
		<div>
			<div>
				<label>아이디:</label>
				<input type="text" name="custid">
				<button type="button" id="check_id">[비동기]중복확인</button>
				<button type="button" id="check_id_sync">[동기]중복확인</button>
			</div>
			<div>
				<label>비밀번호:</label>
				<input type="password" name="passwd">
				<button type="button" class="password_check" data-for="passwd">확인</button>
			</div>
			<div>
				<label>비밀번호 확인:</label>
				<input type="password" name="passwd_confirm" >
				<button type="button" class="password_check" data-for="passwd_confirm">확인</button>
			</div>
			<div>
				<label>고객명:</label>
				<input type="text" name="name">
			</div>
			<div>
				<label>주소:</label>
				<input type="text" name="address">
			</div>
			<div>
				<label>전화번호:</label>
				<input type="text" name="phone">
			</div>
			<div>
				<button type="button" id="signup">등록</button>
				<a href="."><button type="button">처음으로</button></a>
				
			</div>
		</div>
		</form>
	</div>
	
<script>
	new ValidateForm(
			//매개변수가 옵션(options)객체로 표현됨
			{
				selector: "#signup",
				tags: [
			        {tag: "custid", msg: "아이디는 필수입니다."},
			        {tag: "custid", msg:"아이디 중복검사를 해주세요.", condition: "checkId"},
			        {tag: "passwd", msg: "비밀번호를 입력해주세요."},
			        {tag: "passwd_confirm", msg: "비밀번호 확인을 입력해주세요."},
			        {tag: "passwd_confirm", msg: "비밀번호와 비밀번호 확인이 일치하지 않습니다.", eq: "passwd"},
			        {tag: "name", msg: "성명을 입력해주세요."}
			    ]
			}
	);
</script>	
	
</body>
</html>