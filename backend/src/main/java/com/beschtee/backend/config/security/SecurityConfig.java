package com.beschtee.backend.config.security;

import com.beschtee.backend.Models.person.UserRole;
import com.beschtee.backend.Services.UserService;
import com.beschtee.backend.config.jwt.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                //.cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()
                //all users (anonymous and logged in) can access this route
                //TODO: for now, access to the register route is not constrained
                //TODO: after FE and BE are finished, remove register route and uncomment the below constraint for employees only
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/register")
                        .permitAll()
                )
                //all authenticated users with authority EMPLOYEE can access this route
                /*
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers( HttpMethod.POST, "/api/register")
                        .hasAuthority(UserRole.EMPLOYEE.name())
                )
                 */
                //all users (anonymous and logged in) can access this route
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers(HttpMethod.POST, "/api/auth")
                                .permitAll()
                )
                //all authenticated users can access depot information
                .authorizeHttpRequests( auth -> auth
                        .requestMatchers( "/api/user/depot", "/api/user/username" )
                        .authenticated()
                )
                .authorizeHttpRequests( auth -> auth
                    .requestMatchers( "/api/user/**" )
                        .hasAuthority(UserRole.EMPLOYEE.name())
                )
                //only authenticated users can access the rest of the URL space
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers("/api/**").authenticated()
                )
                .sessionManagement( sess -> sess
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                //user jwtAuthFilter before Username and Password Auth Filter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                /*
                .logout()
                .logoutSuccessUrl("/logout")
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))
                .clearAuthentication(true)
                .logoutSuccessUrl("/api/dashboard")

                 */
            //.httpBasic(); //how authentication
        ;

        // http.formLogin();
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        final DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        authenticationProvider.setUserDetailsService(userService);
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000/"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
