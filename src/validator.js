import { Validator } from "vee-validate";
import russian from "vee-validate/dist/locale/ru";
import uzbek from "vee-validate/dist/locale/uz";

Validator.localize("ru", {
  messages: russian.messages,
  attributes: {
    username: "имя пользователя",
    old_password: "старый пароль",
    password: "пароль",
    confirm: "подтвержденный пароль",
    email: "электронная почта",
    phone: "телефон номера",
    code: "код",
    full_name: "Ф.И.О",
  },
});

Validator.localize("uz", {
  messages: uzbek.messages,
  attributes: {
    username: "foydalanuvchi nomi",
    old_password: "eski parol",
    password: "parol",
    confirm: "tasdiqlangan parol",
    email: "elektron pochta",
    phone: "telefon raqami",
    code: "kod",
    full_name: "F.I.SH",
  },
});

export default Validator;
