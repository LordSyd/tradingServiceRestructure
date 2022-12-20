package com.beschtee.backend.config.jwt;


import com.beschtee.backend.Models.person.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@Component
public class JwtUtils {

    private String jwtSingingKey = "secret";
    // We need a signing key, so we'll create one just for this example. Usually
    // the key would be read from your application configuration instead.
    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    //private Key key = MacProvider.generateKey(SignatureAlgorithm.HS256);
    //String jws = Jwts.builder().setSubject("Joe").signWith(key).compact();

    //the username is always the subject (see method createToken)
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean hasClaim(String token, String claimName) {
        final Claims claims = extractAllClaims(token);
        return claims.get(claimName) != null;
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        //return Jwts.parser().setSigningKey(jwtSingingKey).parseClaimsJws(token).getBody();
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, user);
    }

    public String generateToken(User user, Map<String, Object> claims) {
        return createToken(claims, user);
    }

    private String createToken(Map<String, Object> claims, User user) {
        return Jwts.builder().setClaims(claims)
                .setSubject(user.getUsername())
                .claim("authorities", user.getAuthorities())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TimeUnit.HOURS.toMillis(24)))
                .signWith(key, SignatureAlgorithm.HS256).compact();
        //.signWith(SignatureAlgorithm.HS256, jwtSingingKey).compact();

        //String jws = Jwts.builder().setSubject("Joe").signWith(key).compact();
    }

    public Boolean isTokenValid(String token, User user) {
        final String username = extractUsername(token);
        System.out.println("The username is " + username);
        System.out.println("The Token is valid? : " + (username.equals(user.getUsername()) && !isTokenExpired(token)));
        return (username.equals(user.getUsername()) && !isTokenExpired(token));
    }
}
