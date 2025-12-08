# Testing Documentation

This document describes the comprehensive test suite for the macOS Portfolio project.

## Overview

The test suite uses **Vitest** as the test runner and **React Testing Library** for component testing. The tests are organized into multiple categories to ensure thorough coverage.

## Test Structure

### 1. Unit Tests

#### `Welcome.test.tsx`
Comprehensive unit tests for the Welcome component covering:
- Component rendering and structure
- Text rendering with individual spans
- CSS class applications
- Font weight settings
- GSAP integration
- Accessibility features
- Edge cases and error handling

#### `Welcome.utils.test.tsx`
Tests for pure utility functions:
- `renderText` function testing
- `FONT_WEIGHTS` configuration validation
- Space handling and character conversion
- Font variation settings
- Special character handling

#### `App.test.tsx`
Tests for the main App component:
- Component composition
- Import from module aliases
- Semantic HTML structure
- Integration with child components

#### `index.test.js`
Tests for the component exports:
- Named export validation
- Module structure
- Import consistency

### 2. Integration Tests

#### `Welcome.integration.test.tsx`
Complete user interaction flows:
- Mouse hover interactions
- Complex mouse movements
- State management across components
- Performance under load
- Browser compatibility
- Accessibility during interactions

### 3. Edge Case Tests

#### `Welcome.edge-cases.test.tsx`
Extreme scenarios and stress tests:
- Rapid mouse movements
- Malformed inputs
- DOM manipulation edge cases
- Memory management
- Browser API failures
- Race conditions

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Test Coverage

The test suite aims for comprehensive coverage including:

- ✅ Happy path scenarios
- ✅ Edge cases and boundary conditions
- ✅ Error handling and recovery
- ✅ Performance testing
- ✅ Accessibility validation
- ✅ Browser compatibility
- ✅ Memory management
- ✅ State consistency

## Key Testing Patterns

### 1. GSAP Mocking
GSAP animations are mocked in `src/test/setup.ts` to allow for fast, reliable tests without actual animations.

### 2. Event Testing
User interactions are tested using both direct `fireEvent` calls and the more realistic `@testing-library/user-event`.

### 3. DOM Queries
Tests use semantic queries (getByRole, getByText) to ensure accessibility.

### 4. Cleanup
All tests properly cleanup after execution using `afterEach(cleanup)`.

## Test Organization

Tests are co-located with their source files for easy navigation.

## Continuous Integration

Tests are designed to run in CI environments with:
- No external dependencies
- Deterministic results
- Fast execution times
- Clear error messages

## Best Practices

1. **Test Isolation**: Each test is independent and doesn't rely on others
2. **Clear Naming**: Test names clearly describe what is being tested
3. **Arrange-Act-Assert**: Tests follow the AAA pattern
4. **Meaningful Assertions**: Assertions validate actual behavior
5. **Coverage Goals**: Aim for high coverage but focus on valuable tests

## Troubleshooting

### Common Issues

1. **GSAP Errors**: Ensure GSAP is properly mocked in setup.ts
2. **Async Issues**: Use `waitFor` for async operations
3. **DOM Queries**: Use `getByRole` for better accessibility testing
4. **Cleanup**: Always cleanup after tests to prevent memory leaks

## Contributing

When adding new features:
1. Write tests first (TDD approach preferred)
2. Cover happy paths and edge cases
3. Ensure accessibility is tested
4. Run full test suite before committing
5. Maintain test coverage above 80%

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)