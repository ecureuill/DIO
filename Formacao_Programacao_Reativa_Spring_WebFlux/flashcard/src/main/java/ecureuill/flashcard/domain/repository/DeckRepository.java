package ecureuill.flashcard.domain.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import ecureuill.flashcard.domain.document.DeckDocument;

public interface DeckRepository extends ReactiveMongoRepository<DeckDocument, String>{
    
}
