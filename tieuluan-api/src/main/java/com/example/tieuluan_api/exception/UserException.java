package com.example.tieuluan_api.exception;

import java.nio.file.attribute.UserPrincipalNotFoundException;

public class UserException extends Exception{
    public UserException(String message) {
        super(message);
    }
}
