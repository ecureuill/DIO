package ecureuill.flashcard;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.config.EnableReactiveMongoAuditing;

@SpringBootTest
@EnableReactiveMongoAuditing(dateTimeProviderRef = "dateTimeProvider")
class FlashcardApplicationTests {

	@Test
	void contextLoads() {
	}

}
