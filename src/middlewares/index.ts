import { accountValidated } from "./accountValidated.middleware";
import { resetPassword } from "./resetPassword.middleware";
import { verifyOwner } from "./verifyOwner.middleware";
import { validatedToken } from "./validatedToken.middleware";
import { emailExisty } from "./emailExity.middleware";
 
export default { accountValidated, resetPassword, validatedToken, verifyOwner, emailExisty }