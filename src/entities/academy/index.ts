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
  useToggleAcademyActive,
  useDeleteAcademy,
} from './api/queries';

export { AcademyCard } from './ui/AcademyCard';
