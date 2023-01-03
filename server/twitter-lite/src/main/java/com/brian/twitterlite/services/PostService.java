package com.brian.twitterlite.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.brian.twitterlite.models.Post;
import com.brian.twitterlite.models.User;
import com.brian.twitterlite.repositories.PostRepository;
import com.brian.twitterlite.repositories.UserRepository;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    //create a post
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    //get all posts
    public List<Post> allPosts() {
        return postRepository.findAll();
    }

    //get all posts by user and users they follow
    public List<Post> allPostsByUserAndFollowing(Long id) {
        return postRepository.findPostsByUserAndFollowing(id);
    }

    //find all posts by username
    public List<Post> allPostsByUsername(String username) {
        //get user id by username
        User user = userRepository.findByUsername(username);
        return postRepository.findByUser(user.getId());
    }

    //add a favorite to a post
    public Post addFavorite(Long user_id, Long post_id) {
        Post post = postRepository.findById(post_id).orElse(null);
        User user = userRepository.findById(user_id).orElse(null);
        List<User> list_of_favorites = post.getUsers_who_favorited();
        if (list_of_favorites.contains(user)) {
            return null;
        } else {
            list_of_favorites.add(user);
            post.setUsers_who_favorited(list_of_favorites);
            return postRepository.save(post);
        }
    }

    //remove a favorite from a post
    public Post removeFavorite(Long user_id, Long post_id) {
        Post post = postRepository.findById(post_id).orElse(null);
        User user = userRepository.findById(user_id).orElse(null);
        List<User> list_of_favorites = post.getUsers_who_favorited();
        if (list_of_favorites.contains(user)) {
            list_of_favorites.remove(user);
            post.setUsers_who_favorited(list_of_favorites);
            return postRepository.save(post);
        } else {
            return null;
        }
    }

    //get one post
    public Post getOnePost(Long id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if(optionalPost.isPresent()) {
            return optionalPost.get();
        } else {
            return null;
        }
    }

    //delete a post
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
