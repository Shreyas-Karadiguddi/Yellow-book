import { InvalidUserInput } from "../db/exceptions.js";

export const checkRequiredField = (requestBody, requiredFields) => {
    const cleanData = {}
    const isInvalidVariable = requiredFields.some((item) => {
        if (!requestBody[item] || requestBody[item].toString().trim() === "") {
            return true;
        }
        cleanData[item] = typeof requestBody[item] === "string" ? requestBody[item].trim() : requestBody[item];
    })

    if (isInvalidVariable) {
        throw new InvalidUserInput();
    }
    return cleanData
}