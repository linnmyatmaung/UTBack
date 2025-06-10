// src/services/AuthService.ts
import { AdminAuthRequestDto, CodeAuthRequestDto } from "@dtos/AuthDto";
import { PinCodeRepository } from "@repositories/PinCodeRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AdminRepository } from "@repositories/AdminRepository";

export class AuthService {
  static async PinCodelogin(
    pinCode: CodeAuthRequestDto
  ): Promise<{ token: string }> {
    if (!pinCode?.Rcode) {
      throw new Error("Pin code is required");
    }
    const valid = await PinCodeRepository.findOneBy({ code: pinCode.Rcode });
    if (valid) {
      const token = jwt.sign(
        { id: valid.id },
        process.env.JWT_SECRET || "defaultSecret",
        {
          expiresIn: (process.env.JWT_EXPIRE_MINUTES +
            "m") as jwt.SignOptions["expiresIn"],
        }
      );
      return { token };
    }
    throw new Error("Invalid code");
  }

  static hashedPassword(password: string) {
    console.log("hashedPassword :", bcrypt.hashSync(password, 10));
    return bcrypt.hashSync(password, 10);
  }

  static async Adminlogin(
    data: AdminAuthRequestDto
  ): Promise<{ token: string }> {
    const user = await AdminRepository.findOneBy({ username: data.username });
    if (user && (await bcrypt.compare(data.password, user.password))) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET || "defaultSecret",
        {
          expiresIn: (process.env.JWT_EXPIRE_MINUTES +
            "m") as jwt.SignOptions["expiresIn"],
        }
      );
      return { token };
    }
    throw new Error("Invalid email or password");
  }
}
