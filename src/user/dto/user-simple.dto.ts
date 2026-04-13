import { User } from "../entities/user.entity";

export class UserSimpleDto {
    id: number;
    email: string;
    fullName: string;

    static fromEntity(user: User): UserSimpleDto {
        const dto = new UserSimpleDto();
        dto.id = user.id;
        dto.email = user.email;
        dto.fullName = `${user.firstName} ${user.lastName}`;
        return dto;
    }
}