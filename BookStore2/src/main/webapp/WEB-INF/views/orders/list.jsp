<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>   
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<jsp:include page="../header.jsp"></jsp:include>
<script src="/resources/js/cart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
</head>
<body>
	<div class="container" >
		<div>
			<h3>주문 내역</h3>
		</div>
		<nav>
			<jsp:include page="../nav.jsp"></jsp:include>
		</nav>
		<!-- 검색 기능. -->
		<div>
			<form>
				<div class="row mb-2">
					<div class="col-6"></div>
					<div class="col-2">
						<select name="search" class="form-select form-select-sm">
							<option value="0">검색 항목을 선택하세요.</option>
							<option value="1" ${pager.search == 1? "selected":""}>주문번호</option>
							<option value="2" ${pager.search == 2? "selected":""}>고객번호</option>
						</select>
					</div>
					<div class="col-3">
						<input type="text" name="keyword" class="form-control form-control-sm" value="${pager.keyword}">
					</div>
					<div class="col-1 d-grid">
						<button class="btn btn-sm btn-primary">검색</button>
					</div>
				</div>
			</form>
		</div>
		
		<div>
			<table border="1" class="table table-light table-hover text-center">
				<thead class="table-dark">
					<tr>
						<th>주문번호</th>
						<th>고객번호</th>
						<th>고객명</th>
						<th>연락처</th>
						<th>주문금액</th>
						<th>주문일자</th>
						<th>관리</th>
					</tr>
				</thead>
				<tbody>
				<c:forEach var="item" items="${list}">
					<tr>
						<td><a href="detail/${item.orderid}">${item.orderid}</a></td>
						<td>${item.custid}</td>
						<td>${item.name}</td>
						<td>${item.phone}</td>
						<td>${item.saleprice}</td>
						<td><fmt:formatDate value="${item.orderdate}" pattern="yyyy년 MM월 dd일 HH시 mm분"/></td>
						<td>
							<a href="delete/${item.orderid}" class="btn btn-danger btn-sm"><i class="bi bi-trash">삭제하기</i></a> 
						</td>
					</tr>
				</c:forEach>
				
				<c:if test="${list.size() < 1}">
				<tr>
					<td colspan="5">검색된 주문내역이 없습니다.</td>
				</tr>
				</c:if>
				
				</tbody>	
				
				<tfoot>
					<tr>
						<td colspan="7">
							<ul class="pagination justify-content-center mt-3">
								<li class="page-item"><a class="page-link" href="?page=1&${pager.query}">처음</a></li>
								<li class="page-item"><a class="page-link" href="?page=${pager.prev}&${pager.query}">이전</a></li>
								<c:forEach var="page" items="${pager.list}">
									<!-- perGroup 개수 마다 브라우저에 한번에 보이는 페이지 리스트가 달라짐. -->
									<li class="page-item"><a class="page-link ${page == pager.page ? 'active' : ''}" href="?page=${page}&${pager.query}">${page}</a></li>
								</c:forEach>
								<li class="page-item"><a class="page-link" href="?page=${pager.next}&${pager.query}">다음</a></li>
								<li class="page-item"><a class="page-link" href="?page=${pager.last}&${pager.query}">마지막</a></li>
							</ul>
						</td>
					</tr>
				</tfoot>			
			</table>
		</div>
		<div class="mb-5">
			<a href="add" class="btn btn-primary btn-sm">등록</a>
			<a href="dummy" class="btn btn-warning btn-sm">대량등록</a>
			<a href="init" class="btn btn-danger btn-sm">초기화</a>
			<a href=".." class="btn btn-secondary btn-sm">이전</a>
		</div>
	</div>
</body>
</html>

