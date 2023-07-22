package ecureuill.flashcard.domain.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import ecureuill.flashcard.domain.document.DeckDocument;

@Repository
public interface DeckRepository extends ReactiveMongoRepository<DeckDocument, String>{
    
}
