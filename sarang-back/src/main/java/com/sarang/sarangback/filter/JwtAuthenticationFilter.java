package com.sarang.sarangback.filter;

import java.io.IOException;

import org.hibernate.validator.internal.util.logging.LoggerFactory;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.sarang.sarangback.provider.JwtProvider;

import ch.qos.logback.classic.Logger;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/*
 * HTTP 요청을 가로채 JWT 토큰을 추출하고, JwtProvider 를 사용하여 토큰 유효성 검사한다.
 * 토큰이 유효한 경우, 사용자 인증을 위해 인증토큰(AbstractAuthenticationToken)을 생성하고,
 * SecurityContext 에 설정한다.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;

    // 들어오는 요청을 가로채어 요청 헤더에서 JWT 토큰 추출 시도
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String token = parseBearerToken(request);
            log.info("error log={}", token);
            // signkey가 안 맞거나, 만료된 경우 null
            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }

            // 토큰이 유효한 경우, 토큰에서 사용자 이메일 추출
            String email = jwtProvider.validate(token);
            log.info("error log={}", email);
            // signingkey가 안맞거나 만료되었거나
            if (email == null) {
                filterChain.doFilter(request, response);
                return;
            }

            AbstractAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null,
                    AuthorityUtils.NO_AUTHORITIES);

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(authenticationToken);

            SecurityContextHolder.setContext(securityContext);
        } catch (Exception e) {
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);

    }

    // request 에서 헤더 가져와서 헤더의 Authorization 키 찾고 bearer인증?
    private String parseBearerToken(HttpServletRequest request) {
        // 철자 주의
        String authorization = request.getHeader("Authorization");

        // hasText()는 해당값이 비어있으면 false .
        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization)
            return null;

        // 띄어쓰기 주의
        boolean isBearer = authorization.startsWith("Bearer ");
        if (!isBearer)
            return null;

        // 7번 인덱스부터 꺼내온다.
        String token = authorization.substring(7);
        return token;

    }

}
