import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSimpleDto } from './dto/user-simple.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name, { timestamp: true });

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<Number> {
    const user = await this.userRepository.findOneBy({ email: createUserDto.email });

    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const newUser = this.userRepository.create(createUserDto);
    return (await this.userRepository.save(newUser)).id;
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
