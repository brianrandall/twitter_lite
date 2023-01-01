package com.brian.twitterlite.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.brian.twitterlite.models.Post;

@Repository
public interface PostRepository extends CrudRepository<Post, Long>{
    List<Post> findAll();
    Post findByIdIs (Long id);
    //custom sql query
    @Query(value="SELECT * FROM posts WHERE user_id = ?1", nativeQuery=true)
    List<Post> findByUser(Long id);
    
    @Query(value="select * from fake_twitter.posts where user_id = ?1 or user_id in (select following_id from fake_twitter.followings where user_id = ?1);", nativeQuery=true)
    List<Post> findPostsByUserAndFollowing(Long id);
}
