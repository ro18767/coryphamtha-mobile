import * as v from "valibot";

// correct +380 XXX XX XX
export const VerificationCodeSchema = v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Код з SMS обов'язковый"),
    v.length(5, "Код складається з 5 цифр"),
    v.check(
        (input) => /^\d+$/.test(input.slice(1)),
        "Код повинен містити лише цифри",
    ),
);
