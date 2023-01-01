package com.brian.twitterlite.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.brian.twitterlite.models.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findByEmail(String email);
    User findByUsername(String username);
    List<User> findAll();
    List<User> findByUsernameContaining(String username);
    User findByIdIs(Long id);
}

