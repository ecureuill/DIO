package ecureuill.flashcard.core.mongo.converter;

import java.time.OffsetDateTime;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;

public class DateToOffsetDateTimeConverter implements Converter<OffsetDateTime, Date> {

    @Override
    public Date convert(OffsetDateTime source) {
        return Date.from(source.toInstant());
    }
    
}
