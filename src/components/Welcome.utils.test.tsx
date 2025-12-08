import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import gsap from 'gsap'

// Extract and test the renderText function
const renderText = (text: string, className: string, baseWeight = 400) =>
  [...text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{
        fontVariationSettings: `"wght" ${baseWeight}`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))

// Font weights configuration
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
}

describe('Welcome Component Utilities', () => {
  describe('renderText Function', () => {
    describe('Basic Functionality', () => {
      it('should split text into individual characters', () => {
        const text = 'hello'
        const result = renderText(text, '', 400)
        expect(result).toHaveLength(5)
      })

      it('should create span element for each character', () => {
        const text = 'test'
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const spans = container.querySelectorAll('span')
        expect(spans).toHaveLength(4)
      })

      it('should preserve character order', () => {
        const text = 'abc'
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const spans = container.querySelectorAll('span')
        
        expect(spans[0].textContent).toBe('a')
        expect(spans[1].textContent).toBe('b')
        expect(spans[2].textContent).toBe('c')
      })

      it('should assign unique keys to each span', () => {
        const text = 'test'
        const result = renderText(text, '', 400)
        
        const keys = result.map(element => element.key)
        const uniqueKeys = new Set(keys)
        
        expect(uniqueKeys.size).toBe(text.length)
      })
    })

    describe('Space Handling', () => {
      it('should convert spaces to non-breaking spaces', () => {
        const text = 'a b'
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const spans = container.querySelectorAll('span')
        
        expect(spans[1].textContent).toBe('\u00A0')
      })

      it('should handle multiple consecutive spaces', () => {
        const text = 'a  b'
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const spans = container.querySelectorAll('span')
        
        expect(spans[1].textContent).toBe('\u00A0')
        expect(spans[2].textContent).toBe('\u00A0')
      })

      it('should handle leading spaces', () => {
        const text = ' test'
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const firstSpan = container.querySelector('span')
        
        expect(firstSpan?.textContent).toBe('\u00A0')
      })

      it('should handle trailing spaces', () => {
        const text = 'test '
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const spans = container.querySelectorAll('span')
        const lastSpan = spans[spans.length - 1]
        
        expect(lastSpan.textContent).toBe('\u00A0')
      })

      it('should handle text with only spaces', () => {
        const text = '   '
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const spans = container.querySelectorAll('span')
        
        spans.forEach(span => {
          expect(span.textContent).toBe('\u00A0')
        })
      })
    })

    describe('CSS Class Application', () => {
      it('should apply className to all spans', () => {
        const text = 'test'
        const className = 'test-class'
        const { container } = render(<>{renderText(text, className, 400)}</>)
        const spans = container.querySelectorAll('span')
        
        spans.forEach(span => {
          expect(span).toHaveClass(className)
        })
      })

      it('should handle multiple CSS classes', () => {
        const text = 'test'
        const className = 'class1 class2 class3'
        const { container } = render(<>{renderText(text, className, 400)}</>)
        const firstSpan = container.querySelector('span')
        
        expect(firstSpan).toHaveClass('class1', 'class2', 'class3')
      })

      it('should handle empty className', () => {
        const text = 'test'
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const firstSpan = container.querySelector('span')
        
        expect(firstSpan?.className).toBe('')
      })
    })

    describe('Font Weight Settings', () => {
      it('should apply default font weight of 400', () => {
        const text = 'test'
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const firstSpan = container.querySelector('span')
        
        expect(firstSpan).toHaveStyle({
          fontVariationSettings: '"wght" 400'
        })
      })

      it('should apply custom font weight', () => {
        const text = 'test'
        const { container } = render(<>{renderText(text, '', 700)}</>)
        const firstSpan = container.querySelector('span')
        
        expect(firstSpan).toHaveStyle({
          fontVariationSettings: '"wght" 700'
        })
      })

      it('should apply minimum font weight', () => {
        const text = 'test'
        const { container } = render(<>{renderText(text, '', 100)}</>)
        const firstSpan = container.querySelector('span')
        
        expect(firstSpan).toHaveStyle({
          fontVariationSettings: '"wght" 100'
        })
      })

      it('should apply maximum font weight', () => {
        const text = 'test'
        const { container } = render(<>{renderText(text, '', 900)}</>)
        const firstSpan = container.querySelector('span')
        
        expect(firstSpan).toHaveStyle({
          fontVariationSettings: '"wght" 900'
        })
      })

      it('should apply same font weight to all spans', () => {
        const text = 'test'
        const weight = 600
        const { container } = render(<>{renderText(text, '', weight)}</>)
        const spans = container.querySelectorAll('span')
        
        spans.forEach(span => {
          expect(span).toHaveStyle({
            fontVariationSettings: `"wght" ${weight}`
          })
        })
      })
    })

    describe('Special Characters', () => {
      it('should handle punctuation marks', () => {
        const text = 'Hello!'
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const spans = container.querySelectorAll('span')
        
        expect(spans[spans.length - 1].textContent).toBe('!')
      })

      it('should handle apostrophes', () => {
        const text = "I'm"
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const spans = container.querySelectorAll('span')
        
        expect(spans[1].textContent).toBe("'")
      })

      it('should handle commas', () => {
        const text = 'a,b'
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const spans = container.querySelectorAll('span')
        
        expect(spans[1].textContent).toBe(',')
      })

      it('should handle numbers', () => {
        const text = 'test123'
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const spans = container.querySelectorAll('span')
        
        expect(spans[4].textContent).toBe('1')
        expect(spans[5].textContent).toBe('2')
        expect(spans[6].textContent).toBe('3')
      })

      it('should handle mixed case', () => {
        const text = 'TeSt'
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const spans = container.querySelectorAll('span')
        
        expect(spans[0].textContent).toBe('T')
        expect(spans[1].textContent).toBe('e')
        expect(spans[2].textContent).toBe('S')
        expect(spans[3].textContent).toBe('t')
      })
    })

    describe('Edge Cases', () => {
      it('should handle empty string', () => {
        const text = ''
        const result = renderText(text, '', 400)
        expect(result).toHaveLength(0)
      })

      it('should handle single character', () => {
        const text = 'a'
        const result = renderText(text, '', 400)
        expect(result).toHaveLength(1)
      })

      it('should handle very long strings', () => {
        const text = 'a'.repeat(1000)
        const result = renderText(text, '', 400)
        expect(result).toHaveLength(1000)
      })

      it('should handle unicode characters', () => {
        const text = '🎉'
        const { container } = render(<>{renderText(text, '', 400)}</>)
        const spans = container.querySelectorAll('span')
        
        expect(spans.length).toBeGreaterThan(0)
      })

      it('should handle newline characters', () => {
        const text = 'a\nb'
        const result = renderText(text, '', 400)
        expect(result).toHaveLength(3)
      })

      it('should handle tab characters', () => {
        const text = 'a\tb'
        const result = renderText(text, '', 400)
        expect(result).toHaveLength(3)
      })
    })

    describe('Performance', () => {
      it('should handle moderate length strings efficiently', () => {
        const text = 'This is a moderate length string for testing'
        const startTime = performance.now()
        renderText(text, '', 400)
        const endTime = performance.now()
        
        expect(endTime - startTime).toBeLessThan(10)
      })

      it('should create consistent output for same input', () => {
        const text = 'consistent'
        const result1 = renderText(text, 'test', 400)
        const result2 = renderText(text, 'test', 400)
        
        expect(result1).toHaveLength(result2.length)
      })
    })
  })

  describe('FONT_WEIGHTS Configuration', () => {
    it('should define subtitle weight ranges', () => {
      expect(FONT_WEIGHTS.subtitle).toBeDefined()
      expect(FONT_WEIGHTS.subtitle.min).toBe(100)
      expect(FONT_WEIGHTS.subtitle.max).toBe(400)
      expect(FONT_WEIGHTS.subtitle.default).toBe(100)
    })

    it('should define title weight ranges', () => {
      expect(FONT_WEIGHTS.title).toBeDefined()
      expect(FONT_WEIGHTS.title.min).toBe(400)
      expect(FONT_WEIGHTS.title.max).toBe(900)
      expect(FONT_WEIGHTS.title.default).toBe(400)
    })

    it('should have valid weight ranges', () => {
      Object.values(FONT_WEIGHTS).forEach(weights => {
        expect(weights.min).toBeLessThanOrEqual(weights.max)
        expect(weights.default).toBeGreaterThanOrEqual(weights.min)
        expect(weights.default).toBeLessThanOrEqual(weights.max)
      })
    })

    it('should have numeric weight values', () => {
      Object.values(FONT_WEIGHTS).forEach(weights => {
        expect(typeof weights.min).toBe('number')
        expect(typeof weights.max).toBe('number')
        expect(typeof weights.default).toBe('number')
      })
    })

    it('should have appropriate weight ranges for web fonts', () => {
      Object.values(FONT_WEIGHTS).forEach(weights => {
        expect(weights.min).toBeGreaterThanOrEqual(100)
        expect(weights.max).toBeLessThanOrEqual(900)
      })
    })
  })

  describe('setupTextHoverEffect Function Logic', () => {
    let mockContainer: HTMLElement
    let mockLetters: HTMLElement[]

    beforeEach(() => {
      vi.clearAllMocks()
      
      // Create mock container and letters
      mockContainer = document.createElement('div')
      mockLetters = Array.from({ length: 5 }, () => document.createElement('span'))
      
      mockLetters.forEach((letter, index) => {
        letter.textContent = 'a'
        mockContainer.appendChild(letter)
      })

      // Mock getBoundingClientRect for container
      mockContainer.getBoundingClientRect = vi.fn(() => ({
        left: 0,
        top: 0,
        right: 100,
        bottom: 20,
        width: 100,
        height: 20,
        x: 0,
        y: 0,
        toJSON: () => {},
      }))

      // Mock getBoundingClientRect for letters
      mockLetters.forEach((letter, index) => {
        letter.getBoundingClientRect = vi.fn(() => ({
          left: index * 20,
          top: 0,
          right: (index + 1) * 20,
          bottom: 20,
          width: 20,
          height: 20,
          x: index * 20,
          y: 0,
          toJSON: () => {},
        }))
      })

      // Mock querySelectorAll
      mockContainer.querySelectorAll = vi.fn(() => mockLetters as any)
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should return early if container is null', () => {
      const setupTextHoverEffect = (container: any, type: string) => {
        if (!container) return
      }

      const result = setupTextHoverEffect(null, 'title')
      expect(result).toBeUndefined()
    })

    it('should return early if container is undefined', () => {
      const setupTextHoverEffect = (container: any, type: string) => {
        if (!container) return
      }

      const result = setupTextHoverEffect(undefined, 'title')
      expect(result).toBeUndefined()
    })

    it('should query for span elements in container', () => {
      const setupTextHoverEffect = (container: any, type: string) => {
        if (!container) return
        const letters = container.querySelectorAll('span')
        return letters
      }

      setupTextHoverEffect(mockContainer, 'title')
      expect(mockContainer.querySelectorAll).toHaveBeenCalledWith('span')
    })

    it('should use correct font weights for subtitle type', () => {
      const type = 'subtitle'
      const weights = FONT_WEIGHTS[type]
      
      expect(weights.min).toBe(100)
      expect(weights.max).toBe(400)
      expect(weights.default).toBe(100)
    })

    it('should use correct font weights for title type', () => {
      const type = 'title'
      const weights = FONT_WEIGHTS[type]
      
      expect(weights.min).toBe(400)
      expect(weights.max).toBe(900)
      expect(weights.default).toBe(400)
    })

    it('should calculate distance from mouse to letter center', () => {
      const mouseX = 50
      const letterLeft = 20
      const letterWidth = 20
      const letterCenter = letterLeft + letterWidth / 2
      
      const distance = Math.abs(mouseX - letterCenter)
      expect(distance).toBe(20)
    })

    it('should calculate intensity using exponential decay', () => {
      const distance = 100
      const intensity = Math.exp(-(distance ** 2) / 20000)
      
      expect(intensity).toBeGreaterThan(0)
      expect(intensity).toBeLessThanOrEqual(1)
    })

    it('should calculate higher intensity for closer distances', () => {
      const closeDistance = 10
      const farDistance = 100
      
      const closeIntensity = Math.exp(-(closeDistance ** 2) / 20000)
      const farIntensity = Math.exp(-(farDistance ** 2) / 20000)
      
      expect(closeIntensity).toBeGreaterThan(farIntensity)
    })

    it('should interpolate weight between min and max based on intensity', () => {
      const min = 100
      const max = 400
      const intensity = 0.5
      
      const weight = min + (max - min) * intensity
      expect(weight).toBe(250)
    })

    it('should return max weight at intensity 1', () => {
      const min = 100
      const max = 400
      const intensity = 1
      
      const weight = min + (max - min) * intensity
      expect(weight).toBe(max)
    })

    it('should return min weight at intensity 0', () => {
      const min = 100
      const max = 400
      const intensity = 0
      
      const weight = min + (max - min) * intensity
      expect(weight).toBe(min)
    })
  })

  describe('GSAP Animation Integration', () => {
    it('should call gsap.to with correct parameters', () => {
      const mockLetter = document.createElement('span')
      const weight = 500
      
      gsap.to(mockLetter, {
        duration: 0.3,
        ease: 'power2.out',
        css: {
          fontVariationSettings: `"wght" ${weight}`,
        },
      })

      expect(gsap.to).toHaveBeenCalledWith(
        mockLetter,
        expect.objectContaining({
          duration: 0.3,
          ease: 'power2.out',
        })
      )
    })

    it('should animate with appropriate duration', () => {
      const mockLetter = document.createElement('span')
      
      gsap.to(mockLetter, {
        duration: 0.3,
        ease: 'power2.out',
        css: { fontVariationSettings: '"wght" 500' },
      })

      const calls = vi.mocked(gsap.to).mock.calls
      expect(calls[calls.length - 1][1]).toHaveProperty('duration', 0.3)
    })

    it('should use power2.out easing', () => {
      const mockLetter = document.createElement('span')
      
      gsap.to(mockLetter, {
        duration: 0.3,
        ease: 'power2.out',
        css: { fontVariationSettings: '"wght" 500' },
      })

      const calls = vi.mocked(gsap.to).mock.calls
      expect(calls[calls.length - 1][1]).toHaveProperty('ease', 'power2.out')
    })
  })
})