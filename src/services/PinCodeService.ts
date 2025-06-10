import { PinCode } from "@entities/PinCode";
import { PinCodeRepository } from "@repositories/PinCodeRepository";
import jwt from "jsonwebtoken";

export class PinCodeService {
  private static generateRandomCode(length: number = 6): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  public static async generateCodes(count: number) {
    const codes = new Set<string>(); // Use a Set to ensure uniqueness

    // Generate unique codes
    while (codes.size < count) {
      const code = this.generateRandomCode();
      codes.add(code);
    }

    // Map codes to PinCode entities
    const pinCodeEntities = Array.from(codes).map((code) => {
      const pinCode = new PinCode();
      pinCode.code = code;
      pinCode.status = 0; // 0 = unused
      return pinCode;
    });

    // Save to database
    await PinCodeRepository.save(pinCodeEntities);
    return `${count} codes generated successfully`;
  }

  public static async getPinCodefromJWT(token: string) {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default secret"
    ) as { id: number; code: string };
    return decoded.id;
  }

  public static async getPinCodeStatus(token: string) {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default secret"
    ) as { id: number; code: string };
    const pinCode = await PinCodeRepository.findOneBy({ id: decoded.id });
    return pinCode.status;
  }
}
