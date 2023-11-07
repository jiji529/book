package kr.ac.kopo.bookstore.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ac.kopo.bookstore.dao.CustomerDao;
import kr.ac.kopo.bookstore.model.Customer;
import kr.ac.kopo.bookstore.pager.Pager;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	CustomerDao dao;
	
	@Override
	public List<Customer> list(Pager pager) {
		int total = dao.total(pager);
				
		pager.setTotal(total);
	
		return dao.list(pager);
	}

	@Override
	public void add(Customer item) {
		dao.add(item);
	}

	@Override
	public Customer item(String custid) {
		return dao.item(custid);
	}

	@Override
	public void update(Customer item) {
		dao.update(item);
	}

	@Override
	public void delete(String custid) {
		dao.delete(custid);
	}

	@Override
	public Boolean login(Customer item) {
		Customer result = dao.login(item);
		//회원 정보가 있는 경우 -> Boolean으로 받기 위함.
		if(result != null) {
			//오류가 날 경우?
			BeanUtils.copyProperties(result, item);
			item.setPasswd(null);
			return true;
		}else
			return false;
	}
}
