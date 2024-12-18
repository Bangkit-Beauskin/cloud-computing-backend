const responseMessageConstant = {
    EMAIL_200_FOUND: 'Email Found',
    EMAIL_400_TAKEN: 'Email Taken',
    EMAIL_404_NOT_FOUND: 'Email Not Found',
    EMAIL_422_EMPTY: '"Email" is not allowed to be empty',
    EMAIL_422_INVALID_FORMAT: '"Email" must be in a valid email format',

    ID_422_INVALID_FORMAT: '"id" must be in a valid UUID format',

    IS_ACTIVE_422_INVALID_VALUE: '"is_active" must be boolean',

    LOGIN_200_SUCCESS: 'Login Successful',
    LOGIN_400_INCORRECT_EMAIL_OR_PASS: 'Incorrect Email or Password',

    OLD_PASSWORD_400_INCORRECT: 'Incorrect Old Password',

    PASSWORD_200_UPDATE_SUCCESS: '"Password" updated successfully',
    PASSWORD_400_UPDATE_FAILED: '"Password" update failed',
    PASSWORD_422_EMPTY: '"Password" is not allowed to be empty',
    PASSWORD_422_INVALID_FORMAT:
        '"Password" must be at least 8 characters, alphanumeric, at least 1 lowercase and at least 1 uppercase',

    PASSWORD_CONFIRMATION_422_NOT_MATCHING: '"Password" and "Confirmation Password" does not match',

    TOKEN_404_NOT_FOUND: 'Token Not Found',

    USER_200_DELETED: 'Successfully Deleted A Single User',
    USER_200_FETCHED_ALL: 'Successfully Fetched All Users',
    USER_200_FETCHED_SINGLE: 'Successfully Fetched A Single User',
    USER_200_UPDATED: 'Successfully Updated A Single User',
    USER_201_REGISTERED: 'Successfully Registered The User',
    USER_404_NOT_FOUND: 'User Not Found',

    HTTP_401_UNAUTHORIZED: 'Please Authenticate',
    HTTP_403_FORBIDDEN: 'You Have No Permission',
    HTTP_502_BAD_GATEWAY: 'Something Went Wrong',

    TASK_200_CREATED: 'Task Created',
    TASK_200_FETCHED_SINGLE: 'Successfully Fetched A Sigle Task',
    TASK_200_FETCHED_ALL: 'Successfully Fetched All Task',
    TASK_400_NOT_FOUND: 'Task Not Found',
};

export { responseMessageConstant };
