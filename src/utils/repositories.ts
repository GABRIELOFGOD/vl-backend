import { User } from "../entities/user.entity";
import { dataSource } from "../config/dataSource";
import { General } from "../entities/general.entity";
import { Repository } from "typeorm";

export const generalRepository: Repository<General> = dataSource.getRepository(General);

export const userRepository: Repository<User> = dataSource.getRepository(User);