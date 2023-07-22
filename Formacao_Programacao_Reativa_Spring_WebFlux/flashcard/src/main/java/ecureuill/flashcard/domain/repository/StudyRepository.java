package ecureuill.flashcard.domain.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import ecureuill.flashcard.domain.document.StudyDocument;

public interface StudyRepository extends ReactiveMongoRepository<StudyDocument, String> {
    
}
