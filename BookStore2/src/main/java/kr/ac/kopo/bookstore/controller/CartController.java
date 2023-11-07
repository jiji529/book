package kr.ac.kopo.bookstore.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import kr.ac.kopo.bookstore.model.Detail;

@RestController
@RequestMapping("/cart")
public class CartController {
	
	@PostMapping("/update_all")
	//Detail -> bookid, 수정된 amount 를 모두 담을 수 있는 VO 클래스.
	String updateAll(@RequestBody List<Detail> list, @SessionAttribute("cart") HashMap<Long, Integer> cart ) {
		for(Detail item: list)
			cart.put(item.getBookid(), item.getAmount().intValue());
		
		return "OK";
	}
	
	@PostMapping("/delete_check")
	//@RequestBody -> 스프링이 아닌, pom.xml에서 등록한 jacson databind를 통해 ajax로 받은 list를 자바 배열로 처리할 수 있도록 해줌.
	String deleteCheck(@RequestBody Long[] list, @SessionAttribute("cart") HashMap<Long, Integer> cart) {
		for(Long bookid : list) {
			cart.remove(bookid);
		}
		return "OK";
	}
	
	@GetMapping("/delete/{bookid}")
	String delete (@PathVariable Long bookid, @SessionAttribute("cart") HashMap<Long, Integer> cart) {
		
		//key값(여기서는 bookid)을 찾지 못했다면 null
		if(cart.remove(bookid) != null) {return "OK";}
		
		return "Not OK";
	}
	
	@GetMapping("/add/{bookid}")
	String addCart(@PathVariable Long bookid, 
			@SessionAttribute(name="cart", required=false) HashMap<Long, Integer> cart, 
			HttpSession session) {
		if(cart == null) {
			cart = new HashMap<Long, Integer>();
			session.setAttribute("cart", cart);
		}
		
		//한 번 장바구니 버튼 누르면 수량 1, 여러번 같은 책 버튼 누르면 수량이 올라가는 기능
		Integer amount = cart.get(bookid);
		if(amount == null)
			amount = 0;
		cart.put(bookid, amount + 1);
		
		System.out.println("장바구니 담기: " + bookid + ", " + cart.get(bookid));
		
		return "OK";
	}

	@GetMapping("/update/{bookid}/{amount}")
	String update(@PathVariable Long bookid, @PathVariable int amount,
			@SessionAttribute("cart") HashMap<Long, Integer> cart) {
		
		System.out.println("eeeee");
		
		if(cart.put(bookid, amount) != null)
			return "OK";
		
		return "FAIL";
	}
	
}
