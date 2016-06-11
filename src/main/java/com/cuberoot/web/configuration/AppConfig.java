package com.cuberoot.web.configuration;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.cuberoot.web")
public class AppConfig  extends WebMvcConfigurerAdapter  
{
	
	@Bean
	public ViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix("/WEB-INF/views/");
		viewResolver.setSuffix(".jsp");

		return viewResolver;
	}
	@Override public void addResourceHandlers(ResourceHandlerRegistry registry) 
	{ 
		registry.addResourceHandler("/static/**").addResourceLocations("/static/");
		  // registry.addResourceHandler("/css/**").addResourceLocations("/css/").setCachePeriod(31556926);
	      //registry.addResourceHandler("/img/**").addResourceLocations("/img/").setCachePeriod(31556926);
	      //registry.addResourceHandler("/js/**").addResourceLocations("/js/").setCachePeriod(31556926);
	} 
	
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
	@Bean
	public MessageSource messageSource() {
	    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
	    messageSource.setBasename("messages");
	    return messageSource;
	}
	@Override
	  public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		converters.add(jsonConverter());
	    converters.add(new StringHttpMessageConverter(Charset.forName("UTF-8")));
	 }
	
	@Bean
	public ObjectMapper jacksonObjectMapper() {
	ObjectMapper objectMapper = new ObjectMapper();
	objectMapper.setSerializationInclusion(Include.NON_NULL);
	return objectMapper;
	}
	
	@Bean
	public MappingJackson2HttpMessageConverter jsonConverter() {
	MappingJackson2HttpMessageConverter jacksonConverter = new
	MappingJackson2HttpMessageConverter();
	jacksonConverter.setSupportedMediaTypes(Arrays.asList(MediaType.valueOf("application/json")));
	jacksonConverter.setObjectMapper(jacksonObjectMapper());
	return jacksonConverter;
	}
	
}

