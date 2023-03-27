package com.ssafy.bbkk.config;


import com.ssafy.bbkk.common.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.bbkk.common.jwt.TokenProvider;
import com.ssafy.bbkk.common.oauth.PrincipalOauth2UserService;
import com.ssafy.bbkk.handler.JwtAccessDeniedHandler;
import com.ssafy.bbkk.handler.OAuth2AuthenticationSuccessHandler;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class SecurityConfig{

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final PrincipalOauth2UserService principalOauth2UserService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http
            // exception handling 할 때 우리가 만든 클래스를 추가
            .exceptionHandling()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .accessDeniedHandler(jwtAccessDeniedHandler)

        .and()
            .cors()
            .configurationSource(corsConfigurationSource())

        .and()
            .headers()
            .frameOptions()
            .sameOrigin()

            // 시큐리티는 기본적으로 세션을 사용
            // 여기서는 세션을 사용하지 않기 때문에 세션 설정을 Stateless 로 설정
        .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

            // 로그인, 회원가입 API 는 토큰이 없는 상태에서 요청이 들어오기 때문에 permitAll 설정
        .and()
            .authorizeRequests()
            .antMatchers(PERMIT_URL_ARRAY).permitAll()
            .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
//            .antMatchers("/user/oauth/login",
//                    "/profile/**",
//                    "/theme/user",
//                    "/interest/**",
//                    "/review/**",
//                    "/groupset/**"
//                    ).authenticated()
             .antMatchers("/jwt/**").authenticated()
            .anyRequest().permitAll()

            // JwtFilter 를 addFilterBefore 로 등록했던 JwtSecurityConfig 클래스를 적용
        .and()
            .apply(new JwtSecurityConfig(tokenProvider))

            // oauth2 를 이용한 소셜 로그인 설정 적용
        .and()
            .oauth2Login()
            .userInfoEndpoint()
            .userService(principalOauth2UserService)

        .and()
            .successHandler(oAuth2AuthenticationSuccessHandler)
        ;

        return http.build();
    }

    private static final String[] PERMIT_URL_ARRAY = {
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**"
    };

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();


        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedOrigin("https://bbkk.store");
        config.addAllowedOrigin("http://localhost:8081");
        config.addAllowedOrigin("http://bbkk.store:8081");
        config.addAllowedOrigin("http://localhost:8082");
        config.addAllowedMethod("*"); // 모든 메소드 허용.
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        System.out.println(config);



        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}