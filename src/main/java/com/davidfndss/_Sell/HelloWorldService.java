package com.davidfndss._Sell;


import org.springframework.stereotype.Service;

@Service
public class HelloWorldService {

    public String helloWorld() {
        System.out.println("Test!");
        return "Hello Spring!";
    }
}
