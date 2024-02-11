package NewWorld.config;

import ch.qos.logback.core.net.LoginAuthenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.DispatcherType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable().cors().disable()
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/join").permitAll()
                        .anyRequest().authenticated()
                ).
                formLogin(login -> login
                        .loginPage("/login")
                        .loginProcessingUrl("/loginMember")
                        .usernameParameter("userId")
                        .passwordParameter("userPassword")
                        .defaultSuccessUrl("/",true)
                        .permitAll()

                )
                .logout(Customizer.withDefaults());

        return httpSecurity.build();
    }
}
