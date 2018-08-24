export class ErrorResponse {
    code: string;
    response: string;
    errors: Array<ErrorDetail>
}

export class ErrorDetail {
    property: string;
    message: string;
}
