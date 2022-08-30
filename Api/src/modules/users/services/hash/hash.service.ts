import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwt(user: any): Observable<string> {
    try {
      return from(this.jwtService.signAsync({ user }));
    } catch (error) {
      throw { message: 'generateJwt ' + error.message };
    }
  }

  hashPassword(password: string): Observable<string> {
    try {
      return from<Promise<string>>(bcrypt.hash(password, 12));
    } catch (error) {
      throw { message: 'hashPassword ' + error.message };
    }
  }

  comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Observable<any> {
    try {
      return from(bcrypt.compare(password, storedPasswordHash));
    } catch (error) {
      throw { message: 'comparePasswords ' + error.message };
    }
  }
}
