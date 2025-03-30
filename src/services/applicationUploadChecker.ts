import { SurahCategory } from "../entities/surah.entity";
import { Application } from "../entities/application.entity";

// export const applicantionUpload = (applicant: Application): boolean => {
//   let isCompleted: boolean = false;

//   if (applicant.ageGroup !== SurahCategory.ADVANCE) {
//     if (
//       applicant.birthCert !== null && applicant.birthCert !== "" &&
//       applicant.passport !== null && applicant.passport !== ""    
//     ) return isCompleted = true;
//   } else {
//     if (
//       applicant.hafizCert !== null && applicant.hafizCert !== "" &&
//       applicant.birthCert !== null && applicant.birthCert !== "" &&
//       applicant.passport !== null && applicant.passport !== ""    
//     ) isCompleted = true;
//   }
  
//   return isCompleted;
// }

export const applicantionUpload = (applicant: Application): boolean => {
  const hasValidDocs = (docs: (string | null)[]) => docs.every(doc => doc !== null && doc !== "");
  
  return applicant.ageGroup !== SurahCategory.ADVANCE
    ? hasValidDocs([applicant.birthCert, applicant.passport])
    : hasValidDocs([applicant.hafizCert, applicant.birthCert, applicant.passport]);
};
