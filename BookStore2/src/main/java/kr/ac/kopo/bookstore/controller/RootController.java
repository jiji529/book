package kr.ac.kopo.bookstore.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import kr.ac.kopo.bookstore.model.Book;
import kr.ac.kopo.bookstore.model.Customer;
import kr.ac.kopo.bookstore.service.BookService;
import kr.ac.kopo.bookstore.service.CustomerService;

@Controller
public class RootController {
	
	@Autowired
	CustomerService customerService;
	
	@Autowired
	BookService bookService;
	
	@GetMapping("/cart")
	String cart(Model model, @SessionAttribute(name="cart", required=false) HashMap<Long, Integer> cart) {
		if(cart == null) {
			model.addAttribute("cart", new HashMap<Long, Integer>());
		} else if(cart.isEmpty()) {
			model.addAttribute("cart", cart);
		} else {
			//세션에 담긴 bookid를 이용하여 도서 목록을 가져옴
			List<Book> list = bookService.list(cart);
			
			//위에서 불러온 도서 목록을 key값=bookid로 하여 HashMap에 저장.
			HashMap<Long, Book> map = new HashMap<Long, Book>();
			for(Book item : list) {
				map.put(item.getBookid(), item);
			}
			model.addAttribute("cart", cart);
			model.addAttribute("books", map);
		}
		
		System.out.println();
		
		return "cart";
	}
	
	@GetMapping("/")
	String index(HttpSession session, Model model) {
		String msg = (String)session.getAttribute("msg");
		
		if(msg != null) {
			//jsp에서 쓸수 있도록 저장.
			model.addAttribute("msg", msg);
			session.removeAttribute("msg");
		}
		
		return "index";
	}
	
	@GetMapping("/login")
	String login() {
		return "login";
	}
	
	@PostMapping("/login")
	String login(Customer item, HttpSession session) {
		//result에는 true, false만 담겨있음.
		Boolean result = customerService.login(item);
		
		//로그인이 된 경우
		if(result) {
			session.setAttribute("msg", "환영합니다.");
			session.setAttribute("member", item);
		} else
			session.setAttribute("msg", "로그인에 실패하였습니다.");
		
		return "redirect:/";
	}
	
	@GetMapping("/logout")
	String logout(HttpSession session) {
		
		session.invalidate();
		
		return "redirect:/";
	}

	@GetMapping("/signup")
	String signup() {
		return "signup";
	}
	
	@PostMapping("/signup")
	String signup(Customer item) {
		customerService.add(item);
		
		return "redirect:.";
	}
	
	@ResponseBody
	@GetMapping("/checkId/{custid}")
	String checkId(@PathVariable String custid) {
		if(customerService.item(custid) == null)
			return "OK";
		else
			return "FAIL";
	}
	
	
}














