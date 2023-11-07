package kr.ac.kopo.bookstore.pager;

import java.util.ArrayList;
import java.util.List;

public class Pager {
	private int page = 1;
	private int perPage = 10;
	private float total; //전체페이지
	private int perGroup = 3; 
	
	private int search;
	private String keyword;
	
	public String getQuery() {
		String queryString = "";
		
		if(search > 0) {
			queryString += "&search=" + search + "&keyword=" + keyword;
		}
		
		return queryString;
	}
	
	
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getPerPage() {
		return perPage;
	}
	public void setPerPage(int perPage) {
		this.perPage = perPage;
	}
	public float getTotal() {
		return total;
	}
	public void setTotal(float total) {
		this.total = total;
	}
	public int getPerGroup() {
		return perGroup;
	}
	public void setPerGroup(int perGroup) {
		this.perGroup = perGroup;
	}
	
	public int getLast() {
		return (int) Math.ceil(total/perPage);
	}
	
	public int getPrev() {
		//(page-1) / perGroup) -> 소수점 아래를 날려서 어떤 그룹인지 알 수 있는 수식. 
		// * perGroup + 1 -> 해당 그룹의 첫 번째 값.
		// -1 붙이면-> return =  이전 그룹의 첫 번째 값. '이전'으로 가기 위한 것.
		return page <= perGroup ? 1  : (((page-1) / perGroup) - 1) * perGroup + 1;
	}
	
	public int getNext() {
		//+1 붙이면-> return = 다음 그룹의 첫 번째 값. '다음'으로 가기 위한 것.
		int next = (((page-1) / perGroup) + 1) * perGroup + 1;
		int last = getLast();
		
		return next < last ? next : last;
	}
	
	public List<Integer> getList() {
		List<Integer> list = new ArrayList<Integer>();
		
		//현재 페이지가 있는 그룹의 첫번째 페이지.
		int startPage = (((page-1) / perGroup) - 0) * perGroup + 1;
		
		//last페이지보다 적게!
		for(int i = startPage; i < (startPage + perGroup) && i <= getLast(); i++) {
			list.add(i);
		}
		
		//데이터가 들어가 있지 않을 떄 첫번째 페이지가 나오도록 해야함.
		if(list.isEmpty()) {
			list.add(1);
		}
		
		return list;
	}
	public int getSearch() {
		return search;
	}
	public void setSearch(int search) {
		this.search = search;
	}
	
	public String getKeyword() {
		if(search<1) {
			keyword="";
		}
		return keyword;
	}
	
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	
}
