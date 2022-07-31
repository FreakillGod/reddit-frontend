import { FlieldError } from "../generated/graphql";


export const toError = (errors: FlieldError[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
        errorMap[field] = message;
    })
    return errorMap;
}