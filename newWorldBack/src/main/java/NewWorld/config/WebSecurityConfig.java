package NewWorld.config;

import java.util.Collections;

//@Configuration
//@EnableWebSecurity
public class WebSecurityConfig {

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
//        httpSecurity.cors(corsCustomizer ->
//                        corsCustomizer.configurationSource(new CorsConfigurationSource() {
//                          @Override
//                          public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
//                              CorsConfiguration config = new CorsConfiguration();
//                              config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
//                              config.setAllowedMethods(Collections.singletonList("*"));
//                              config.setAllowCredentials(true);
//                              config.setAllowedHeaders(Collections.singletonList("*"));
//                              config.setMaxAge(3600L); //1시간
//                              return config;
//                          }
//                                                                              }
//                ))
//                .authorizeHttpRequests(request -> request
//                        .requestMatchers("/join","/loginMember","/test","/login").
//                        permitAll()
//                        .anyRequest().authenticated()
//                ).
//                formLogin(AbstractHttpConfigurer::disable).
//                httpBasic(AbstractHttpConfigurer::disable).
//                authorizeHttpRequests((authorizeRequests)->authorizeRequests.requestMatchers(new MvcRequestMatcher(intspector, "api/user")).permitAll().
//                        ).oauth2Login(oauth2Login ->
//                        oauth2Login.userInfoEndpoint(userInfoEndpointConfig ->
//                                userInfoEndpointConfig.userService(U)))
//
//
//
//        return httpSecurity.build();
 //   }
}
