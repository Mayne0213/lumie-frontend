'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OwnerRegisterRequest, ownerRegisterRequestSchema } from '@/entities/session';
import { useRegisterOwner } from '../model/useRegisterOwner';
import { Button } from '@/src/shared/ui/Button';
import { Input } from '@/src/shared/ui/Input';
import { ApiError } from '@/src/shared/types/api';
import Link from 'next/link';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OwnerRegisterRequest>({
    resolver: zodResolver(ownerRegisterRequestSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      instituteName: '',
      businessRegistrationNumber: '',
    },
  });

  const { mutate: registerOwner, isPending, error } = useRegisterOwner();

  const onSubmit = (data: OwnerRegisterRequest) => {
    registerOwner(data);
  };

  const apiError = error as ApiError | null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {apiError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{apiError.message}</p>
        </div>
      )}

      <Input
        label="기관명"
        type="text"
        placeholder="루미에학원"
        error={errors.instituteName?.message}
        {...register('instituteName')}
      />

      <Input
        label="사업자등록번호"
        type="text"
        placeholder="123-45-67890"
        error={errors.businessRegistrationNumber?.message}
        {...register('businessRegistrationNumber')}
      />

      <Input
        label="대표자 이름"
        type="text"
        placeholder="홍길동"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="이메일"
        type="email"
        placeholder="example@email.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="비밀번호"
        type="password"
        placeholder="8자 이상, 대소문자, 숫자, 특수문자 포함"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" className="w-full" loading={isPending}>
        학원 등록
      </Button>

      <p className="text-center text-sm text-gray-600">
        이미 계정이 있으신가요?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          로그인
        </Link>
      </p>
    </form>
  );
}
