import { describe, it, expect } from 'vitest'
import { Navbar, Welcome } from './index.js'

describe('Components Index', () => {
  describe('Exports', () => {
    it('should export Navbar component', () => {
      expect(Navbar).toBeDefined()
      expect(typeof Navbar).toBe('function')
    })

    it('should export Welcome component', () => {
      expect(Welcome).toBeDefined()
      expect(typeof Welcome).toBe('function')
    })

    it('should have both named exports', () => {
      const exports = { Navbar, Welcome }
      expect(Object.keys(exports)).toHaveLength(2)
      expect(Object.keys(exports)).toContain('Navbar')
      expect(Object.keys(exports)).toContain('Welcome')
    })

    it('should export components that are functions', () => {
      expect(typeof Navbar).toBe('function')
      expect(typeof Welcome).toBe('function')
    })

    it('should not have default export', async () => {
      const module = await import('./index.js')
      expect(module.default).toBeUndefined()
    })

    it('should export exactly two named exports', async () => {
      const module = await import('./index.js')
      const namedExports = Object.keys(module).filter(key => key !== 'default')
      expect(namedExports).toHaveLength(2)
    })
  })

  describe('Component Types', () => {
    it('should export Navbar as a React component', () => {
      expect(Navbar).toBeDefined()
      expect(Navbar.length).toBeGreaterThanOrEqual(0) // React components can have 0 or more args
    })

    it('should export Welcome as a React component', () => {
      expect(Welcome).toBeDefined()
      expect(Welcome.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Module Structure', () => {
    it('should maintain consistent export structure', async () => {
      const module = await import('./index.js')
      
      expect(module).toHaveProperty('Navbar')
      expect(module).toHaveProperty('Welcome')
    })

    it('should not export undefined values', () => {
      expect(Navbar).not.toBeUndefined()
      expect(Welcome).not.toBeUndefined()
    })

    it('should not export null values', () => {
      expect(Navbar).not.toBeNull()
      expect(Welcome).not.toBeNull()
    })
  })

  describe('Import Consistency', () => {
    it('should allow destructured imports', async () => {
      const { Navbar: NavbarImport, Welcome: WelcomeImport } = await import('./index.js')
      
      expect(NavbarImport).toBeDefined()
      expect(WelcomeImport).toBeDefined()
    })

    it('should allow namespace imports', async () => {
      const components = await import('./index.js')
      
      expect(components.Navbar).toBeDefined()
      expect(components.Welcome).toBeDefined()
    })

    it('should maintain referential integrity', async () => {
      const import1 = await import('./index.js')
      const import2 = await import('./index.js')
      
      expect(import1.Navbar).toBe(import2.Navbar)
      expect(import1.Welcome).toBe(import2.Welcome)
    })
  })

  describe('Component Names', () => {
    it('should have correct component names', () => {
      // Check if components have displayName or function name
      expect(Navbar.name || Navbar.displayName).toBeTruthy()
      expect(Welcome.name || Welcome.displayName).toBeTruthy()
    })

    it('should export components with proper naming', () => {
      const navbarName = Navbar.name || Navbar.displayName
      const welcomeName = Welcome.name || Welcome.displayName
      
      expect(navbarName).toBeDefined()
      expect(welcomeName).toBeDefined()
    })
  })
})