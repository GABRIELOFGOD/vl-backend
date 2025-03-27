import { Application } from "../entities/application.entity";
import { AppError } from "../utils/error.middleware";
import { applicationRepository } from "../utils/repositories"
import { StatusCode } from "../utils/statusCode";

const getApplication = async (applicationId: string): Promise<Application> => {
  const application = await applicationRepository.findOne({
    where: { applicationId }
  });

  if (!application) throw new AppError("Application not found", StatusCode.NOT_FOUND);

  return application;
}

export default getApplication;
