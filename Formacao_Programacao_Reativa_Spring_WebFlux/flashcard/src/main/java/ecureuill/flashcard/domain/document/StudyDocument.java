package ecureuill.flashcard.domain.document;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Builder;

@Document(collection = "study_decks")
public record StudyDocument(
    @Id
    String id,
    String userId,
    StudyDeck studyDeck,
    List<Question> questions,

    @CreatedDate
    @Field("created_at")
    OffsetDateTime createdAt,
    
    @LastModifiedDate
    @Field("updated_at")
    OffsetDateTime updatedAt
){ 
    @Builder(toBuilder = true)
    public StudyDocument {}
}
