class FormValidator {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.fields = {
            firstName: {
                element: document.getElementById('firstName'),
                pattern: /^[A-Za-z]{2,50}$/,
                errorMsg: 'First name must contain only letters (2-50 characters)'
            },
            lastName: {
                element: document.getElementById('lastName'),
                pattern: /^[A-Za-z]{2,50}$/,
                errorMsg: 'Last name must contain only letters (2-50 characters)'
            },
            email: {
                element: document.getElementById('email'),
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                errorMsg: 'Please enter a valid email address'
            },
            phone: {
                element: document.getElementById('phone'),
                pattern: /^(\+1-?)?(\([0-9]{3}\)|[0-9]{3})[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
                errorMsg: 'Please enter a valid US phone number'
            },
            password: {
                element: document.getElementById('password'),
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                errorMsg: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
            },
            confirmPassword: {
                element: document.getElementById('confirmPassword'),
                errorMsg: 'Passwords do not match'
            },
            dateOfBirth: {
                element: document.getElementById('dateOfBirth'),
                errorMsg: 'You must be at least 13 years old'
            },
            zipCode: {
                element: document.getElementById('zipCode'),
                pattern: /^\d{5}(-\d{4})?$/,
                errorMsg: 'Please enter a valid ZIP code (12345 or 12345-6789)'
            },
            terms: {
                element: document.getElementById('terms'),
                errorMsg: 'You must agree to the terms and conditions'
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupPasswordToggle();
        this.setupFormReset();
    }

    setupEventListeners() {
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName].element;
            
            field.addEventListener('blur', () => this.validateField(fieldName));
            
            field.addEventListener('input', () => {
                this.clearFieldError(fieldName);
                if (fieldName === 'password') {
                    this.updatePasswordStrength();
                    this.validateField('confirmPassword');
                }
                if (fieldName === 'confirmPassword') {
                    this.validateField('confirmPassword');
                }
            });
        });

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    setupPasswordToggle() {
        const toggleBtn = document.getElementById('togglePassword');
        const passwordField = document.getElementById('password');
        
        toggleBtn.addEventListener('click', () => {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            
            const icon = toggleBtn.querySelector('i');
            icon.className = type === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
        });
    }

    setupFormReset() {
        const resetBtn = this.form.querySelector('button[type="reset"]');
        resetBtn.addEventListener('click', () => {
            setTimeout(() => {
                this.clearAllErrors();
                this.updatePasswordStrength();
            }, 10);
        });
    }

    validateField(fieldName) {
        const field = this.fields[fieldName];
        const value = field.element.value.trim();
        
        switch(fieldName) {
            case 'firstName':
            case 'lastName':
            case 'email':
            case 'phone':
            case 'password':
            case 'zipCode':
                return this.validatePattern(fieldName);
            
            case 'confirmPassword':
                return this.validatePasswordMatch();
            
            case 'dateOfBirth':
                return this.validateAge();
            
            case 'terms':
                return this.validateCheckbox(fieldName);
            
            default:
                return true;
        }
    }

    validatePattern(fieldName) {
        const field = this.fields[fieldName];
        const value = field.element.value.trim();
        
        if (!value) {
            this.showError(fieldName, 'This field is required');
            return false;
        }
        
        if (!field.pattern.test(value)) {
            this.showError(fieldName, field.errorMsg);
            return false;
        }
        
        this.showSuccess(fieldName);
        return true;
    }

