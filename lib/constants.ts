
export type FormFieldType = {
    name: "firstname" | "lastname" | "address" | "email" | "tel";
    label: string;
    placeholder: string;
};

export const FORM_FIELDS: FormFieldType[] = [
    {
        name: 'firstname',
        label: 'First Name',
        placeholder: 'Your first name'
    },
    {
        name: 'lastname',
        label: 'Last Name',
        placeholder: 'Your last name'
    },
    {
        name: 'address',
        label: 'Address',
        placeholder: 'Your address'
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Your email'
    },
    {
        name: 'tel',
        label: 'Telephone',
        placeholder: 'Your telephone'
    }
]