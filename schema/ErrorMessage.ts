interface DQLErrorMessage {
    error: {
        code: number;
        message: string;
        errors: {
            message: string;
            domain: string;
            reason: string;
        }[];
    };
}

export { DQLErrorMessage }

