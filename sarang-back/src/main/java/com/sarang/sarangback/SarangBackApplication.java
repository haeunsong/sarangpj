package com.sarang.sarangback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class SarangBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(SarangBackApplication.class, args);
	}

}
