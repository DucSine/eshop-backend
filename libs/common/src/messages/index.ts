import * as GENERAL from './general.json';
import * as HTTP_CODE from './httpCode.json';
import * as VALIDATION from './validation.json';

const messages = { GENERAL, HTTP_CODE, VALIDATION };

const getMessage = (path = '') => {
    const messagePaths = path.split('.');
    return messagePaths?.reduce((prev, curr) => (prev ? prev[curr] : messages[curr]), false);
};

export { getMessage };
