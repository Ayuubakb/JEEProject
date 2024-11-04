package com.JEEproject.Backend.Templates;

import com.JEEproject.Backend.DTOs.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FiltersTemplates {
    @Autowired
    JdbcTemplate jdbcTemplate;

    private final String managerQuery="" +
            "SELECT u.id_user,u.first_name,u.last_name,u.role,u.email,u.add_date,a.id_agency,a.city,u.is_active " +
            "FROM users u INNER JOIN agencies a ON u.id_agency=a.id_agency " +
            "WHERE role='Manager'";
    private final String clientQuery="" +
            "SELECT u.id_user,u.first_name,u.last_name,u.role,u.email,u.add_date,u.company,u.address,a.id_agency,a.city,COUNT(o.id_order) as numOrders,u.is_active " +
            "FROM ((users u INNER JOIN agencies a ON u.id_agency=a.id_agency) " +
            "LEFT JOIN orders o ON o.id_client=u.id_user) " +
            "WHERE role='Client'";
    private final String driverQuery="" +
            "SELECT u.id_user,u.first_name,u.last_name,u.role,u.email,u.add_date,u.driver_type,u.is_available,a.id_agency,a.city, COUNT(m.id_mission) as numMissions,u.is_active " +
            "FROM ((users u INNER JOIN agencies a ON u.id_agency=a.id_agency) " +
            "LEFT JOIN missions m ON m.id_driver=u.id_user) " +
            "WHERE role='Driver'";
    private final String orderQuery="" +
            "SELECT o.*, r.id_receiver, r.fullname as receiver, r.email, r.city as to, u.id_user, u.company, a.city as from" +
            " FROM((( orders o INNER JOIN receivers r ON o.id_receiver=r.id_receiver) " +
            "INNER JOIN users u ON u.id_user=o.id_client) " +
            "INNER JOIN agencies a ON u.id_agency=a.id_agency) ";

    public List<UserDto> getManagers(ManagerFilters filters){
        String query=managerQuery;
       if(filters.getCity()!=null)
           query+=" AND city='"+filters.getCity()+"'";
       if(!filters.getName().isEmpty())
           query+=" AND (first_name LIKE '%"+filters.getName()+"%' OR last_name LIKE '%"+filters.getName()+"%')";
       if(!filters.getSortByDate().isEmpty()){
           String tmp= filters.getSortByDate().toUpperCase();
           query += " ORDER BY add_date "+tmp;
       }
       return jdbcTemplate.query(query,new BeanPropertyRowMapper<UserDto>(UserDto.class));
    }
    public List<ClientDto> getClients(ClientFilters filters){
        String query=clientQuery;
        if(filters.getCity()!=null)
            query+=" AND city='"+filters.getCity()+"'";
        if(!filters.getCompany().isEmpty())
            query+=" AND company ILIKE '%"+filters.getCompany()+"%'";
        query+=" GROUP BY u.id_user,u.first_name,u.last_name,u.role,u.email,u.add_date,a.id_agency,a.city";
        if(!filters.getSortByDate().isEmpty()){
            String tmp= filters.getSortByDate().toUpperCase();
            query += " ORDER BY add_date "+tmp;
        }
        if(!filters.getSortByOrders().isEmpty()){
            String tmp= filters.getSortByOrders().toUpperCase();
            query += " ORDER BY COUNT(o.id_order) "+tmp;
        }
        System.out.println(query);
        return jdbcTemplate.query(query,new BeanPropertyRowMapper<ClientDto>(ClientDto.class));
    }
    public List<DriverDto> getDrivers(DriverFilters filters){
        String query=driverQuery;
        if(!filters.getIs_available().isEmpty())
            query+=" AND is_available='"+filters.getIs_available()+"'";
        if(!filters.getName().isEmpty())
            query+=" AND (first_name LIKE '%"+filters.getName()+"%' OR last_name LIKE '%"+filters.getName()+"%')";
        if(filters.getCity()!=null)
            query+= " AND city='"+filters.getCity()+"'";
        if(filters.getDriver_type()!=null)
            query+= " AND driver_type='"+filters.getDriver_type()+"'";
        query+=" GROUP BY u.id_user,u.first_name,u.last_name,u.role,u.email,u.add_date,u.driver_type,u.is_available,a.id_agency,a.city";
        if(!filters.getSortByMissions().isEmpty()) {
            String tmp=filters.getSortByMissions().toUpperCase();
            query += " ORDER BY COUNT(m.id_mission) "+tmp;
        }
        System.out.println(query);
        return jdbcTemplate.query(query, new BeanPropertyRowMapper<DriverDto>(DriverDto.class));
    }
    public List<OrderDto> getOrders(OrderFilters orderFilters){
        String query=orderQuery;
        boolean whereAdded=false;
        boolean orderByAdded=false;
        if(!orderFilters.getCompany().isEmpty()) {
            query += " WHERE u.company LIKE '%" + orderFilters.getCompany() + "%'";
            whereAdded=true;
        }
        if(orderFilters.getTracking_status()!=null) {
            if(whereAdded)
                query+=" AND";
            else
                query+=" WHERE";
            query+=" tracking_status='"+orderFilters.getTracking_status()+"'";
        }
        if(orderFilters.getCity()!=null){
            if(whereAdded)
                query+=" AND";
            else
                query+=" WHERE";
            query+=" (a.city='"+orderFilters.getCity()+"' OR r.city='"+orderFilters.getCity()+"')";
        }
        if(!orderFilters.getSortByDate().isEmpty()) {
            query += " ORDER BY o.date " + orderFilters.getSortByDate().toUpperCase();
            orderByAdded=true;
        }
        if(!orderFilters.getSortByPriority().isEmpty()) {
            if(!orderByAdded)
                query+=" ORDER BY";
            else
                query+=" ,";
            query+=" o.priority "+orderFilters.getSortByPriority().toUpperCase();
        }
        return jdbcTemplate.query(query,new BeanPropertyRowMapper<OrderDto>(OrderDto.class));
    }
}
