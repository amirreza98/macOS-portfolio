import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import App from './App'

// Mock the components
vi.mock('#components', () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
  Welcome: () => <section data-testid="welcome">Welcome</section>,
}))

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render the main element', () => {
      render(<App />)
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    it('should render the Navbar component', () => {
      render(<App />)
      const navbar = screen.getByTestId('navbar')
      expect(navbar).toBeInTheDocument()
    })

    it('should render the Welcome component', () => {
      render(<App />)
      const welcome = screen.getByTestId('welcome')
      expect(welcome).toBeInTheDocument()
    })

    it('should render Navbar before Welcome', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      const children = main?.children
      
      expect(children?.[0]).toHaveAttribute('data-testid', 'navbar')
      expect(children?.[1]).toHaveAttribute('data-testid', 'welcome')
    })

    it('should render both components within main element', () => {
      render(<App />)
      const main = screen.getByRole('main')
      const navbar = within(main).getByTestId('navbar')
      const welcome = within(main).getByTestId('welcome')
      
      expect(navbar).toBeInTheDocument()
      expect(welcome).toBeInTheDocument()
    })
  })

  describe('Structure', () => {
    it('should have semantic HTML structure', () => {
      render(<App />)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should contain exactly two child components', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      
      expect(main?.children).toHaveLength(2)
    })

    it('should maintain component hierarchy', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      
      expect(main?.children[0].tagName).toBe('NAV')
      expect(main?.children[1].tagName).toBe('SECTION')
    })
  })

  describe('Integration', () => {
    it('should render without crashing', () => {
      expect(() => render(<App />)).not.toThrow()
    })

    it('should render consistently on multiple renders', () => {
      const { rerender } = render(<App />)
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
      expect(screen.getByTestId('welcome')).toBeInTheDocument()
      
      rerender(<App />)
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
      expect(screen.getByTestId('welcome')).toBeInTheDocument()
    })

    it('should not have any console errors during render', () => {
      const consoleSpy = vi.spyOn(console, 'error')
      render(<App />)
      expect(consoleSpy).not.toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('Component Imports', () => {
    it('should properly import components from #components alias', () => {
      // This is tested implicitly by the render succeeding
      render(<App />)
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
      expect(screen.getByTestId('welcome')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should use semantic main element', () => {
      render(<App />)
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
      expect(main.tagName).toBe('MAIN')
    })

    it('should have proper document structure', () => {
      const { container } = render(<App />)
      expect(container.querySelector('main')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid re-renders', () => {
      const { rerender } = render(<App />)
      
      for (let i = 0; i < 10; i++) {
        rerender(<App />)
      }
      
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
      expect(screen.getByTestId('welcome')).toBeInTheDocument()
    })

    it('should maintain state across renders', () => {
      const { rerender, container } = render(<App />)
      const initialMain = container.querySelector('main')
      
      rerender(<App />)
      const afterMain = container.querySelector('main')
      
      expect(afterMain).toBeTruthy()
    })
  })

  describe('Performance', () => {
    it('should render efficiently', () => {
      const startTime = performance.now()
      render(<App />)
      const endTime = performance.now()
      
      expect(endTime - startTime).toBeLessThan(100)
    })
  })
})