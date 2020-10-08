import { useState } from "react";

export default function useSignupBtn() {
  const [passwordStr, setPasswordStr] = useState("");
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  const mediumRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );
  const okRegex = new RegExp("(?=.{6,}).*", "g");
  const passwordStrChecker = (password) => {
    if (strongRegex.test(password)) {
      setPasswordStr("strong");
    } else if (mediumRegex.test(password)) {
      setPasswordStr("medium");
    } else if (okRegex.test(password)) {
      setPasswordStr("weak");
    } else setPasswordStr("");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => {
    setPassword(e.target.value);
    passwordStrChecker(e.target.value);
  };
  const handleName = (e) => setName(e.target.value);
  return [
    email,
    password,
    name,
    handleEmail,
    handlePassword,
    handleName,
    passwordStr,
    showPassword,
    setShowpassword,
  ];
}
