package kr.ac.kopo.bookstore.intercepter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import kr.ac.kopo.bookstore.model.Customer;

public class AdminIntercepter extends HandlerInterceptorAdapter{

		public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
			HttpSession session = request.getSession();
			Customer member = (Customer) session.getAttribute("member");
			
			//로그인한 경우
			if(member != null) {
				//관리자가 아닌 경우.
				if(!member.getCustid().equals("admin")) {
					response.sendRedirect("/kopo");
					//false -> dispatcher Servlet이 인터셉터 뒤에 컨트롤러에 request 전달하지 않음. 컨트롤러는 아무것도 받지 못함.
					return false;
				}
				//true -> dispatcher Servlet이 인터셉터 뒤에 컨트롤러에 request가 전달됨. 
				return true;
				
			}
			
			//로그인하지 않은 경우
			response.sendRedirect("/kopo/login");
			
			return false;
		}
	
}
