import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllUsersDTO from '../dtos/IFindAllUsersDTO';

export default interface IUsersRepository {
  findAllUsers(except_user_id?: IFindAllUsersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
