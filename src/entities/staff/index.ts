export {
  type Staff,
  type CreateStaffInput,
  type UpdateStaffInput,
  staffSchema,
  createStaffSchema,
  updateStaffSchema,
} from './model/schema';

export {
  useStaffList,
  useStaff,
  useCreateStaff,
  useUpdateStaff,
  useDeleteStaff,
} from './api/queries';

export { StaffCard } from './ui/StaffCard';
