import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository } from "typeorm";
import { RoleModel } from "./models/role.models";
import { UserModel } from "./models/user.models";

@Injectable()
export class DatabaseProvider {
    constructor(@InjectRepository(RoleModel) private roleRepository = getRepository(RoleModel),
    @InjectRepository(UserModel) private userRepository = getRepository(UserModel)) {
    let adminRole = null;
    this.roleRepository.findOne({where: {name: 'admin'}}).then(async admin => {
        if (!admin)
        {
            adminRole = new RoleModel();
            adminRole.name = "admin";
            adminRole.id = 1;
            await this.roleRepository.save(adminRole);
        }
        else {
            adminRole = admin;
        }
    }).then(() => {
        this.roleRepository.findOne({where: {name: 'user'}}).then(user => {
            if (!user)
            {
                const userRole = new RoleModel();
                userRole.name = "user";
                userRole.id = 2;
                this.roleRepository.save(userRole);
            }
        })
    this.userRepository.findOne({where: {email: 'admin@admin.fr'}}).then(user => {
        if (!user)
        {
            const adminUser = {
                email: 'admin@admin.fr',
                password: 'admin',
                role: adminRole,
                name: 'test',
                blockChainAddress: '0xba3c9BA4a7C10b904Bb7ad7FDCB0d2CF9681BcA1'
            }
            this.userRepository.save(adminUser);
        }
    })});
    }
}