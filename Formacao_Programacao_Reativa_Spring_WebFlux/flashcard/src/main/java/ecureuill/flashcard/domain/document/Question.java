package ecureuill.flashcard.domain.document;

public record Question(
    String asked,
    String answered,
    String expected
){}
