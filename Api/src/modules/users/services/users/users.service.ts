import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async create(createdUserDto: CreateUser): Promise<any> {
    return this.mailExists(createdUserDto.email, createdUserDto.username).then(
      (exists: boolean) => {
        if (!exists) {
          return this.hashService
            .hashPassword(createdUserDto.password)
            .then((passwordHash: string) => {
              // Overwrite the user password with the hash, to store it in the db
              createdUserDto.password = passwordHash;
              return this.userRepository
                .save(createdUserDto)
                .then((savedUser: UserI) => {
                  return savedUser;
                });
            });
        } else {
          throw { message: 'Email or Username already in use' };
        }
      },
    );
  }

  async update(id: number, createdUserDto: UpdateUser): Promise<string> {
    const userData = await this.findUserByEmail(createdUserDto.email);

    if (userData && userData.id != id) {
      throw { message: 'Email already in use' };
    }

    return this.userRepository
      .update(id, createdUserDto)
      .then((savedUser: any) => {
        return savedUser.affected;
      });
  }

  async login(loginUserDto: LoginUser): Promise<any> {
    return this.findUserByEmail(loginUserDto.username).then((user: UserI) => {
      if (user) {
        return this.validatePassword(loginUserDto.password, user.password).then(
          (passwordsMatches: boolean) => {
            if (passwordsMatches) {
              return this.findOne(user.id).then((user: UserI) => {
                return this.hashService.generateJwt(user).then((jwt: any) => {
                  return {
                    jwt,
                    user,
                  };
                });
              });
            } else {
              throw { message: 'Password incorrect' };
            }
          },
        );
      } else {
        throw { message: 'User not found' };
      }
    });
  }

  public refreshToken(token: string): Promise<any> {
    try {
      const userData = this.decodeToken(token);
      return this.hashService.generateJwt(userData);
    } catch (error) {
      throw { message: 'refreshToken ' + error.message };
    }
  }

  findAll(): Promise<UserI[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw { message: 'refreshToken ' + error.message };
    }
  }

  findOne(id: number): Promise<UserI> {
    try {
      return this.userRepository.findOne({ id });
    } catch (error) {
      throw { message: 'refreshToken ' + error.message };
    }
  }

  private findUserByEmail(email: string): Promise<UserI> {
    return this.userRepository.findOne({
      where: [{ email }, { username: email }],
      select: ['id', 'email', 'username', 'password'],
    });
  }

  private validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return this.hashService.comparePasswords(password, storedPasswordHash);
  }

  private mailExists(email: string, username: string): Promise<boolean> {
    return this.userRepository
      .findOne({ where: [{ email }, { username }] })
      .then((user: UserI) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      });
  }

  private generateToken(data: any): Promise<string> {
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
