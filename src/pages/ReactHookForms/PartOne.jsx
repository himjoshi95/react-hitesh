import React, { useState, useEffect } from 'react';

export default function PartOne() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const errors = {};

        if (firstName.trim() === '') {
            errors.firstName = 'First name cannot be empty.';
        }

        if (lastName.trim() === '') {
            errors.lastName = 'Last name cannot be empty.';
        }

        if (!email.includes('@')) {
            errors.email = 'Invalid email address.';
        }

        if (password.length <= 5) {
            errors.password = 'Password must be at least 6 characters long.';
        }

        if (confirmPassword !== password) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        setFieldErrors(errors);

        const isEmailValid = email.includes('@');
        const isPasswordValid = password.length > 5;
        const isConfirmPasswordValid = confirmPassword === password;
        const areNamesValid = firstName.trim() !== '' && lastName.trim() !== '';
        const areTermsValid = termsAgreed;

        setIsFormValid(
        isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            areNamesValid &&
            areTermsValid
        );
  }, [firstName, lastName, email, password, confirmPassword, termsAgreed]);

  const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            firstName,
        lastName,
        email,
        password,
        termsAgreed,
    };

    fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(payload),
        }).then(() => {
        setSubmitted(true);
    });
        
    };

    const handleTermsClick = () => {
        setTermsAgreed(!termsAgreed);
    };
    
    return (
        <div className="p-4 max-w-md mx-auto bg-gray-100 rounded-lg shadow-sm">
        {!submitted ? (
            <>
            <h1 className="text-xl font-bold mb-4">Create Account</h1>
            <div className="mb-4">
                <div className="mb-1 font-semibold">First Name</div>
                <input
                className="w-full border rounded-sm p-2"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
                {fieldErrors.firstName && (
                <div className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</div>
                )}
            </div>
            <div className="mb-4">
                <div className="mb-1 font-semibold">Last Name</div>
                <input
                className="w-full border rounded-sm p-2"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
                {fieldErrors.lastName && (
                <div className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</div>
                )}
            </div>
            <div className="mb-4">
                <div className="mb-1 font-semibold">Email</div>
                <input
                className="w-full border rounded-sm p-2"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                {fieldErrors.email && (
                <div className="text-red-500 text-sm mt-1">{fieldErrors.email}</div>
                )}
            </div>
            <div className="mb-4">
                <div className="mb-1 font-semibold">Password</div>
                <input
                className="w-full border rounded-sm p-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                {fieldErrors.password && (
                <div className="text-red-500 text-sm mt-1">{fieldErrors.password}</div>
                )}
            </div>
            <div className="mb-4">
                <div className="mb-1 font-semibold">Confirm Password</div>
                <input
                className="w-full border rounded-sm p-2"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {fieldErrors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">{fieldErrors.confirmPassword}</div>
                )}
            </div>
            <div className="mb-4 flex items-center">
                <input
                className="mr-2"
                type="checkbox"
                checked={termsAgreed}
                onChange={() => setTermsAgreed(!termsAgreed)}
                />
                <span
                onClick={handleTermsClick}
                className="cursor-pointer text-blue-600 underline"
                >
                I agree to the terms and conditions
                </span>
            </div>
            <div>
                <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`w-full py-2 rounded-sm font-semibold ${
                    isFormValid ? 'bg-green-400 text-white' : 'bg-gray-300 text-gray-600'
                }`}
                >
                Sign Up
                </button>
            </div>
            </>
        ) : (
            <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
            <p className="text-gray-700">
                Your registration was successful. You can now log in with your new
                account.
            </p>
            </div>
        )}
    </div>
    );
}