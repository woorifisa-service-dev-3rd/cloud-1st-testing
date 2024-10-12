import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import EditSchedule from "./EditSchedule";

describe("EditSchedule 컴포넌트 테스트", () => {
  const mockResult = {
    id: 1,
    company_name: "회사 A",
    deadline: "2024-10-12T12:00",
    result_date: "2024-10-15T12:00",
    result: "합격",
  };

  test("폼이 올바르게 렌더링된다", () => {
    render(<EditSchedule result={mockResult} updateResult={jest.fn()} />);

    expect(screen.getByTestId("company-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("deadline-input")).toBeInTheDocument();
    expect(screen.getByTestId("result-date-input")).toBeInTheDocument();
    expect(screen.getByTestId("result-select")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  test("입력 필드에 값을 입력하고 제출하면 updateResult가 호출된다", () => {
    const updateResultMock = jest.fn();
    render(
      <EditSchedule result={mockResult} updateResult={updateResultMock} />
    );

    // 입력값 설정
    fireEvent.change(screen.getByTestId("company-name-input"), {
      target: { value: "회사 B" },
    });
    fireEvent.change(screen.getByTestId("deadline-input"), {
      target: { value: "2024-10-13T12:00" },
    });
    fireEvent.change(screen.getByTestId("result-date-input"), {
      target: { value: "2024-10-16T12:00" },
    });
    fireEvent.change(screen.getByTestId("result-select"), {
      target: { value: "불합격" },
    });

    // 제출 버튼 클릭
    fireEvent.click(screen.getByTestId("submit-button"));

    // updateResult가 호출되었는지 확인
    expect(updateResultMock).toHaveBeenCalledWith({
      id: 1,
      company_name: "회사 B",
      deadline: "2024-10-13T12:00",
      result_date: "2024-10-16T12:00",
      result: 2, // "불합격" 선택 시 result는 2
    });
  });

  test("폼 제출 후 입력값이 초기화된다", () => {
    const updateResultMock = jest.fn();
    render(
      <EditSchedule result={mockResult} updateResult={updateResultMock} />
    );

    // 입력값 설정
    fireEvent.change(screen.getByTestId("company-name-input"), {
      target: { value: "회사 B" },
    });
    fireEvent.change(screen.getByTestId("deadline-input"), {
      target: { value: "2024-10-13T12:00" },
    });
    fireEvent.change(screen.getByTestId("result-date-input"), {
      target: { value: "2024-10-16T12:00" },
    });
    fireEvent.change(screen.getByTestId("result-select"), {
      target: { value: "불합격" },
    });

    // 수정 버튼 클릭
    fireEvent.click(screen.getByTestId("submit-button"));

    // 입력 필드가 초기화되었는지 확인
    expect(screen.getByTestId("company-name-input").value).toBe("");
    expect(screen.getByTestId("deadline-input").value).toBe("");
    expect(screen.getByTestId("result-date-input").value).toBe("");
    expect(screen.getByTestId("result-select").value).toBe("진행 중"); 
  });
});
