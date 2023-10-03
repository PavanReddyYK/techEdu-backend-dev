import crypto from "crypto";
import bcryptjs from "bcryptjs";

export const getEncryptPassword = (password) => {
  try {
    let encrypted_key = crypto.createCipher(
      "aes-128-cbc",
      process.env.REACT_APP_PRIVATE_KEY
    );
    let encrypted_password = encrypted_key.update(password, "utf8", "hex");
    encrypted_password += encrypted_key.final("hex");
    return encrypted_password;
  } catch (err) {
    console.log("Error in encrypting password", err);
  }
};

export const getDecryptPassword = (password) => {
  try {
    let decrypted_key = crypto.createDecipher(
      "aes-128-cbc",
      process.env.REACT_APP_PRIVATE_KEY
    );
    let decrypted_password = decrypted_key.update(password, "hex", "utf8");
    decrypted_password += decrypted_key.final("utf8");
    return decrypted_password;
  } catch (err) {
    console.log("error in decrypting password", err);
  }
};

export const createOtp = async () => {
    try{
        let otp = Math.floor(Math.random() * 899999 + 100000).toString();
        console.log("🚀 ~ file: helper.mjs:35 ~ createOtp ~ otp:", otp)
        let salt = await bcryptjs.genSalt(10);
        let hashedotp = await bcryptjs.hash(otp, salt);
        console.log("🚀 ~ file: helper.mjs:37 ~ createOtp ~ hashedotp:", hashedotp)
        
        return {hashedotp,otp};
    }
    catch(err) {
        console.log("error in generating otp", err);
    }
};
