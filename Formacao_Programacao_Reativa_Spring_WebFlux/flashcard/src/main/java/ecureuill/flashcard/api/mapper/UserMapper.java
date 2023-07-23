package ecureuill.flashcard.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import ecureuill.flashcard.api.controller.request.UserRequest;
import ecureuill.flashcard.api.controller.response.UserResponse;
import ecureuill.flashcard.domain.document.UserDocument;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    UserDocument toDocument(final UserRequest request);
    
    UserResponse toResponse(final UserDocument document);
    
}
