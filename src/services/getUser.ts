import { User } from "../entities/user.entity";
import { AppError } from "../utils/error.middleware";
import { userRepository } from "../utils/repositories"
import { StatusCode } from "../utils/statusCode";

export const getUser = async (email: string): Promise<User> => {
  const user = await userRepository.findOne({
    where: {email}
  });

  if (!user) throw new AppError("User not found", StatusCode.NOT_FOUND);

  return user;
}