    validatePasswordMatch() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!confirmPassword) {
            this.showError('confirmPassword', 'Please confirm your password');
            return false;
        }
        
        if (password !== confirmPassword) {
            this.showError('confirmPassword', this.fields.confirmPassword.errorMsg);
            return false;
        }
        
        this.showSuccess('confirmPassword');
        return true;
    }

    validateAge() {
        const dobValue = document.getElementById('dateOfBirth').value;
        
        if (!dobValue) {
            this.showError('dateOfBirth', 'Date of birth is required');
            return false;
        }
        
        const dob = new Date(dobValue);
        const today = new Date();
        const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
        
        if (age < 13) {
            this.showError('dateOfBirth', this.fields.dateOfBirth.errorMsg);
            return false;
        }
        
        this.showSuccess('dateOfBirth');
        return true;
    }

    validateCheckbox(fieldName) {
        const field = this.fields[fieldName];
        
        if (!field.element.checked) {
            this.showError(fieldName, field.errorMsg);
            return false;
        }
        
        this.clearFieldError(fieldName);
        return true;
    }

    updatePasswordStrength() {
        const password = document.getElementById('password').value;
        const strengthBar = document.getElementById('passwordStrength');
        
        if (!password) {
            strengthBar.style.width = '0%';
            strengthBar.className = 'password-strength';
            return;
        }
        
        let score = 0;
        const checks = [
            /[a-z]/.test(password),
            /[A-Z]/.test(password),
            /\d/.test(password),
            /[@$!%*?&]/.test(password),
            password.length >= 8
        ];
        
        score = checks.reduce((acc, check) => acc + (check ? 1 : 0), 0);
        
        const percentage = (score / 5) * 100;
        strengthBar.style.width = `${percentage}%`;
        
        if (score <= 2) {
            strengthBar.className = 'password-strength strength-weak';
        } else if (score <= 4) {
            strengthBar.className = 'password-strength strength-medium';
        } else {
            strengthBar.className = 'password-strength strength-strong';
        }
    }

    showError(fieldName, message) {
        const field = this.fields[fieldName].element;
        const errorElement = document.getElementById(`${fieldName}Error`);
        const validationIcon = field.parentNode.querySelector('.validation-icon');
        
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (validationIcon) {
            validationIcon.className = 'bi bi-x-circle-fill validation-icon';
            validationIcon.style.display = 'block';
        }
    }

    showSuccess(fieldName) {
        const field = this.fields[fieldName].element;
        const validationIcon = field.parentNode.querySelector('.validation-icon');
        
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        
        if (validationIcon) {
            validationIcon.className = 'bi bi-check-circle-fill validation-icon';
            validationIcon.style.display = 'block';
        }
    }

    clearFieldError(fieldName) {
        const field = this.fields[fieldName].element;
        const validationIcon = field.parentNode.querySelector('.validation-icon');
        
        field.classList.remove('is-invalid', 'is-valid');
        
        if (validationIcon) {
            validationIcon.style.display = 'none';
        }
    }

    clearAllErrors() {
        Object.keys(this.fields).forEach(fieldName => {
            this.clearFieldError(fieldName);
        });
        document.getElementById('passwordStrength').style.width = '0%';
        document.getElementById('passwordStrength').className = 'password-strength';
    }

    sanitizeInput(input) {
        return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                   .replace(/[<>]/g, '');
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let isValid = true;
        Object.keys(this.fields).forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            this.showSuccessMessage();
            this.simulateFormSubmission();
        } else {
            this.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    simulateFormSubmission() {
        const submitBtn = document.getElementById('submitBtn');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
            this.form.reset();
            this.clearAllErrors();
            this.updatePasswordStrength();
        }, 2000);
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (key === 'interests') {
                if (!data[key]) data[key] = [];
                data[key].push(this.sanitizeInput(value));
            } else {
                data[key] = this.sanitizeInput(value);
            }
        }
        
        delete data.confirmPassword;
        
        return data;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FormValidator();
    
    console.log('Bootstrap Form with Pattern Validation initialized!');
    console.log('Features:');
    console.log('- Responsive Bootstrap design');
    console.log('- Real-time RegEx validation');
    console.log('- Password strength indicator');
    console.log('- Accessibility features with ARIA labels');
    console.log('- Input sanitization for XSS prevention');
    console.log('- Mobile-first responsive design');
});