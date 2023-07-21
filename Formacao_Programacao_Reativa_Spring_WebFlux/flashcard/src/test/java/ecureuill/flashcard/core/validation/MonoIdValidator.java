package ecureuill.flashcard.core.validation;

import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MonoIdValidator implements ConstraintValidator<MongoId, String> {

    @Override
    public void initialize(MongoId constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        log.info("=== checking if {} is a valid mongoId ===");
        return StringUtils.isNoneBlank(value) && ObjectId.isValid(value);
    }
    
}
