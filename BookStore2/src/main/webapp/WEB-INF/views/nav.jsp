<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 


<c:if test="${sessionScope.member == null}">
	<div class="my-2">
		<a href="/login">로그인</a>
		<a href="/signup">회원가입</a>
		<a href="/cart">장바구니</a>
	</div>
</c:if>
<c:if test="${sessionScope.member != null}">
	<div class="my-2">
		<p>${member.name}님 환영합니다!</p>
		<a href="/logout">로그아웃</a>
		<a href="/cart">장바구니</a>
	</div>
</c:if>