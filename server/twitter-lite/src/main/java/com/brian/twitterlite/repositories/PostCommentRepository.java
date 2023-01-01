package com.brian.twitterlite.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.brian.twitterlite.models.PostComment;

@Repository
public interface PostCommentRepository extends CrudRepository<PostComment, Long>{
    List<PostComment> findAll();
    List<PostComment> findByPostId(Long id);
}
