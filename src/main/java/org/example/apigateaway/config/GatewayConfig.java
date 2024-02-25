package org.example.apigateaway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                // Route for serving static resources (including script.js)
                .route(p -> p
                        .path("/static/**")
                        .uri("classpath:/static/")
                )
                // Route for API endpoints
                .route(p -> p
                        .path("/api/tasks/**")
                        .uri("lb://task-manager")
                )
                // Add more routes for other APIs if needed
                .build();
    }
}
