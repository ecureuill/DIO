package ecureuill.flashcard.domain.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import ecureuill.flashcard.domain.document.UserDocument;

public interface UserRepository extends ReactiveMongoRepository<UserDocument, String> {
    
}
