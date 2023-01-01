package com.brian.twitterlite.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.brian.twitterlite.models.UserFollowing;
import com.brian.twitterlite.repositories.UserFollowingRepository;

@Service
public class UserFollowingService {
    private final UserFollowingRepository userFollowingRepository;
    public UserFollowingService(UserFollowingRepository userFollowingRepository) {
        this.userFollowingRepository = userFollowingRepository;
    }

    //create a 
    public UserFollowing createFollow(UserFollowing follow) {
        return userFollowingRepository.save(follow);
    }

    //get all
    public List<UserFollowing> allFollows() {
        return userFollowingRepository.findAll();
    }
    
    //find the one to delete
    public Long find(Long user_id, Long following_id) {
       return userFollowingRepository.find(user_id, following_id);
    }

    //delete the one
    public void deleteFollow(Long x) {
        userFollowingRepository.deleteById(x);
    }


}


//add a favorite to a post
// public Post addFavorite(Long user_id, Long post_id) {
//     Post post = postRepository.findById(post_id).orElse(null);
//     User user = userRepository.findById(user_id).orElse(null);
//     List<User> list_of_favorites = post.getUsers_who_favorited();
//     if (list_of_favorites.contains(user)) {
//         return null;
//     } else {
//         list_of_favorites.add(user);
//         post.setUsers_who_favorited(list_of_favorites);
//         return postRepository.save(post);
//     }
// }