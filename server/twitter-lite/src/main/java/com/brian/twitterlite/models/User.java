package com.brian.twitterlite.models;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "users")
// @JsonIdentityInfo(
//     generator = ObjectIdGenerators.PropertyGenerator.class,
//     property = "id")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="First name is required")
    @Size(min=2, max=255, message="Name must be between 2 and 255 characters")
    private String firstName;

    @NotBlank(message="Last name is required")
    @Size(min=2, max=255, message="Name must be between 2 and 255 characters")
    private String lastName;

    @NotBlank(message="Username is required")
    @Size(min=2, max=255, message="Username must be between 2 and 255 characters")
    private String username;

    @NotBlank(message="Email is required")
    @Email(message="Email must be valid")
    private String email;

    @Size(min=1, max=69)
    private String location;

    @Size(min=1, max=99)
    private String bio;

    private Boolean admin;

    @NotBlank(message="Password is required")
    @Size(min=6, message="Password must be greater than 6 characters")
    // password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character
    @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{6,}$", message="Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character")
    private String password;

    @Transient
    // @NotBlank(message="passwords do not match!")
    private String passwordConfirmation;

    @JsonIgnoreProperties("poster")
    @OneToMany(mappedBy="poster", fetch = FetchType.EAGER)
    private List<Post> posts;

   
    @JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
    @ManyToMany(fetch = FetchType.LAZY)
        @JoinTable(
            name = "users_favorites",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "post_id")
        )
    private List<Post> favorited_posts;

    @JsonIgnoreProperties("user")
    @OneToMany(mappedBy="user", fetch = FetchType.LAZY)
    private List<UserFollowing> followings;

    @Column(updatable=false)
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<PostComment> comments;


    @Column(updatable=false)
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createdAt;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updatedAt;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }


    public String getPasswordConfirmation() {
        return passwordConfirmation;
    }


    public void setPasswordConfirmation(String passwordConfirmation) {
        this.passwordConfirmation = passwordConfirmation;
    }

    public List<UserFollowing> getFollowings() {
        return followings;
    }

    public void setFollowings(List<UserFollowing> followings) {
        this.followings = followings;
    }

    public List<PostComment> getComments() {
        return comments;
    }

    public void setComments(List<PostComment> comments) {
        this.comments = comments;
    }

    public List<Post> getFavorited_posts() {
        return favorited_posts;
    }

    public void setFavorited_posts(List<Post> favorited_posts) {
        this.favorited_posts = favorited_posts;
    }

    
    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate(){
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = new Date();
    }
}
