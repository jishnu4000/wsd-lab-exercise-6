/* eslint-disable no-unused-vars */
import { useState } from "react";
import ValidationMessage from './ValidationMessage';

const RegistrationForm = () => {
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDateOfBirth, setRegDateOfBirth] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [formErrors, setFormErrors] = useState({});
  const [allowSubmit, setAllowSubmit] = useState(true);

  const handleNameChange = (event) => {
    const inputName = event.target.value;
    setRegName(inputName);

    if (inputName === '') {
      setFormErrors({ ...formErrors, name: 'Name is required.' });
      setAllowSubmit(false);
    } else if (!/^[A-Za-z\s]{3,}$/.test(inputName)) {
      setFormErrors({ ...formErrors, name: 'Name must be at least 3 characters and contain only letters and spaces.' });
      setAllowSubmit(false);
    } else {
      const { name, ...rest } = formErrors;
      setFormErrors(rest);
      setAllowSubmit(Object.keys(rest).length === 0); // Only allow submit if there are no errors
    }
  };

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setRegEmail(inputEmail);

    if (inputEmail === '') {
      setFormErrors({ ...formErrors, email: 'Email is required.' });
      setAllowSubmit(false);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail)) {
      setFormErrors({ ...formErrors, email: 'Invalid email format.' });
      setAllowSubmit(false);
    } else {
      const { email, ...rest } = formErrors;
      setFormErrors(rest);
      setAllowSubmit(Object.keys(rest).length === 0);
    }
  }

  const handleDateOfBirthChange = (event) => {
    const inputDateOfBirth = event.target.value;
    setRegDateOfBirth(inputDateOfBirth);
    const inputDate = new Date(inputDateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - inputDate.getFullYear();
    const monthDiff = today.getMonth() - inputDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < inputDate.getDate())) {
      age -= 1;
    }

    if (inputDateOfBirth === '') {
      setFormErrors({ ...formErrors, dateOfBirth: 'Date of Birth is required.' });
      setAllowSubmit(false);
    } else if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(inputDateOfBirth)) {
      setFormErrors({ ...formErrors, dateOfBirth: 'Date of birth must be in the format YYYY-MM-DD.' });
      setAllowSubmit(false);
    } else if (inputDate.getFullYear() > today.getFullYear()) {
      setFormErrors({ ...formErrors, dateOfBirth: 'Year of birth cannot be greater than current year.'})
      setAllowSubmit(false);
    } else if (age < 18) {
      setFormErrors({ ...formErrors, dateOfBirth: 'Age must be above 18 to register.'})
      setAllowSubmit(false);
    } else {
      const { dateOfBirth, ...rest } = formErrors;
      setFormErrors(rest);
      setAllowSubmit(Object.keys(rest).length === 0);
    }
  }

  const handlePasswordChange = (event) => {
    const inputPassword = event.target.value;
    setRegPassword(inputPassword);

    if (inputPassword === '') {
      setFormErrors({ ...formErrors, password: 'Password is required.' });
      setAllowSubmit(false);
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(inputPassword)) {
      setFormErrors({ ...formErrors, password: 'Password must be at least 8 characters long and contain both letters and numbers.' });
      setAllowSubmit(false);
    } else {
      const { password, ...rest } = formErrors;
      setFormErrors(rest);
      setAllowSubmit(Object.keys(rest).length === 0);
    }
  }

  const handleConfirmPasswordChange = (event) => {
    const inputConfirmPassword = event.target.value;
    setRegConfirmPassword(inputConfirmPassword);

    if (inputConfirmPassword === '') {
      setFormErrors({ ...formErrors, confirmPassword: 'Password confirmation is required.' });
      setAllowSubmit(false);
    } else if (inputConfirmPassword !== regPassword) {
      setFormErrors({ ...formErrors, confirmPassword: 'Password and confirmation password do not match.' });
      setAllowSubmit(false);
    } else {
      const { confirmPassword, ...rest } = formErrors;
      setFormErrors(rest);
      setAllowSubmit(Object.keys(rest).length === 0);
    }
  }

  return (
    <div className="rounded-lg shadow-xl bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          New Registration
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                value={regName}
                onChange={handleNameChange}
                placeholder="Minimum 3 alphabetic letters"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${ regName ? formErrors.name ? 'ring-red-600' : 'ring-green-600' : 'ring-gray-300'}`}
              />
            </div>
            <ValidationMessage fieldName={regName} errorMsg={formErrors.name} validMsg={`Valid name`} />
          </div>


          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={regEmail}
                onChange={handleEmailChange}
                placeholder="example@example.com"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${ regEmail ? formErrors.email ? 'ring-red-600' : 'ring-green-600' : 'ring-gray-300'}`}
              />
            </div>
            <ValidationMessage fieldName={regEmail} errorMsg={formErrors.email} validMsg={`Valid email`} />
          </div>

          {/* DOB Input */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium leading-6 text-gray-900">
              Date of Birth
            </label>
            <div className="mt-2">
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="text"
                value={regDateOfBirth}
                onChange={handleDateOfBirthChange}
                placeholder="YYYY-MM-DD format"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${ regDateOfBirth ? formErrors.dateOfBirth ? 'ring-red-600' : 'ring-green-600' : 'ring-gray-300'}`}
              />
            </div>
            <ValidationMessage fieldName={regDateOfBirth} errorMsg={formErrors.dateOfBirth} validMsg={`Valid date of birth`} />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={regPassword}
                onChange={handlePasswordChange}
                placeholder="Minimum 8 characters"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${ regPassword ? formErrors.password ? 'ring-red-600' : 'ring-green-600' : 'ring-gray-300'}`}
              />
            </div>
            <ValidationMessage fieldName={regPassword} errorMsg={formErrors.password} validMsg={`Valid password`} />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={regConfirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Must match given password"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${ regConfirmPassword ? formErrors.confirmPassword ? 'ring-red-600' : 'ring-green-600' : 'ring-gray-300'}`}
              />
            </div>
            <ValidationMessage fieldName={regConfirmPassword} errorMsg={formErrors.confirmPassword} validMsg={`Password confirmed`} />
          </div>

          <div>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${ allowSubmit ? '' : 'opacity-50 cursor-not-allowed'}`}
            >
                Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm