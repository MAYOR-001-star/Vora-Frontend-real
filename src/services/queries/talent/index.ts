import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '../../api';

export const useGetPublicRoleQuery = (slug: string) => {
  return useQuery({
    queryKey: ['public-role', slug],
    queryFn: () => apiClient.get<any>({ url: `/talent/role/${slug}`, auth: false }),
    enabled: !!slug,
  });
};

export const useUploadCvMutation = () => {
  return useMutation({
    mutationFn: (data: { file: File; roleLink?: string }) => {
      const formData = new FormData();
      formData.append('file', data.file);
      
      const url = data.roleLink ? `/talent/cv?roleLink=${encodeURIComponent(data.roleLink)}` : '/talent/cv';
      
      // Assume apiClient supports FormData when body is FormData
      return apiClient.post<{ data: { cvUploadId: string; parseStatus: string } }>({
        url,
        body: formData as any, // apiClient will likely need to omit Content-Type header so browser sets multipart/form-data
      });
    },
  });
};

export const useGetTalentMatchesQuery = () => {
  return useQuery({
    queryKey: ['talent', 'matches'],
    queryFn: () => apiClient.get<any>({ url: '/talent/matches', auth: true }),
  });
};
