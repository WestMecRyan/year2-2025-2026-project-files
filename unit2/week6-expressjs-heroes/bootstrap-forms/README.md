# Bootstrap Forms with Pattern Validation Demo

A responsive user registration form demonstrating Bootstrap 5 integration with comprehensive client-side validation using regular expressions.

## Features

### 🎨 Bootstrap Design
- **Responsive Grid System**: Mobile-first approach with breakpoints
- **Form Components**: Input groups, validation states, custom styling
- **Bootstrap Icons**: Visual feedback and improved UX
- **Card Layout**: Professional container design

### ✅ Pattern Validation (RegEx)
- **Name Fields**: Letters only, 2-50 characters
- **Email**: RFC-compliant email validation
- **Phone**: US phone number formats
- **Password**: Strong password requirements (uppercase, lowercase, number, special char, 8+ length)
- **ZIP Code**: 5-digit or ZIP+4 format
- **Age Verification**: Must be 13+ years old

### 🔧 JavaScript Features
- **Real-time Validation**: Immediate feedback as users type
- **Password Strength Meter**: Visual indicator of password complexity
- **Password Toggle**: Show/hide password functionality
- **Input Sanitization**: XSS prevention
- **Form Reset**: Clear all validation states
- **Success Animation**: Confirmation feedback

### ♿ Accessibility
- **ARIA Labels**: Screen reader support
- **Semantic HTML**: Proper form structure
- **Keyboard Navigation**: Full keyboard accessibility
- **Error Messages**: Clear, descriptive feedback
- **Help Text**: Usage guidance for each field

## Unit 2 Standards Alignment

### Week 1 Standards Covered:
- **15.2 W3C Standards**: HTML5 form validation
- **15.3 Accessibility**: ADA compliance with ARIA labels
- **15.4 Responsive Design**: Bootstrap framework implementation
- **15.6 GUI Objects**: Form inputs, buttons, dropdowns
- **15.11 CSS and JS Frameworks**: Bootstrap 5 implementation
- **11.4 Variable Assignment**: Input validation and sanitization
- **1.5 User Input Sanitization**: XSS prevention techniques
- **5.2 Boolean Expressions**: Validation logic implementation

## File Structure
```
bootstrap-forms/
├── index.html          # Main form page with Bootstrap components
├── validation.js       # Client-side validation logic
└── README.md          # This documentation
```

## Usage

1. Open `index.html` in a web browser
2. Fill out the form fields to see real-time validation
3. Try different input patterns to test validation rules
4. Submit the form to see success simulation

## Validation Patterns

| Field | Pattern | Description |
|-------|---------|-------------|
| First/Last Name | `^[A-Za-z]{2,50}$` | Letters only, 2-50 chars |
| Email | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$` | Valid email format |
| Phone | `^(\\+1-?)?(\\([0-9]{3}\\)\|[0-9]{3})[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$` | US phone formats |
| Password | `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$` | Strong password |
| ZIP Code | `^\\d{5}(-\\d{4})?$` | 5-digit or ZIP+4 |

## Demo Instructions

This form is perfect for demonstrating:
- **Responsive Design**: Resize browser to see mobile adaptation
- **Pattern Validation**: Test with invalid inputs to see error messages
- **User Experience**: Notice real-time feedback and visual indicators
- **Accessibility**: Navigate using only keyboard (Tab key)
- **Security**: Input sanitization prevents script injection

## Educational Value

Students can learn:
1. **Bootstrap Integration**: CDN setup and component usage
2. **RegEx Patterns**: Common validation expressions
3. **Event Handling**: Real-time form interaction
4. **Accessibility**: Making forms usable for everyone
5. **Security**: Client-side input sanitization
6. **UX Design**: Progressive enhancement and feedback