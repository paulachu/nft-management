import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from 'src/data/models/user.model';
import { USER_REPOSITORY } from 'src/utils/constants';

@Injectable()
export class AuthService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof UserModel)
    {}

    async createUser(): Promise<UserModel>
    {
        return this.userRepository.create({
            email: 'test@nft.fr',
            password: 'ok',
            roleId: 1,
            name: 'test',
            blockChainAddress: '0xba3c9BA4a7C10b904Bb7ad7FDCB0d2CF9681BcA1'
        })
    }
    isAdmin(): Boolean
    {
        return true;
    }
}
