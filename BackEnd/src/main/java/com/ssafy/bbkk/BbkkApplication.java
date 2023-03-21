package com.ssafy.bbkk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.Locale;
import java.util.TimeZone;

@EnableJpaAuditing // JPA Auditing 활성화
@SpringBootApplication
public class BbkkApplication {

	public static void main(String[] args) {
		SpringApplication.run(BbkkApplication.class, args);
	}
}
