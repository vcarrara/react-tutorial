import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'

export interface User {
    id: number
    name: string
}

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: 1,
            name: 'Victor',
        },
        {
            id: 2,
            name: 'Noah',
        },
    ]

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user: User = { id: this.users.length + 1, name: createUserDto.name }
        this.users.push(user)
        return user
    }

    async findAll(): Promise<User[]> {
        return this.users
    }

    async remove(id: number): Promise<User> {
        const index = this.users.findIndex((user) => user.id === id)
        if (index === -1) {
            throw new NotFoundException()
        }
        const user = this.users[index]
        this.users.splice(index, 1)
        return user
    }
}
