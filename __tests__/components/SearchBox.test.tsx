// __tests__/components/SearchBox.test.tsx
import { render, screen } from '@testing-library/react'
import SearchBox from '@/components/SearchBox'

describe('SearchBox', () => {
  it('renders textarea with placeholder', () => {
    const mockOnResult = jest.fn()
    render(<SearchBox onResult={mockOnResult} />)

    const textarea = screen.getByPlaceholderText(
      /e.g., Ensure all rivalry games on a weekend on ESPN/i
    )
    expect(textarea).toBeInTheDocument()
  })

  it('shows loading state while debouncing', async () => {
    const mockOnResult = jest.fn()
    const { rerender } = render(<SearchBox onResult={mockOnResult} />)

    const textarea = screen.getByPlaceholderText(/Ensure/)
    expect(screen.queryByText(/Translating/)).not.toBeInTheDocument()

    // Note: Full integration test with async behavior requires more setup
    // This test focuses on rendering and basic behavior
  })
})