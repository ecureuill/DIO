package ecureuill.flashcard.api.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import static org.springframework.http.HttpStatus.CREATED;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ecureuill.flashcard.api.controller.request.UserRequest;
import ecureuill.flashcard.api.controller.response.UserResponse;
import ecureuill.flashcard.api.mapper.UserMapper;
import ecureuill.flashcard.domain.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Validated
@RestController
@RequestMapping("users")
@Slf4j
@AllArgsConstructor
public class UserController {
    
    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    @ResponseStatus(CREATED)
    public Mono<UserResponse> save(@Valid @RequestBody final UserRequest request){
        return userService.save(userMapper.toDocument(request))
            .doFirst(() -> log.info("=== Saving a user with follow data {} ===", request))
            .map(userMapper::toResponse);
    }
}
