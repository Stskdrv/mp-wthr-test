
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
        placeholder: '+45 12 34 56 78'
    }
];

export const GOOGLE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

export const WEATHER_BASE_URL = 'http://api.weatherapi.com/v1/forecast.json';

export const LOADING = {
    INITIAL: 'idle',
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
};