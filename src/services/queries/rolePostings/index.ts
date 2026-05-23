import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../api';
import type { ApiResponse } from '../auth/types';
import type {
  CreateRolePostingIntakeRequest,
  RolePostingIntakeData,
  RolePostingStepFiveData,
  RolePostingStepFourData,
  RolePostingStepOneData,
  RolePostingStepThreeData,
  RolePostingStepTwoData,
  UpdateRolePostingStepFiveRequest,
  UpdateRolePostingStepFourRequest,
  UpdateRolePostingStepOneRequest,
  UpdateRolePostingStepThreeRequest,
  UpdateRolePostingStepTwoRequest,
} from '../../../types/rolePosting';

export const rolePostingKeys = {
  all: ['role-postings'] as const,
  intake: () => [...rolePostingKeys.all, 'intake'] as const,
  stepOne: (id: string) => [...rolePostingKeys.all, id, 'step-1'] as const,
  stepTwo: (id: string) => [...rolePostingKeys.all, id, 'step-2'] as const,
  stepThree: (id: string) => [...rolePostingKeys.all, id, 'step-3'] as const,
  stepFour: (id: string) => [...rolePostingKeys.all, id, 'step-4'] as const,
  stepFive: (id: string) => [...rolePostingKeys.all, id, 'step-5'] as const,
};

export const useCreateRolePostingIntakeMutation = () => {
  return useMutation({
    mutationKey: rolePostingKeys.intake(),
    mutationFn: (body: CreateRolePostingIntakeRequest) =>
      apiClient.post<ApiResponse<RolePostingIntakeData>>({
        url: '/role-postings',
        body,
        auth: true,
      }),
  });
};

export const useUpdateRolePostingStepOneMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: UpdateRolePostingStepOneRequest;
    }) =>
      apiClient.put<ApiResponse<RolePostingStepOneData>>({
        url: `/role-postings/${id}/step-1`,
        body,
        auth: true,
      }),
  });
};

export const useUpdateRolePostingStepTwoMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: UpdateRolePostingStepTwoRequest;
    }) =>
      apiClient.put<ApiResponse<RolePostingStepTwoData>>({
        url: `/role-postings/${id}/step-2`,
        body,
        auth: true,
      }),
  });
};

export const useUpdateRolePostingStepThreeMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: UpdateRolePostingStepThreeRequest;
    }) =>
      apiClient.put<ApiResponse<RolePostingStepThreeData>>({
        url: `/role-postings/${id}/step-3`,
        body,
        auth: true,
      }),
  });
};

export const useUpdateRolePostingStepFourMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: UpdateRolePostingStepFourRequest;
    }) =>
      apiClient.put<ApiResponse<RolePostingStepFourData>>({
        url: `/role-postings/${id}/step-4`,
        body,
        auth: true,
      }),
  });
};

export const useUpdateRolePostingStepFiveMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      body,
      jobDescriptionFile,
    }: {
      id: string;
      body: UpdateRolePostingStepFiveRequest;
      jobDescriptionFile?: File | null;
    }) => {
      if (jobDescriptionFile) {
        const formData = new FormData();
        formData.append('payload', JSON.stringify(body));
        formData.append('jobDescriptionFile', jobDescriptionFile);
        return apiClient.put<ApiResponse<RolePostingStepFiveData>>({
          url: `/role-postings/${id}/step-5`,
          body: formData,
          auth: true,
        });
      }

      return apiClient.put<ApiResponse<RolePostingStepFiveData>>({
        url: `/role-postings/${id}/step-5`,
        body,
        auth: true,
      });
    },
  });
};
