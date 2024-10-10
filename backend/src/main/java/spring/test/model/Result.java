package spring.test.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Result {

    PASS(1, "합격"),
    FAILURE(2, "불합격"),
    ONGOING(3, "진행 중");

    private final int id;
    private final String status;

    public static Result fromId(int id) {
        for (Result result : Result.values()) {
            if (result.getId() == id) {
                return result;
            }
        }
        throw new IllegalArgumentException("Invalid Result id: " + id);
    }
}
