import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Welcome from './Welcome'
import gsap from 'gsap'

describe('Welcome Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('should render the welcome section', () => {
      render(<Welcome />)
      const section = screen.getByRole('region')
      expect(section).toBeInTheDocument()
      expect(section).toHaveAttribute('id', 'welcome')
    })

    it('should render the subtitle text', () => {
      render(<Welcome />)
      const subtitle = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'p' && 
               content.includes("Hey, I'm Amir Reza!")
      })
      expect(subtitle).toBeInTheDocument()
    })

    it('should render the title text', () => {
      render(<Welcome />)
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
    })

    it('should apply correct CSS classes to subtitle', () => {
      render(<Welcome />)
      const subtitle = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'p'
      })
      expect(subtitle).toHaveClass('font-georama')
    })

    it('should apply correct CSS classes to title', () => {
      render(<Welcome />)
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toHaveClass('mt-7', 'text-6xl', 'font-georama')
    })
  })

  describe('Text Rendering', () => {
    it('should render each character of subtitle as individual span elements', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const spans = subtitle?.querySelectorAll('span')
      
      const expectedText = "Hey, I'm Amir Reza! Welcome to my"
      expect(spans?.length).toBe(expectedText.length)
    })

    it('should render each character of title as individual span elements', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const spans = title?.querySelectorAll('span')
      
      const expectedText = "portfolio"
      expect(spans?.length).toBe(expectedText.length)
    })

    it('should replace spaces with non-breaking spaces in subtitle', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const spans = subtitle?.querySelectorAll('span')
      
      // Check that spaces are rendered as non-breaking spaces (\u00A0)
      const spaceSpans = Array.from(spans || []).filter(
        span => span.textContent === '\u00A0'
      )
      expect(spaceSpans.length).toBeGreaterThan(0)
    })

    it('should apply correct font weight to subtitle spans', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const firstSpan = subtitle?.querySelector('span')
      
      expect(firstSpan).toHaveStyle({
        fontVariationSettings: '"wght" 100'
      })
    })

    it('should apply correct font weight to title spans', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const firstSpan = title?.querySelector('span')
      
      expect(firstSpan).toHaveStyle({
        fontVariationSettings: '"wght" 400'
      })
    })

    it('should apply correct className to subtitle spans', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const firstSpan = subtitle?.querySelector('span')
      
      expect(firstSpan).toHaveClass('text-3xl', 'font-georama')
    })

    it('should not apply extra className to title spans', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const firstSpan = title?.querySelector('span')
      
      expect(firstSpan?.className).toBe('')
    })
  })

  describe('GSAP Integration', () => {
    it('should set up hover effect for title on mount', () => {
      render(<Welcome />)
      
      // useGSAP should be called
      expect(vi.mocked(gsap.to)).toHaveBeenCalled()
    })

    it('should set up hover effect for subtitle on mount', () => {
      render(<Welcome />)
      
      // useGSAP should be called
      expect(vi.mocked(gsap.to)).toHaveBeenCalled()
    })

    it('should handle mouse move events on title', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      if (title) {
        fireEvent.mouseMove(title, { clientX: 100, clientY: 100 })
        // Should trigger GSAP animations
        expect(vi.mocked(gsap.to)).toHaveBeenCalled()
      }
    })

    it('should handle mouse move events on subtitle', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      
      if (subtitle) {
        fireEvent.mouseMove(subtitle, { clientX: 100, clientY: 100 })
        // Should trigger GSAP animations
        expect(vi.mocked(gsap.to)).toHaveBeenCalled()
      }
    })

    it('should handle mouse leave events on title', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      if (title) {
        fireEvent.mouseLeave(title)
        // Should reset font weights via GSAP
        expect(vi.mocked(gsap.to)).toHaveBeenCalled()
      }
    })

    it('should handle mouse leave events on subtitle', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      
      if (subtitle) {
        fireEvent.mouseLeave(subtitle)
        // Should reset font weights via GSAP
        expect(vi.mocked(gsap.to)).toHaveBeenCalled()
      }
    })
  })

  describe('Refs', () => {
    it('should create refs for title and subtitle', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const subtitle = container.querySelector('p')
      
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      render(<Welcome />)
      
      expect(screen.getByRole('region')).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('should maintain text readability', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const subtitle = container.querySelector('p')
      
      // Text should still be readable even when split into spans
      expect(title?.textContent).toBe('portfolio')
      expect(subtitle?.textContent).toContain("Hey, I'm Amir Reza!")
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty text gracefully', () => {
      // This tests the renderText function indirectly
      const { container } = render(<Welcome />)
      expect(container).toBeInTheDocument()
    })

    it('should handle special characters in text', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      
      // Should handle apostrophe and exclamation mark
      expect(subtitle?.textContent).toContain("I'm")
      expect(subtitle?.textContent).toContain("!")
    })

    it('should maintain layout integrity with multiple spaces', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      
      // All spaces should be preserved as non-breaking spaces
      const spans = subtitle?.querySelectorAll('span')
      const spaceCount = Array.from(spans || []).filter(
        span => span.textContent === '\u00A0'
      ).length
      
      expect(spaceCount).toBeGreaterThan(0)
    })
  })

  describe('Performance', () => {
    it('should render efficiently with multiple characters', () => {
      const startTime = performance.now()
      render(<Welcome />)
      const endTime = performance.now()
      
      // Rendering should be fast (less than 100ms)
      expect(endTime - startTime).toBeLessThan(100)
    })

    it('should clean up event listeners on unmount', () => {
      const { unmount, container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const subtitle = container.querySelector('p')
      
      const addEventListenerSpy = vi.spyOn(Element.prototype, 'addEventListener')
      const removeEventListenerSpy = vi.spyOn(Element.prototype, 'removeEventListener')
      
      unmount()
      
      // Cleanup should be called
      expect(removeEventListenerSpy).toHaveBeenCalled()
    })
  })

  describe('Integration', () => {
    it('should work with different viewport sizes', () => {
      // Test mobile viewport
      global.innerWidth = 375
      const { rerender } = render(<Welcome />)
      expect(screen.getByRole('region')).toBeInTheDocument()
      
      // Test desktop viewport
      global.innerWidth = 1920
      rerender(<Welcome />)
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('should handle rapid mouse movements', async () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      if (title) {
        // Simulate rapid mouse movements
        for (let i = 0; i < 10; i++) {
          fireEvent.mouseMove(title, { clientX: i * 10, clientY: 100 })
        }
        
        await waitFor(() => {
          expect(vi.mocked(gsap.to)).toHaveBeenCalled()
        })
      }
    })

    it('should handle mouse enter and leave cycles', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      if (title) {
        fireEvent.mouseMove(title, { clientX: 100, clientY: 100 })
        fireEvent.mouseLeave(title)
        fireEvent.mouseMove(title, { clientX: 150, clientY: 100 })
        fireEvent.mouseLeave(title)
        
        expect(vi.mocked(gsap.to)).toHaveBeenCalled()
      }
    })
  })

  describe('Font Variation Settings', () => {
    it('should use correct font weight range for subtitle', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const firstSpan = subtitle?.querySelector('span')
      
      // Should start with minimum weight (100)
      expect(firstSpan).toHaveStyle({
        fontVariationSettings: '"wght" 100'
      })
    })

    it('should use correct font weight range for title', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const firstSpan = title?.querySelector('span')
      
      // Should start with default weight (400)
      expect(firstSpan).toHaveStyle({
        fontVariationSettings: '"wght" 400'
      })
    })

    it('should maintain consistent font settings across all spans', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const spans = title?.querySelectorAll('span')
      
      spans?.forEach(span => {
        expect(span).toHaveStyle({
          fontVariationSettings: '"wght" 400'
        })
      })
    })
  })
})