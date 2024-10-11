import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateSchedule from './CreateSchedule'; // 컴포넌트 경로에 맞게 수정

describe('CreateSchedule Component', () => {
  const mockAddResult = jest.fn();

  beforeEach(() => {
    // 매번 새로운 컴포넌트를 렌더링하도록 초기화
    mockAddResult.mockClear();
  });

  test('renders the form fields correctly', () => {
    render(<CreateSchedule addResult={mockAddResult} />);

    // 입력 필드가 제대로 렌더링 되는지 확인
    expect(screen.getByLabelText(/회사명/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/서류지원 마감/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/결과 발표/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/결과/i)).toBeInTheDocument();
    expect(screen.getByText(/추가/i)).toBeInTheDocument(); // 버튼 확인
  });

 
});
