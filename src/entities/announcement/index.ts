export {
  type Announcement,
  type CreateAnnouncementInput,
  type UpdateAnnouncementInput,
  announcementSchema,
  createAnnouncementSchema,
  updateAnnouncementSchema,
} from './model/schema';

export {
  useAnnouncements,
  useAnnouncement,
  useCreateAnnouncement,
  useUpdateAnnouncement,
  useDeleteAnnouncement,
} from './api/queries';
