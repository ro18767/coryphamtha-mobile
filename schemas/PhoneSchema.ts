import * as v from "valibot";

// correct +380 XXX XX XX
export const PhoneSchema = v.pipe(
    v.string(),
    v.trim(),
    v.transform((input) => {
        input.replace(/\s/g, "");
        return input;
    }),
    v.nonEmpty("Номер обов'язковый"),
    v.startsWith("+", 'Номер повынен починатысь з "+"'),
    v.minLength(8, "Номер закороткий"),
    v.maxLength(12, "Номер задовгий"),
    v.check(
        (input) => /^\d+$/.test(input.slice(1)),
        "Номер повинен містити лише цифри",
    ),
);

