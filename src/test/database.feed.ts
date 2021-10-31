import { CollectionModel } from "src/models/collection.models";
import { CollectionStatus } from "src/models/collection.status.enum";
import { RoleModel } from "src/models/role.models";
import { UserModel } from "src/models/user.models";
import { getRepository } from "typeorm";

export class FeedDatabase {
    public basicUser: UserModel;
    public basicUser2: UserModel;
    public basicUser3: UserModel;
    public adminUser: UserModel;
    public collection: CollectionModel;
    public adminRole: RoleModel;
    public userRole: RoleModel;
    public userRepository;
    public roleRepository;
    public collectionRepository;

    async feed()
    {
        this.roleRepository = getRepository(RoleModel);
        this.adminRole = await this.roleRepository.findOne({where: {name: 'admin'}});
        if (!this.adminRole)
        {
            this.adminRole = new RoleModel();
            this.adminRole.name = "admin";
            this.adminRole.id = 1;
            await this.roleRepository.save(this.adminRole);
        }

        this.userRole = await this.roleRepository.findOne({where: {name: 'user'}});
        if (!this.userRole)
        {
            this.userRole = new RoleModel();
            this.userRole.name = "user";
            this.userRole.id = 2;
            await this.roleRepository.save(this.userRole);
        }
        this.userRepository = getRepository(UserModel);
        this.collectionRepository = getRepository(CollectionModel);
        this.adminUser = await this.userRepository.findOne({where: {name: 'non'}})
        if (!this.adminUser)
        {
            this.adminUser = new UserModel();
            this.adminUser.name = 'non';
            this.adminUser.role = this.adminRole;
            this.adminUser.email = 'non@gmail.com';
            this.adminUser.blockChainAddress = '0xba5c9BA4a7C10b904Bb7ad7FDCB0d2CF9681BcA1';
            this.adminUser.password = 'securePwd';
            this.adminUser = await this.userRepository.save(this.adminUser);
        }

        this.basicUser = await this.userRepository.findOne({where: {name: 'oui'}})
        if (!this.basicUser)
        {
            this.basicUser = new UserModel();
            this.basicUser.name = 'oui';
            this.basicUser.role = this.userRole;
            this.basicUser.email = 'basicuser@gmail.com';
            this.basicUser.blockChainAddress = '0xba5c9BA4a7C10b904Bb7ad7FDCB0d2CF9681BcA2';
            this.basicUser.password = 'mySecurePwd';
            this.basicUser = await this.userRepository.save(this.basicUser);
        }
        this.basicUser2 = await this.userRepository.findOne({where: {name: 'ouiOui'}})
        if (!this.basicUser2)
        {
            this.basicUser2 = new UserModel();
            this.basicUser2.name = 'ouiOui';
            this.basicUser2.role = this.userRole;
            this.basicUser2.email = 'basicuser2@gmail.com';
            this.basicUser2.blockChainAddress = '0xba5c9BA4a7C10b904Bb7ad7FDCB0d2CF9681BcA3';
            this.basicUser2.password = 'mySuperSecurePwd';
            this.basicUser2 = await this.userRepository.save(this.basicUser2);
        }
        this.basicUser3 = await this.userRepository.findOne({where: {name: 'ouiOuiOui'}})
        if (!this.basicUser3)
        {
            this.basicUser3 = new UserModel();
            this.basicUser3.name = 'ouiOuiOui';
            this.basicUser3.role = this.userRole;
            this.basicUser3.email = 'basicuser3@gmail.com';
            this.basicUser3.blockChainAddress = '0xba5c9BA4a7C10b904Bb7ad7FDCB0d2CF9681BcA3';
            this.basicUser3.password = 'mySuperSecurePwd';
            this.basicUser3 = await this.userRepository.save(this.basicUser3);
        }
        this.collection = {
            id: 1,
            name: '',
            pathLogo: 'test',
            autoArchiving: null,
            status: CollectionStatus.Draft,
            nfts: [],
            team: null
        }
    }
    clear() {
        getRepository(UserModel).delete([this.adminUser?.id, this.basicUser?.id, this.basicUser2?.id, this.basicUser3?.id]);
        getRepository(RoleModel).delete([1, 2]);
    }
}