export const registerFormControls = [
  {
    name: "userName",
    id: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    id: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    id: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];
export const registerFormInitial = {
  userName: "",
  email: "",
  password: "",
};

export const LoginFormControl = [
  {
    name: "email",
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    componentType: "input",
  },
  {
    name: "password",
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    componentType: "input",
  },
  {
    name: "otp",
    id: "otp",
    label: "OTP",
    type: "number",
    placeholder: "Enter OTP",
    componentType: "otp",
  },
];

export const LoginFormInitials = {
  email: "",
  password: "",
  otp: "",
};

export const IncomeFormControl = [
  {
    name: "incomeTitle",
    id: "incomeTitle",
    placeholder: "Income Title",
    componentType: "input",
    type: "text",
  },
  {
    name: "incomeAmount",
    id: "incomeAmount",
    placeholder: "Income Amount",
    componentType: "input",
    type: "number",
  },
  {
    name: "incomeDate",
    id: "incomeDate",
    placeholder: "Income Date",
    componentType: "datePicker",
    type: "text",
  },
  {
    name: "incomeCategory",
    id: "incomeCategory",
    placeholder: "Income Category",
    componentType: "select",
    options: [
      { label: "Salary", value: "salary" },
      { label: "Bonus", value: "bonus" },
      { label: "Freelance", value: "freelance" },
      { label: "Food", value: "food" },
      { label: "Part-time Job", value: "part_time_job" },
      { label: "Grocery", value: "grocery" },
      { label: "Rental Income", value: "rental_income" },
      { label: "Gift", value: "gift" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "incomeImage",
    id: "incomeImage",
    componentType: "file",
    type: "file",
  },
  {
    name: "incomeDescription",
    id: "incomeDescription",
    placeholder: "Income Description",
    componentType: "textarea",
    type: "text",
  },
];

export const IncomeInitialFormState = {
  incomeTitle: "",
  incomeAmount: "", // Changed to lowercase
  incomeDate: null, // Changed to lowercase
  incomeCategory: "", // Changed to lowercase
  incomeDescription: "", // Changed to lowercase
  IncomeImage: null,
};

export const ExpenseFormControl = [
  {
    name: "expenseTitle",
    id: "expenseTitle",
    placeholder: "Expense Title",
    componentType: "input",
    type: "text",
  },
  {
    name: "expenseAmount",
    id: "expenseAmount",
    placeholder: "Expense Amount",
    componentType: "input",
    type: "number",
  },
  {
    name: "expenseDate",
    id: "expenseDate",
    placeholder: "Expense Date",
    componentType: "datePicker",
    type: "text",
  },
  {
    name: "expenseCategory",
    id: "expenseCategory",
    placeholder: "Expense Category",
    componentType: "select",
    options: [
      { label: "Salary", value: "salary" },
      { label: "Bonus", value: "bonus" },
      { label: "Freelance", value: "freelance" },
      { label: "Food", value: "food" },
      { label: "Part-time Job", value: "part_time_job" },
      { label: "Grocery", value: "grocery" },
      { label: "Rental Income", value: "rental_income" },
      { label: "Gift", value: "gift" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "expenseImage",
    id: "expenseImage",
    componentType: "file",
    type: "file",
  },
  {
    name: "expenseDescription",
    id: "expenseDescription",
    placeholder: "Expense Description",
    componentType: "textarea",
    type: "text",
  },
];

export const ExpenseFormInitials = {
  expenseTitle: "",
  expenseAmount: "",
  expenseDate: null,
  expenseCategory: "",
  expenseDescription: "",
  expenseImage: null,
};
