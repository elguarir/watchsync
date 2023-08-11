interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

export function loginValidate({
  values,
}: {
  values: {
    email: string;
    password: string;
  };
}) {
  //   console.log("loginValidate");
}

export function SignUpValidate(values: SignUpProps) {
  const errors: any = {};
  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }

  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
    values.email
  ) {
    errors.email = "This email is invalid";
  }

  if (values.password.length < 6 && values.password) {
    errors.password = "Password must be at least 6 characters";
  }
  return errors;
}
