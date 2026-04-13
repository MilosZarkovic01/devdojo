import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSimpleDto } from './dto/user-simple.dto';
import { User } from './entities/user.entity';
import { timestamp } from 'rxjs';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name, { timestamp: true });

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserSimpleDto[]> {
    const users = await this.userRepository.find();
    return users.map(UserSimpleDto.fromEntity);
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      this.logger.warn('User is missing');
      throw new NotFoundException('User not found');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
