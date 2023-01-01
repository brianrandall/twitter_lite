package com.brian.twitterlite.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.brian.twitterlite.models.PostComment;
import com.brian.twitterlite.repositories.PostCommentRepository;

@Service
public class PostCommentService {
    private final PostCommentRepository postCommentRepository;
    public PostCommentService(PostCommentRepository postCommentRepository) {
        this.postCommentRepository = postCommentRepository;
    }

    //get all comments
    public List<PostComment> allComments() {
        return postCommentRepository.findAll();
    }

    //get all comments by post
    public List<PostComment> allCommentsByPost(Long post) {
        return postCommentRepository.findByPostId(post);
    }

    //create a comment
    public PostComment createComment(PostComment comment) {
        return postCommentRepository.save(comment);
    }

    //delete a comment  
    public void deleteComment(Long id) {
        postCommentRepository.deleteById(id);
    }

}