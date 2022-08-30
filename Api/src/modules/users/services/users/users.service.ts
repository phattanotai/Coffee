import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HashService } from '../hash/hash.service';
import { Repository } from 'typeorm';
import { CreateUser } from '../../models/dto/CreateUser.dto';
import { LoginUser } from '../../models/dto/LoginUser.dto';
import { TbUsers } from '../../models/entities/users.entity';
import { UserI } from '../../models/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { UpdateUser } from '../../models/dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(TbUsers)
    private userRepository: Repository<TbUsers>,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  create(createdUserDto: CreateUser): Observable<any> {
    return this.mailExists(createdUserDto.email, createdUserDto.username).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.hashService.hashPassword(createdUserDto.password).pipe(
            switchMap((passwordHash: string) => {
              // Overwrite the user password with the hash, to store it in the db
              createdUserDto.password = passwordHash;

              return from(this.userRepository.save(createdUserDto)).pipe(
                map((savedUser: UserI) => {
                  if (savedUser) {
                    return 'create success';
                  } else {
                    return 'create fail';
                  }
                }),
              );
            }),
          );
        } else {
          throw new HttpException(
            'Email or Username already in use',
            HttpStatus.CONFLICT,
          );
        }
      }),
    );
  }

  update(id: number, createdUserDto: UpdateUser): Observable<string> {
    return from(this.userRepository.update(id, createdUserDto)).pipe(
      map((savedUser: any) => {
        if (savedUser.affected) {
          return 'update success';
        } else {
          return 'update fail';
        }
      }),
    );
  }

  login(loginUserDto: LoginUser): Observable<any> {
    return this.findUserByEmail(loginUserDto.username).pipe(
      switchMap((user: UserI) => {
        if (user) {
          return this.validatePassword(
            loginUserDto.password,
            user.password,
          ).pipe(
            switchMap((passwordsMatches: boolean) => {
              if (passwordsMatches) {
                return this.findOne(user.id).pipe(
                  switchMap((user: UserI) => {
                    return this.hashService.generateJwt(user).pipe(
                      map((jwt: any) => {
                        return {
                          jwt,
                          user,
                        };
                      }),
                    );
                  }),
                );
              } else {
                throw new HttpException(
                  'Login was not Successfulll',
                  HttpStatus.UNAUTHORIZED,
                );
              }
            }),
          );
        } else {
          throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
      }),
    );
  }

  public refreshToken(token: string): Observable<any> {
    try {
      const userData = this.decodeToken(token);
      return this.hashService.generateJwt(userData);
    } catch (error) {
      throw { message: 'refreshToken ' + error.message };
    }
  }

  findAll(): Observable<UserI[]> {
    try {
      return from(this.userRepository.find());
    } catch (error) {
      throw { message: 'refreshToken ' + error.message };
    }
  }

  findOne(id: number): Observable<UserI> {
    try {
      return from(this.userRepository.findOne({ id }));
    } catch (error) {
      throw { message: 'refreshToken ' + error.message };
    }
  }

  private findUserByEmail(email: string): Observable<UserI> {
    return from(
      this.userRepository.findOne({
        where: [{ email }, { username: email }],
        select: ['id', 'email', 'username', 'password'],
      }),
    );
  }

  private validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Observable<boolean> {
    return this.hashService.comparePasswords(password, storedPasswordHash);
  }

  private mailExists(email: string, username: string): Observable<boolean> {
    return from(
      this.userRepository.findOne({ where: [{ email }, { username }] }),
    ).pipe(
      map((user: UserI) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }),
    );
  }

  private generateToken(data: any): Observable<string> {
    try {
      return this.hashService.generateJwt(data);
    } catch (error) {
      throw { message: 'generateToken ' + error.message };
    }
  }

  private decodeToken(token: string): any {
    try {
      const data: any = this.jwtService.decode(token, {
        json: true,
      });
      return data.user;
    } catch (error) {
      throw { message: 'decodeToken ' + error.message };
    }
  }
}
