package com.api.uber.repository;

import com.api.uber.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value= "FROM User u WHERE u.username = :username")
    User findByUserName(String username);

}
