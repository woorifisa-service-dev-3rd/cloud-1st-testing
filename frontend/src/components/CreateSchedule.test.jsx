import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateSchedule from './CreateSchedule';

describe('CreateSchedule 컴포넌트 테스트', () => {
  const mockAddResult = jest.fn(); // addResult prop을 모킹합니다.

  beforeEach(() => {
    // 각 테스트 전에 컴포넌트를 렌더링합니다.
    render(<CreateSchedule addResult={mockAddResult} />);
  });

  test('컴포넌트가 정상적으로 렌더링된다', () => {
    // "스케줄 추가" 제목이 문서에 존재하는지 확인합니다.
    expect(screen.getByText(/스케줄 추가/i)).toBeInTheDocument();

    // 각 입력 필드가 문서에 있는지 확인합니다.
    expect(screen.getByLabelText(/회사명/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/서류지원 마감/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/결과 발표/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/결과/i)).toBeInTheDocument();

    // "추가" 버튼이 문서에 존재하는지 확인합니다.
    expect(screen.getByRole('button', { name: /추가/i })).toBeInTheDocument();
  });

  test('입력 필드에 값을 입력한 후 제출 시 addResult가 호출된다', () => {
    // 입력 필드에 값을 입력합니다.
    fireEvent.change(screen.getByLabelText(/회사명/i), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByLabelText(/서류지원 마감/i), { target: { value: '2024-10-15T12:00' } });
    fireEvent.change(screen.getByLabelText(/결과 발표/i), { target: { value: '2024-10-20T12:00' } });
    fireEvent.change(screen.getByLabelText(/결과/i), { target: { value: '합격' } });

    // 제출 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /추가/i }));

    // addResult가 올바른 인수로 호출되었는지 확인합니다.
    expect(mockAddResult).toHaveBeenCalledWith({
      company_name: 'Test Company',
      deadline: '2024-10-15T12:00',
      result_date: '2024-10-20T12:00',
      result: 1, // "합격"이므로 result는 1입니다.
    });

    // 폼이 제출된 후에 값이 초기화되었는지 확인합니다.
    expect(screen.getByLabelText(/회사명/i).value).toBe('');
    expect(screen.getByLabelText(/서류지원 마감/i).value).toBe('');
    expect(screen.getByLabelText(/결과 발표/i).value).toBe('');
    expect(screen.getByLabelText(/결과/i).value).toBe('진행 중'); // 초기값
  });

  test('결과 선택이 변경되면 상태가 업데이트된다', () => {
    // "불합격" 선택
    fireEvent.change(screen.getByLabelText(/결과/i), { target: { value: '불합격' } });
    expect(screen.getByLabelText(/결과/i).value).toBe('불합격');

    // "진행 중" 선택
    fireEvent.change(screen.getByLabelText(/결과/i), { target: { value: '진행 중' } });
    expect(screen.getByLabelText(/결과/i).value).toBe('진행 중');
  });
});
