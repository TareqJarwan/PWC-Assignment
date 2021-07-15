import countries from '../constants/countries'

export const existingCustomerDropDownPreparation = () => {
    return [
        { name: 'Yes', value: 'yes' },
        { name: 'No', value: 'no' },
    ];
};

export const occupationDropDownPreparation = () => {
    return [
        { name: 'Student', value: 'student' },
        { name: 'Civil Servant', value: 'civilServant' },
        { name: 'Self Employed', value: 'selfEmployed' },
        { name: 'Professional', value: 'professional' },
        { name: 'Unemployed', value: 'unemployed' },
        { name: 'Others', value: 'others' },
    ];
};

export const countriesDropDownPreparation = () => {
    return countries;
}