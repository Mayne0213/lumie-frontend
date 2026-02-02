export {
  type Resource,
  type CreateResourceInput,
  type UpdateResourceInput,
  resourceSchema,
  createResourceSchema,
  updateResourceSchema,
} from './model/schema';

export {
  useResources,
  useResource,
  useCreateResource,
  useUpdateResource,
  useDeleteResource,
} from './api/queries';
