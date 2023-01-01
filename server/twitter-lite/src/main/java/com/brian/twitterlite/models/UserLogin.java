package com.brian.twitterlite.models;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class UserLogin {

    @NotEmpty(message="Email not found!")
    @Email(message="Email not found")
    private String email;
    
    @NotEmpty(message="Invalid password!")
    @Size(min=8, max=128, message="Invalid password!")
    private String password;
    
    public UserLogin() {}

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
}
