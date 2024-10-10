package spring.test.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ResultConverter implements AttributeConverter<Result, Integer> {

    // Enum -> DB 값 (id) 변환
    @Override
    public Integer convertToDatabaseColumn(Result result) {
        if (result == null) {
            return null;
        }
        return result.getId();  // Enum의 id를 DB에 저장
    }

    // DB 값 (id) -> Enum 변환
    @Override
    public Result convertToEntityAttribute(Integer id) {
        if (id == null) {
            return null;
        }
        return Result.fromId(id);  // DB에서 읽은 id를 Enum으로 변환
    }
}
