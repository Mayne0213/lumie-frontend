export {
  type Academy,
  type CreateAcademyInput,
  type UpdateAcademyInput,
  academySchema,
  createAcademySchema,
  updateAcademySchema,
} from './model/schema';

export {
  useAcademies,
  useAcademy,
  useCreateAcademy,
  useUpdateAcademy,
  useDeleteAcademy,
} from './api/queries';

export { AcademyCard } from './ui/AcademyCard';
