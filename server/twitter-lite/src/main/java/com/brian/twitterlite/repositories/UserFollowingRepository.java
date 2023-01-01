package com.brian.twitterlite.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.brian.twitterlite.models.Post;
import com.brian.twitterlite.models.UserFollowing;

@Repository
public interface UserFollowingRepository extends CrudRepository<UserFollowing, Long>{
    List<UserFollowing> findAll();
    @Query(value="SELECT * FROM id WHERE user_id = ?1", nativeQuery=true)
    List<Post> findByUser(Long id);

    @Query(value="select * from followings where user_id = ?1 && following_id = ?2", nativeQuery=true)
    Long find(Long user_id, Long following_id);
}
