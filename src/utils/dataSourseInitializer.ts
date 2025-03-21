import { dataSource } from "../config/dataSource";
import { generalRepository } from "./repositories";

const dataSourceInitializer = () => {
  dataSource
  .initialize()
  .then(async () => {
    const settingsExists = await generalRepository.find();
    if (settingsExists.length) {
      console.log("Data source initialized, settings exists");
    } else {
      const newSettings = generalRepository.create({
        allowAdminRegistration: true,
        allowVideoUpload: true,
        applicationOpen: true
      });

      await generalRepository.save(newSettings);

      console.log("Datasource initialized create new settings");
    }
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization", err);
  });
}

export default dataSourceInitializer;
