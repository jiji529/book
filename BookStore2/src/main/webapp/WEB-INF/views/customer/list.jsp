<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<jsp:include page="../header.jsp"></jsp:include>
</head>
<body>
	<div class="container" >
		<div>
			<h3>고객 목록</h3>
		</div>
		
		<!-- 검색 기능. -->
		<div>
			<form>
				<div class="row mb-2">
					<div class="col-6"></div>
					<div class="col-2">
						<select name="search" class="form-select form-select-sm">
							<option value="0">검색 항목을 선택하세요.</option>
							<option value="1" ${pager.search == 1? "selected":""}>고객번호</option>
							<option value="2" ${pager.search == 2? "selected":""}>고객명</option>
							<option value="3" ${pager.search == 3? "selected":""}>주소</option>
							<option value="3" ${pager.search == 4? "selected":""}>전화번호</option>
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
			<table border="1" class="table table-light table-hover">
				<thead class="table-dark">
					<tr>
						<th>아이디</th>
						<th>비밀번호</th>
						<th>고객명</th>
						<th>주소</th>
						<th>전화번호</th>
						<th>관리</th>
					</tr>
				</thead>
				<c:forEach var="item" items="${list}">
				<tbody>
					<tr>
						<td>${item.custid}</td>
						<td><c:out value="${item.passwd}"/></td>
						<td>${item.name}</td>
						<td>${item.address}</td>
						<td>${item.phone}</td>
						<td>
							<a href="delete/${item.custid}" class="btn btn-primary btn-sm"><i class="bi bi-trash">삭제</i></a> 
							<a href="update/${item.custid}" class="btn btn-primary btn-sm"><i class="bi bi-wrench-adjustable-circle">변경</i></a>
						</td>
					</tr>
				</c:forEach>
				
				<c:if test="${list.size() < 1}">
				<tr>
					<td colspan="5">검색된 회원이 없습니다.</td>
				</tr>
				</c:if>
				
				</tbody>	
				
				<tfoot>
					<tr>
						<td colspan="5">
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
			<a href=".." class="btn btn-secondary btn-sm">이전</a>
		</div>
	</div>
</body>
</html>

